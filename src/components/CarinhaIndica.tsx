'use client';

import { useId, type CSSProperties } from 'react';

import { arquivoPublico } from '@/lib/format';

import styles from './CarinhaIndica.module.css';

export type EstadoCarinhaIndica = 'neutro' | 'oportunidades' | 'cadastro' | 'biblioteca' | 'confirmacao';
export type ExpressaoCarinhaIndica = '01' | '02' | '03';
export type CorCarinhaIndica = 'azul' | 'verde' | 'rosa' | 'branco';

type Recorte = {
  nome: string;
  classe: string;
  x: number;
  y: number;
  largura: number;
  altura: number;
  pontos?: string;
  excluir?: string[];
};

type Arte = {
  viewBox: string;
  centro: string;
  recortes: Recorte[];
};

/* Cada mapa separa partes da própria imagem: os traços nunca são redesenhados. */
const ARTES: Record<ExpressaoCarinhaIndica, Arte> = {
  '01': {
    viewBox: '40 235 1040 655',
    centro: '560px 565px',
    recortes: [
      { nome: 'sobrancelha-esquerda', classe: 'sobrancelhaEsquerda', x: 280, y: 260, largura: 190, altura: 85 },
      { nome: 'sobrancelha-direita', classe: 'sobrancelhaDireita', x: 570, y: 260, largura: 190, altura: 85 },
      { nome: 'olho-esquerdo', classe: 'olhoEsquerdo', x: 325, y: 395, largura: 180, altura: 195 },
      { nome: 'olho-direito', classe: 'olhoDireito', x: 530, y: 395, largura: 185, altura: 195 },
      { nome: 'orelha-esquerda', classe: 'orelha', x: 125, y: 410, largura: 140, altura: 175 },
      { nome: 'orelha-direita', classe: 'orelha', x: 820, y: 425, largura: 140, altura: 170 },
      { nome: 'nariz', classe: 'nariz', x: 400, y: 605, largura: 265, altura: 110 },
      { nome: 'boca', classe: 'boca', x: 465, y: 715, largura: 90, altura: 80 },
      { nome: 'face-esquerda', classe: 'face', x: 60, y: 620, largura: 310, altura: 225 },
      { nome: 'face-direita', classe: 'face', x: 710, y: 620, largura: 355, altura: 225 },
    ],
  },
  '02': {
    viewBox: '220 120 780 850',
    centro: '610px 545px',
    recortes: [
      { nome: 'sobrancelha-esquerda', classe: 'sobrancelhaEsquerda', x: 245, y: 150, largura: 200, altura: 90 },
      { nome: 'sobrancelha-direita', classe: 'sobrancelhaDireita', x: 540, y: 145, largura: 215, altura: 105 },
      { nome: 'olho-esquerdo', classe: 'olhoEsquerdo', x: 275, y: 270, largura: 225, altura: 245 },
      { nome: 'olho-direito', classe: 'olhoDireito', x: 500, y: 270, largura: 250, altura: 245 },
      { nome: 'orelha', classe: 'orelha', x: 810, y: 330, largura: 155, altura: 190 },
      { nome: 'nariz', classe: 'nariz', x: 415, y: 510, largura: 110, altura: 180 },
      { nome: 'boca', classe: 'boca', x: 380, y: 720, largura: 215, altura: 210 },
    ],
  },
  '03': {
    viewBox: '170 90 760 930',
    centro: '550px 555px',
    recortes: [
      { nome: 'sobrancelha-esquerda', classe: 'sobrancelhaEsquerda', x: 195, y: 155, largura: 235, altura: 115, pontos: '212,160 426,198 415,270 196,232' },
      { nome: 'sobrancelha-direita', classe: 'sobrancelhaDireita', x: 535, y: 115, largura: 355, altura: 190, pontos: '537,221 860,116 889,198 565,306' },
      { nome: 'olho-esquerdo', classe: 'olhoEsquerdo', x: 220, y: 225, largura: 225, altura: 245, excluir: ['sobrancelha-esquerda'] },
      { nome: 'olho-direito', classe: 'olhoDireito', x: 620, y: 215, largura: 250, altura: 240, excluir: ['sobrancelha-direita'] },
      { nome: 'nariz', classe: 'nariz', x: 235, y: 520, largura: 105, altura: 165 },
      { nome: 'boca', classe: 'boca', x: 385, y: 465, largura: 175, altura: 175 },
      { nome: 'face', classe: 'face', x: 270, y: 660, largura: 385, altura: 315, excluir: ['nariz'] },
    ],
  },
};

