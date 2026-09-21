#!/usr/bin/env python3
"""Gera os arquivos de marca da TILT em public/marca/ a partir de LogoTilt.tsx.

PASSO, RAIO e PONTOS sao lidos direto de src/components/LogoTilt.tsx (fonte
da verdade do wordmark), para que favicon e imagens de compartilhamento nunca
divirjam do logotipo do site. Tudo e deterministico: rodar de novo gera bytes
identicos.

Saidas (fundo branco #ffffff, pontos pretos #000000, nada mais):
  public/marca/icone.svg                 64x64, so o primeiro T (favicon)
  public/marca/icone-32.png              32x32
  public/marca/icone-192.png             192x192
  public/marca/icone-180.png             180x180 (apple-touch-icon)
  public/marca/compartilhar.png          1200x630, wordmark + frase (og:image)
  public/marca/compartilhar-quadrado.png 600x600, so o wordmark

Uso:
  python3 scripts/gerar-marca.py                   # regenera tudo
  python3 scripts/gerar-marca.py --folha saida.png # tambem monta folha de contato
"""
import argparse
import os
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
TSX = RAIZ / 'src' / 'components' / 'LogoTilt.tsx'
SAIDA = RAIZ / 'public' / 'marca'

SS = 8  # supersampling: desenha em 8x e reduz com LANCZOS

FRASE = 'THE INFLUENCERS LAB FOR TOMORROW'
FRASE_TAMANHO = 26      # px na imagem final
FRASE_ESPACO_EM = 0.18  # avanco extra por caractere, em em
FRASE_DISTANCIA = 40    # px entre a base do wordmark e o topo da frase

# Primeira fonte monoespacada de sistema que existir.
FONTES_MONO = [
    '/System/Library/Fonts/Menlo.ttc',
    '/System/Library/Fonts/SFNSMono.ttf',
    '/System/Library/Fonts/Supplemental/Courier New.ttf',
]

# Os cinco pontos do primeiro T, na ordem em que aparecem em LogoTilt.tsx.
PRIMEIRO_T = {(0.0, 0.0), (1.0, 0.0), (2.0, 0.0), (1.0, 1.0), (1.0, 2.0)}


# --- geometria -------------------------------------------------------------

def ler_geometria(caminho):
    """Extrai PASSO, RAIO e a lista PONTOS do LogoTilt.tsx."""
    texto = caminho.read_text(encoding='utf-8')
    passo = float(re.search(r'export const PASSO\s*=\s*([\d.]+)', texto).group(1))
    raio = float(re.search(r'export const RAIO\s*=\s*([\d.]+)', texto).group(1))
    bloco = re.search(r'export const PONTOS[^=]*=\s*\[(.*?)\];', texto, re.S).group(1)
    bloco = re.sub(r'//[^\n]*', '', bloco)  # descarta comentarios de linha
    pares = re.findall(r'\[\s*([\d.]+)\s*,\s*([\d.]+)\s*\]', bloco)
    pontos = [(float(c), float(l)) for c, l in pares]
    if len(pontos) != 21:
        sys.exit(f'esperava 21 pontos em {caminho}, achei {len(pontos)}')
    if set(pontos[:5]) != PRIMEIRO_T:
        sys.exit('os cinco primeiros pontos de LogoTilt.tsx nao formam o T esperado')
    return passo, raio, pontos


def enquadrar(pontos, passo, raio, largura, altura, fracao_largura, centro_y):
    """Escala e posiciona os pontos num quadro largura x altura (px).

    O bloco de tinta (borda do primeiro ao ultimo ponto) ocupa fracao_largura
    da largura e fica centralizado na horizontal; o centro vertical do bloco
    cai em centro_y. A proporcao raio/passo do TSX e preservada.
    Devolve (raio_px, [(cx, cy), ...]).
    """
    cols = [c for c, _ in pontos]
    lins = [l for _, l in pontos]
    largura_u = (max(cols) - min(cols)) * passo + 2 * raio
    escala = fracao_largura * largura / largura_u
    passo_px, raio_px = passo * escala, raio * escala
    x0 = largura / 2 - (max(cols) + min(cols)) / 2 * passo_px
    y0 = centro_y - (max(lins) + min(lins)) / 2 * passo_px
    centros = [(x0 + c * passo_px, y0 + l * passo_px) for c, l in pontos]
    return raio_px, centros


