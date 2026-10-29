'use client';

import { useId, type CSSProperties } from 'react';

import { arquivoPublico } from '@/lib/format';

import styles from './CarinhaIndica.module.css';

export type EstadoCarinhaIndica = 'neutro' | 'oportunidades' | 'cadastro' | 'biblioteca' | 'confirmacao';

type Recorte = {
  nome: string;
  classe: string;
  x: number;
  y: number;
  largura: number;
  altura: number;
};

/* Os recortes enquadram os traços existentes: nenhuma letra é redesenhada. */
const RECORTES: Recorte[] = [
  { nome: 'sobrancelha-esquerda', classe: 'sobrancelhaEsquerda', x: 245, y: 150, largura: 200, altura: 90 },
  { nome: 'sobrancelha-direita', classe: 'sobrancelhaDireita', x: 540, y: 145, largura: 215, altura: 105 },
  { nome: 'olho-esquerdo', classe: 'olhoEsquerdo', x: 275, y: 270, largura: 225, altura: 245 },
  { nome: 'olho-direito', classe: 'olhoDireito', x: 500, y: 270, largura: 250, altura: 245 },
  { nome: 'orelha', classe: 'orelha', x: 810, y: 330, largura: 155, altura: 190 },
  { nome: 'nariz', classe: 'nariz', x: 415, y: 510, largura: 110, altura: 180 },
  { nome: 'boca', classe: 'boca', x: 380, y: 720, largura: 215, altura: 210 },
];

/** Arte original da INDICA, com respostas discretas ao foco da navegação. */
export function CarinhaIndica({
  estado = 'neutro',
  className = '',
}: {
  estado?: EstadoCarinhaIndica;
  className?: string;
}) {
  const instancia = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const prefixo = `carinha-${instancia}`;
  const fonte = arquivoPublico('/marca/rostos/rosto-02.png');

  return (
    <svg
      className={`${styles.carinha} ${className}`}
      data-estado={estado}
      viewBox="220 120 780 850"
      width="156"
      height="170"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id={`${prefixo}-base`} maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080">
          <rect width="1080" height="1080" fill="white" />
          {RECORTES.map((recorte) => (
            <rect key={recorte.nome} x={recorte.x} y={recorte.y} width={recorte.largura} height={recorte.altura} fill="black" />
          ))}
        </mask>
        {RECORTES.map((recorte) => (
          <clipPath key={recorte.nome} id={`${prefixo}-${recorte.nome}`} clipPathUnits="userSpaceOnUse">
            <rect x={recorte.x} y={recorte.y} width={recorte.largura} height={recorte.altura} />
          </clipPath>
        ))}
      </defs>
      <g className={styles.rosto}>
        <image href={fonte} width="1080" height="1080" mask={`url(#${prefixo}-base)`} />
        {RECORTES.map((recorte) => (
          <g
              key={recorte.nome}
              className={`${styles.recorte} ${styles[recorte.classe]}`}
              style={{ '--origem': `${recorte.x + recorte.largura / 2}px ${recorte.y + recorte.altura / 2}px` } as CSSProperties}
          >
            <image href={fonte} width="1080" height="1080" clipPath={`url(#${prefixo}-${recorte.nome})`} />
          </g>
        ))}
      </g>
    </svg>
  );
}
