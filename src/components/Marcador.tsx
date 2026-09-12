/**
 * Marcador de coluna: um aglomerado pequeno de pontos pretos, no lugar em que
 * outro site poria um icone. Tres arranjos, para que tres colunas lado a lado
 * nao repitam o mesmo desenho. Decorativo: o rotulo ao lado e que nomeia.
 */
const ARRANJOS: Record<1 | 2 | 3, [number, number][]> = {
  1: [[4, 12], [11, 5], [17, 13], [9, 17]],
  2: [[5, 6], [14, 4], [18, 12], [8, 15], [15, 18]],
  3: [[4, 5], [12, 9], [18, 5], [7, 16], [16, 16]],
};

export function Marcador({ arranjo = 1, tamanho = 22 }: { arranjo?: 1 | 2 | 3; tamanho?: number }) {
  return (
    <svg
      className="marcador"
      viewBox="0 0 22 22"
      width={tamanho}
      height={tamanho}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {ARRANJOS[arranjo].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.6} />
        ))}
      </g>
    </svg>
  );
}
