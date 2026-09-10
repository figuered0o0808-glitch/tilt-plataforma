import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { Chips } from '@/components/Chip';
import { Selo } from '@/components/Selo';
import { IDIOMAS, ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo, materialPorSlug } from '@/lib/data';
import { arquivoPublico } from '@/lib/format';
import { rota } from '@/lib/rotas';

import { Capa } from '../_Capa';
import { CartaoMaterial, marcaDaTrilha, rotuloTrilha } from '../_CartaoMaterial';
import { dataLonga, vizinhanca } from '../_regras';
import { EstilosAcervo } from '../_estilos';

/** Um endereco por idioma e por material publicado naquele idioma. */
export function generateStaticParams() {
  return IDIOMAS.flatMap((idioma) =>
    conteudo(idioma).materiais.map((material) => ({ idioma, slug: material.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string; slug: string }>;
}): Promise<Metadata> {
  const { idioma, slug } = await params;
  if (!ehIdioma(idioma)) return {};

  const r = textos(idioma).aprendizado.materiais;
  const material = materialPorSlug(idioma, slug);
  return {
    title: material?.titulo ?? r.titulo,
    description: material?.resumo ?? r.descricao,
  };
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ idioma: string; slug: string }>;
}) {
  const { idioma, slug } = await params;
  if (!ehIdioma(idioma)) notFound();

  const material = materialPorSlug(idioma, slug);
  if (!material) notFound();

  const t = textos(idioma);
  const r = t.aprendizado.materiais;
  const trilha = rotuloTrilha(idioma, material.trilha);

  // O tema ja aparece na ficha: nao volta como palavra-chave.
  const palavrasChave = material.palavrasChave.filter(
    (palavra) => palavra.toLowerCase() !== material.tema.toLowerCase(),
  );

  // Sumario so quando ha o que sumariar: com duas secoes a rolagem resolve.
  const comSumario = material.secoes.length > 2;
  const ancora = (indice: number) => `secao-${indice + 1}`;

  const vizinhos = vizinhanca(material, conteudo(idioma).materiais);
  const faixas = [
    {
      chave: 'organizacao',
      rotulo: `${r.maisDaOrganizacao} ${material.organizacao}`,
      lista: vizinhos.organizacao,
    },
    { chave: 'tema', rotulo: r.mesmoTema, lista: vizinhos.tema },
    { chave: 'trilha', rotulo: r.leiaTambem, lista: vizinhos.trilha },
  ].filter((faixa) => faixa.lista.length > 0);

  return (
    <>
      <EstilosAcervo />
      <CabecalhoPagina estreito olho={`${r.titulo}: ${trilha}`} titulo={material.titulo} />

      <div className="secao secao--curta">
        <div className="container-estreito pilha--g">
          <div className="bib-abertura">
            <Capa material={material} cor={marcaDaTrilha(material.trilha)} variante="grande" />

            <div
              className="cartao cartao--marcado"
              style={{ '--marca': marcaDaTrilha(material.trilha) } as CSSProperties}
            >
              <dl className="bib-ficha">
                <div className="bib-ficha__linha">
                  <dt>{r.autoria}</dt>
                  <dd>{material.autoria.join(', ')}</dd>
                </div>
                <div className="bib-ficha__linha">
                  <dt>{r.organizacao}</dt>
                  <dd>{material.organizacao}</dd>
                </div>
                <div className="bib-ficha__linha">
                  <dt>{r.tema}</dt>
                  <dd>{material.tema}</dd>
                </div>
                <div className="bib-ficha__linha">
                  <dt>{r.formato}</dt>
                  <dd>{material.formato}</dd>
                </div>
                {material.tempoLeitura ? (
                  <div className="bib-ficha__linha">
                    <dt>{r.tempoLeitura}</dt>
                    <dd>{material.tempoLeitura}</dd>
                  </div>
                ) : null}
                <div className="bib-ficha__linha">
                  <dt>{r.atualizadoEm}</dt>
                  <dd>{dataLonga(material.atualizadoEm, r.dataModelo, r.meses)}</dd>
                </div>
              </dl>

              {palavrasChave.length > 0 ? (
                <div className="pilha--p" style={{ marginTop: 14 }}>
                  <p className="rotulo">{r.palavrasChave}</p>
                  <Chips itens={palavrasChave} vazado />
                </div>
              ) : null}
            </div>
          </div>

          <p className="texto-guia" style={{ margin: 0 }}>
            {material.resumo}
          </p>

          {comSumario ? (
            <nav className="cartao cartao--compacto" aria-label={r.sumario}>
              <p className="rotulo rotulo--forte" style={{ margin: 0 }}>
                {r.sumario}
              </p>
              <div className="bib-sumario">
                {material.secoes.map((secao, indice) => (
                  <a key={secao.titulo} className="bib-sumario__item" href={`#${ancora(indice)}`}>
                    <span className="bib-sumario__n">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <span className="bib-sumario__titulo">{secao.titulo}</span>
                  </a>
                ))}
              </div>
            </nav>
          ) : null}

          <div className="prosa">
            {material.secoes.map((secao, indice) => (
              <section key={secao.titulo} id={comSumario ? ancora(indice) : undefined}>
                <h2>{secao.titulo}</h2>
                {secao.paragrafos.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </section>
            ))}
          </div>

          {material.arquivos.length > 0 ? (
            <div className="cartao cartao--compacto">
              <h2 className="rotulo rotulo--forte" style={{ margin: 0 }}>
                {r.arquivosTitulo}
              </h2>
              <div>
                {material.arquivos.map((arquivo) => (
                  <div key={arquivo.arquivo} className="bib-arquivo">
                    <div>
                      <p className="bib-arquivo__idioma">{arquivo.idioma}</p>
                      <p className="bib-arquivo__nota">
                        {arquivo.paginas
                          ? `${r.arquivoTipo} · ${arquivo.paginas} ${r.paginas}`
                          : r.arquivoTipo}
                      </p>
                    </div>
                    <a
                      href={arquivoPublico(arquivo.arquivo)}
                      className="btn btn--secundario btn--pequeno"
                    >
                      {t.comum.acoes.baixar}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {material.licenca ? (
            <div
              className="cartao cartao--compacto"
              style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}
            >
              <Selo idioma={idioma} status="licenca" rotulo={material.licenca} />
              <p className="texto-pequeno texto-secundario" style={{ margin: 0 }}>
                {r.licencaNota}
              </p>
            </div>
          ) : null}

          <div className="linha">
            <Botao
              href={`${rota(idioma, 'biblioteca/materiais')}/?trilha=${material.trilha}`}
              variante="discreto"
              tamanho="pequeno"
            >
              {r.voltarTrilha}
            </Botao>
          </div>
        </div>
      </div>

      {faixas.length > 0 ? (
        <div className="secao secao--curta">
          <div className="container-estreito pilha--g">
            {faixas.map((faixa) => (
              <div key={faixa.chave} className="pilha">
                <p className="olho" style={{ margin: 0 }}>
                  {faixa.rotulo}
                </p>
                {faixa.lista.map((outro) => (
                  <CartaoMaterial key={outro.slug} idioma={idioma} material={outro} mostrarTrilha />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