# --- desenho ---------------------------------------------------------------

def fmt(n):
    s = f'{n:.2f}'.rstrip('0').rstrip('.')
    return s if s else '0'


def escrever_svg(caminho, tamanho, raio_px, centros):
    linhas = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {tamanho} {tamanho}" '
        f'width="{tamanho}" height="{tamanho}">',
        f'  <rect width="{tamanho}" height="{tamanho}" fill="#ffffff"/>',
    ]
    for cx, cy in centros:
        linhas.append(
            f'  <circle cx="{fmt(cx)}" cy="{fmt(cy)}" r="{fmt(raio_px)}" fill="#000000"/>'
        )
    linhas.append('</svg>')
    caminho.write_text('\n'.join(linhas) + '\n', encoding='utf-8')


def carregar_fonte(caminho, tamanho):
    if caminho is None:
        return ImageFont.load_default(size=tamanho)
    return ImageFont.truetype(caminho, tamanho, index=0)


def escrever_espacado(desenho, frase, fonte, tamanho_px, centro_x, topo_y, espaco_em):
    """Escreve caractere a caractere com avanco extra, centralizado em centro_x,
    com o topo das capitulares em topo_y."""
    extra = espaco_em * tamanho_px
    avancos = [fonte.getlength(ch) for ch in frase]
    largura = sum(avancos) + extra * (len(frase) - 1)
    x = centro_x - largura / 2
    y = topo_y - fonte.getbbox(frase)[1]
    for ch, avanco in zip(frase, avancos):
        desenho.text((x, y), ch, font=fonte, fill=0)
        x += avanco + extra


def rasterizar(largura, altura, raio_px, centros, frase=None):
    """Desenha em SS x (fundo branco, pontos pretos) e reduz com LANCZOS.
    frase, se dada, e (texto, caminho_da_fonte, tamanho_px, topo_y, espaco_em)."""
    img = Image.new('L', (largura * SS, altura * SS), 255)
    desenho = ImageDraw.Draw(img)
    r = raio_px * SS
    for cx, cy in centros:
        desenho.ellipse([cx * SS - r, cy * SS - r, cx * SS + r, cy * SS + r], fill=0)
    if frase:
        texto, caminho_fonte, tamanho, topo_y, espaco_em = frase
        fonte = carregar_fonte(caminho_fonte, tamanho * SS)
        escrever_espacado(desenho, texto, fonte, tamanho * SS,
                          largura * SS / 2, topo_y * SS, espaco_em)
    return img.resize((largura, altura), Image.Resampling.LANCZOS).convert('RGB')


def salvar_png(img, caminho):
    img.save(caminho, format='PNG', optimize=True)


def rasterizar_svg(caminho, tamanho):
    """Le o icone.svg gerado e o rasteriza (para a folha de contato)."""
    texto = caminho.read_text(encoding='utf-8')
    vb = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', texto)
    escala = tamanho / float(vb.group(1))
    circulos = re.findall(r'<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"', texto)
    centros = [(float(cx) * escala, float(cy) * escala) for cx, cy, _ in circulos]
    return rasterizar(tamanho, tamanho, float(circulos[0][2]) * escala, centros)


# --- folha de contato ------------------------------------------------------

