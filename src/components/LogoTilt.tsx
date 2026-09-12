/**
 * Wordmark da TILT: as letras T I L T desenhadas em matriz de pontos,
 * tres linhas, como no logotipo oficial (tiltnetwork.com).
 */

export const PASSO = 7.5;
export const RAIO = 3;

/** [coluna, linha] de cada ponto, em unidades de grade. A ordem importa:
 *  Enxame.tsx associa a cada ponto, por indice, o deslocamento inicial. */
export const PONTOS: [number, number][] = [
  // T
  [0, 0], [1, 0], [2, 0], [1, 1], [1, 2],
  // I (com barras superior e inferior)
  [3.5, 0], [4.5, 0], [5.5, 0], [4.5, 1], [3.5, 2], [4.5, 2], [5.5, 2],
  // L
  [7, 0], [7, 1], [7, 2], [8, 2],
  // T
  [9.5, 0], [10.5, 0], [11.5, 0], [10.5, 1], [10.5, 2],
];

export const LARGURA = 11.5 * PASSO + 2 * (RAIO + 1);
export const ALTURA = 2 * PASSO + 2 * (RAIO + 1);

/** Centro de um ponto no viewBox, a partir da posicao na grade. */
export function centro([coluna, linha]: [number, number]): { cx: number; cy: number } {
  return { cx: RAIO + 1 + coluna * PASSO, cy: RAIO + 1 + linha * PASSO };
}

export function LogoTilt({ altura = 22, rotulo }: { altura?: number; rotulo?: string }) {
  return (
    <svg
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      height={altura}
      width={(altura * LARGURA) / ALTURA}
      role={rotulo ? 'img' : 'presentation'}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
    >
      {PONTOS.map(([coluna, linha]) => (
        <circle
          key={`${coluna}-${linha}`}
          cx={RAIO + 1 + coluna * PASSO}
          cy={RAIO + 1 + linha * PASSO}
          r={RAIO}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
