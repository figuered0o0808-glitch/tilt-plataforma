import type { CSSProperties } from 'react';

import { ALTURA, LARGURA, PONTOS, RAIO, centro } from '@/components/LogoTilt';
import { PROGRAM_NAME } from '@/config/program';

/**
 * A marca em movimento: os 21 pontos do logotipo entram espalhados e assentam
 * na forma da palavra. O ponto e a comunidade; a marca e o encontro.
 *
 * Os deslocamentos iniciais, um por ponto e na ordem de PONTOS, sao fixos.
 * Nada aqui sorteia posicao: servidor e navegador desenham o mesmo SVG, e a
 * animacao (keyframes `assentar`, em globals.css) e que leva cada ponto ate o
 * lugar dele. Roda uma vez, no carregamento, e para.
 *
 * A unidade do deslocamento e o pixel do viewBox, nao da tela: o SVG cresce e
 * encolhe com a largura pedida e o percurso acompanha.
 */
const DESLOCAMENTOS: [number, number][] = [
  // T
  [-38, 26], [22, -19], [-14, -31], [31, 14], [-26, -8],
  // I
  [17, 29], [-33, 12], [9, -27], [-21, 21], [28, -13], [-9, 33], [24, 18],
  // L
  [-30, -22], [13, 27], [-18, -15], [35, 9],
  // T
  [-12, 24], [26, -25], [-35, 7], [11, 31], [-24, -18],
];

export function Enxame({ largura = 560, rotulo = PROGRAM_NAME }: { largura?: number; rotulo?: string }) {
  return (
    <svg
      className="enxame"
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      width={largura}
      role="img"
      aria-label={rotulo}
    >
      <g fill="currentColor">
        {PONTOS.map((ponto, indice) => {
          const { cx, cy } = centro(ponto);
          const [dx, dy] = DESLOCAMENTOS[indice] ?? [0, 0];
          return (
            <circle
              key={`${ponto[0]}-${ponto[1]}`}
              className="enxame__ponto"
              style={{ '--dx': `${dx}px`, '--dy': `${dy}px` } as CSSProperties}
              cx={cx}
              cy={cy}
              r={RAIO}
            />
          );
        })}
      </g>
    </svg>
  );
}

/**
 * A ponte entre a marca e as colunas: tres pontos, um na cor de cada coluna,
 * que surgem depois que a marca assentou. O rotulo vem de quem usa, ja no
 * idioma da pagina.
 */
export function Ponte({ rotulo }: { rotulo?: string }) {
  return (
    <div className="ponte">
      <span className="ponte__ponto ponte__ponto--rosa" aria-hidden="true" />
      <span className="ponte__ponto ponte__ponto--menta" aria-hidden="true" />
      <span className="ponte__ponto ponte__ponto--amarelo" aria-hidden="true" />
      {rotulo ? <span className="ponte__rotulo">{rotulo}</span> : null}
    </div>
  );
}