def folha_de_contato(destino, caminho_fonte):
    def kb(nome):
        return os.path.getsize(SAIDA / nome) / 1024

    def abrir(nome):
        return Image.open(SAIDA / nome).convert('RGB')

    i32 = abrir('icone-32.png')
    zoom = i32.resize((128, 128), Image.Resampling.NEAREST)
    par = Image.new('RGB', (32 + 16 + 128, 128), (217, 217, 217))
    par.paste(i32, (0, 96))
    par.paste(zoom, (48, 0))

    linhas = [
        [
            ('icone.svg  render 256px', rasterizar_svg(SAIDA / 'icone.svg', 256)),
            (f'icone-32.png  1x e 4x  {kb("icone-32.png"):.1f} KB', par),
            (f'icone-180.png  {kb("icone-180.png"):.1f} KB', abrir('icone-180.png')),
            (f'icone-192.png  {kb("icone-192.png"):.1f} KB', abrir('icone-192.png')),
        ],
        [
            (f'compartilhar-quadrado.png  600x600 a 50%  {kb("compartilhar-quadrado.png"):.1f} KB',
             abrir('compartilhar-quadrado.png').resize((300, 300), Image.Resampling.LANCZOS)),
            (f'compartilhar.png  1200x630 a 50%  {kb("compartilhar.png"):.1f} KB',
             abrir('compartilhar.png').resize((600, 315), Image.Resampling.LANCZOS)),
        ],
    ]

    margem, vao, rotulo_h = 32, 32, 26
    fonte = carregar_fonte(caminho_fonte, 13)
    def celula(rotulo, im):  # largura da celula: tile ou rotulo, o que for maior
        return max(im.width, int(fonte.getlength(rotulo)) + 1)

    larguras = [sum(celula(r, im) for r, im in l) + vao * (len(l) - 1) for l in linhas]
    alturas = [max(im.height for _, im in l) + rotulo_h for l in linhas]
    folha = Image.new('RGB', (max(larguras) + 2 * margem,
                              sum(alturas) + vao * (len(linhas) - 1) + 2 * margem),
                      (217, 217, 217))
    desenho = ImageDraw.Draw(folha)
    y = margem
    for linha, alt in zip(linhas, alturas):
        x = margem
        for rotulo, im in linha:
            folha.paste(im, (x, y))
            desenho.rectangle([x - 1, y - 1, x + im.width, y + im.height],
                              outline=(160, 160, 160))
            desenho.text((x, y + im.height + 8), rotulo, font=fonte, fill=(40, 40, 40))
            x += celula(rotulo, im) + vao
        y += alt + vao
    folha.save(destino, format='PNG', optimize=True)


# --- principal -------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    parser.add_argument('--folha', metavar='PNG',
                        help='tambem monta uma folha de contato dos arquivos gerados')
    args = parser.parse_args()

    passo, raio, pontos = ler_geometria(TSX)
    primeiro_t = pontos[:5]
    SAIDA.mkdir(parents=True, exist_ok=True)

    caminho_fonte = next((f for f in FONTES_MONO if os.path.exists(f)), None)
    if caminho_fonte is None:
        print('aviso: nenhuma fonte monoespacada de sistema encontrada; usando a padrao do Pillow')

    # 1. Icone SVG: so o primeiro T, ~70% do quadrado de 64.
    raio_px, centros = enquadrar(primeiro_t, passo, raio, 64, 64, 0.70, 32)
    escrever_svg(SAIDA / 'icone.svg', 64, raio_px, centros)

    # 2. Icones PNG: mesma composicao, rasterizada.
    for lado in (32, 192, 180):
        raio_px, centros = enquadrar(primeiro_t, passo, raio, lado, lado, 0.70, lado / 2)
        salvar_png(rasterizar(lado, lado, raio_px, centros), SAIDA / f'icone-{lado}.png')

    # 3. Compartilhar 1200x630: wordmark a 56% da largura, centro em 46% da
    #    altura; frase 40px abaixo.
    raio_px, centros = enquadrar(pontos, passo, raio, 1200, 630, 0.56, 0.46 * 630)
    base_wordmark = max(cy for _, cy in centros) + raio_px
    frase = (FRASE, caminho_fonte, FRASE_TAMANHO, base_wordmark + FRASE_DISTANCIA, FRASE_ESPACO_EM)
    salvar_png(rasterizar(1200, 630, raio_px, centros, frase), SAIDA / 'compartilhar.png')

    # 4. Compartilhar quadrado 600x600: so o wordmark a 70% da largura.
    raio_px, centros = enquadrar(pontos, passo, raio, 600, 600, 0.70, 300)
    salvar_png(rasterizar(600, 600, raio_px, centros), SAIDA / 'compartilhar-quadrado.png')

    for nome in sorted(os.listdir(SAIDA)):
        print(f'{os.path.getsize(SAIDA / nome):>8} B  {SAIDA / nome}')
    print(f'fonte da frase: {caminho_fonte or "padrao do Pillow"}')

    if args.folha:
        folha_de_contato(args.folha, caminho_fonte)
        print(f'folha de contato: {args.folha}')


if __name__ == '__main__':
    main()