const CORES: Record<CorCarinhaIndica, string> = {
  azul: '#2f9bff',
  verde: '#8ace2b',
  rosa: '#ff2e9a',
  branco: '#f3f5f8',
};

function Forma({ recorte, fill }: { recorte: Recorte; fill?: string }) {
  return recorte.pontos ? (
    <polygon points={recorte.pontos} fill={fill} />
  ) : (
    <rect x={recorte.x} y={recorte.y} width={recorte.largura} height={recorte.altura} fill={fill} />
  );
}

/** Artes originais da INDICA, com respostas discretas ao foco da navegação. */
export function CarinhaIndica({
  estado = 'neutro',
  expressao = '02',
  cor = 'branco',
  className = '',
}: {
  estado?: EstadoCarinhaIndica;
  expressao?: ExpressaoCarinhaIndica;
  cor?: CorCarinhaIndica;
  className?: string;
}) {
  const instancia = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const prefixo = `carinha-${instancia}-${expressao}`;
  const arte = ARTES[expressao];
  const fonte = arquivoPublico(`/marca/rostos/rosto-${expressao}.png`);

  return (
    <svg
      className={`${styles.carinha} ${className}`}
      data-estado={estado}
      data-expressao={expressao}
      data-cor={cor}
      viewBox={arte.viewBox}
      width="64"
      height="64"
      preserveAspectRatio="xMidYMid meet"
      style={{ '--centro-rosto': arte.centro } as CSSProperties}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id={`${prefixo}-base`} maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080">
          <rect width="1080" height="1080" fill="white" />
          {arte.recortes.map((recorte) => <Forma key={recorte.nome} recorte={recorte} fill="black" />)}
        </mask>
        {arte.recortes.map((recorte) => (
          <clipPath key={recorte.nome} id={`${prefixo}-${recorte.nome}`} clipPathUnits="userSpaceOnUse">
            <Forma recorte={recorte} />
          </clipPath>
        ))}
        {arte.recortes.filter((recorte) => recorte.excluir?.length).map((recorte) => (
          <mask key={recorte.nome} id={`${prefixo}-${recorte.nome}-separado`} maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080">
            <rect width="1080" height="1080" fill="white" />
            {recorte.excluir?.map((nome) => {
              const excluido = arte.recortes.find((parte) => parte.nome === nome);
              return excluido ? <Forma key={nome} recorte={excluido} fill="black" /> : null;
            })}
          </mask>
        ))}
        <filter id={`${prefixo}-tinta`} filterUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="luminancia" />
          <feComponentTransfer in="luminancia" result="negativo">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          {/* O recorte original evita tingir áreas transparentes entre partes em movimento. */}
          <feComposite in="negativo" in2="SourceAlpha" operator="in" result="tintaAlpha" />
          <feFlood floodColor={CORES[cor]} result="cor" />
          <feComposite in="cor" in2="tintaAlpha" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#${prefixo}-tinta)`}>
        <g className={styles.rosto}>
          <image href={fonte} width="1080" height="1080" mask={`url(#${prefixo}-base)`} />
          {arte.recortes.map((recorte) => (
            <g
                key={recorte.nome}
                className={`${styles.recorte} ${styles[recorte.classe]}`}
                style={{ '--origem': `${recorte.x + recorte.largura / 2}px ${recorte.y + recorte.altura / 2}px` } as CSSProperties}
            >
              <image href={fonte} width="1080" height="1080"
                clipPath={`url(#${prefixo}-${recorte.nome})`}
                mask={recorte.excluir?.length ? `url(#${prefixo}-${recorte.nome}-separado)` : undefined} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
