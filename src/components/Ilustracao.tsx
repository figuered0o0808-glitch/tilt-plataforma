import type { ReactElement } from 'react';

/**
 * Ilustracoes na linguagem visual da TILT: traco preto fino, formas chapadas
 * nos tons pastel e a matriz de pontos como textura. Sem fotos e sem imagens
 * de banco.
 */

export type NomeIlustracao =
  | 'hero'
  | 'edital'
  | 'diretorio'
  | 'curso'
  | 'material'
  | 'busca'
  | 'lista'
  | 'pasta'
  | 'enviado'
  | 'transparencia'
  | 'intermediacao';

/** Matriz de pontos: a textura de marca da TILT. */
function Pontos({
  x,
  y,
  colunas,
  linhas,
  passo = 14,
  raio = 2.2,
  opacidade = 1,
}: {
  x: number;
  y: number;
  colunas: number;
  linhas: number;
  passo?: number;
  raio?: number;
  opacidade?: number;
}) {
  const pontos: ReactElement[] = [];
  for (let l = 0; l < linhas; l += 1) {
    for (let c = 0; c < colunas; c += 1) {
      pontos.push(
        <circle
          key={`${l}-${c}`}
          cx={x + c * passo}
          cy={y + l * passo}
          r={raio}
          fill="currentColor"
          stroke="none"
        />,
      );
    }
  }
  return <g opacity={opacidade}>{pontos}</g>;
}

const DESENHOS: Record<NomeIlustracao, { viewBox: string; conteudo: ReactElement }> = {
  hero: {
    viewBox: '0 0 240 180',
    conteudo: (
      <>
        <circle cx="66" cy="70" r="44" fill="var(--menta)" stroke="none" />
        <rect x="62" y="22" width="116" height="140" rx="10" fill="var(--branco)" />
        <Pontos x={80} y={48} colunas={6} linhas={4} passo={16} raio={2.6} />
        <path d="M80 124h80" />
        <circle cx="196" cy="46" r="18" fill="var(--amarelo)" stroke="none" />
        <Pontos x={188} y={38} colunas={3} linhas={3} passo={8} raio={1.9} />
        <Pontos x={30} y={150} colunas={5} linhas={1} passo={11} raio={2.2} opacidade={0.35} />
      </>
    ),
  },
  edital: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <rect x="24" y="10" width="64" height="76" rx="7" fill="var(--branco)" />
        <Pontos x={38} y={28} colunas={4} linhas={3} passo={12} raio={2.2} />
        <circle cx="82" cy="72" r="13" fill="var(--menta)" />
        <path d="M76.5 72.5l4 4 7.5-8.5" />
      </>
    ),
  },
  diretorio: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <path d="M38 34l24-14 24 18-16 32-32 4z" fill="none" opacity="0.35" />
        <circle cx="38" cy="34" r="10" fill="var(--azul)" />
        <circle cx="62" cy="20" r="7" fill="var(--branco)" />
        <circle cx="86" cy="38" r="11" fill="var(--menta)" />
        <circle cx="70" cy="70" r="8" fill="var(--branco)" />
        <circle cx="38" cy="74" r="7" fill="var(--rosa)" />
      </>
    ),
  },
  curso: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <path d="M20 30c14-7 27-7 40 0v42c-13-7-26-7-40 0z" fill="var(--amarelo)" />
        <path d="M100 30c-14-7-27-7-40 0v42c13-7 26-7 40 0z" fill="var(--branco)" />
        <path d="M60 30v42" />
        <Pontos x={70} y={44} colunas={3} linhas={2} passo={10} raio={1.9} />
        <Pontos x={30} y={44} colunas={3} linhas={2} passo={10} raio={1.9} />
      </>
    ),
  },
  material: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <rect x="20" y="26" width="58" height="60" rx="6" fill="var(--areia)" />
        <path d="M36 10h40l16 16v54a5 5 0 0 1-5 5H36a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5z" fill="var(--branco)" />
        <path d="M76 10v16h16" />
        <Pontos x={46} y={44} colunas={4} linhas={3} passo={11} raio={2.1} />
      </>
    ),
  },
  busca: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <Pontos x={24} y={20} colunas={6} linhas={5} passo={14} raio={2.2} opacidade={0.28} />
        <circle cx="54" cy="42" r="23" fill="var(--branco)" />
        <Pontos x={44} y={36} colunas={3} linhas={2} passo={10} raio={2.1} />
        <path d="M71 59l19 19" strokeWidth="2" />
      </>
    ),
  },
  lista: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <rect x="28" y="14" width="64" height="70" rx="7" fill="var(--branco)" />
        <rect x="48" y="6" width="24" height="15" rx="5" fill="var(--menta)" />
        <Pontos x={42} y={38} colunas={4} linhas={3} passo={12} raio={2.2} />
        <path d="M76 36.5l3.5 3.5 6-7" />
      </>
    ),
  },
  pasta: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <path d="M20 28a5 5 0 0 1 5-5h21l9 11h40a5 5 0 0 1 5 5v35a5 5 0 0 1-5 5H25a5 5 0 0 1-5-5z" fill="var(--areia)" />
        <path d="M20 45h80" />
        <Pontos x={36} y={60} colunas={4} linhas={1} passo={13} raio={2.2} />
      </>
    ),
  },
  enviado: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <rect x="28" y="24" width="62" height="46" rx="7" fill="var(--branco)" />
        <path d="M28 31l31 23 31-23" />
        <circle cx="90" cy="68" r="14" fill="var(--menta)" />
        <path d="M84 68.5l4.5 4.5 7.5-9" />
        <Pontos x={6} y={38} colunas={2} linhas={3} passo={9} raio={2} opacidade={0.5} />
      </>
    ),
  },
  transparencia: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <rect x="18" y="18" width="84" height="60" rx="7" fill="var(--branco)" />
        <path d="M18 36h84" />
        <rect x="18" y="36" width="84" height="14" fill="var(--amarelo)" stroke="none" />
        <path d="M18 50h84M18 64h84" opacity="0.3" />
        <Pontos x={32} y={43} colunas={3} linhas={1} passo={12} raio={2.1} />
        <Pontos x={32} y={57} colunas={3} linhas={1} passo={12} raio={2.1} opacidade={0.5} />
        <Pontos x={32} y={71} colunas={3} linhas={1} passo={12} raio={2.1} opacidade={0.5} />
        <path d="M82 40.5l3 3 5.5-6.5" />
      </>
    ),
  },
  intermediacao: {
    viewBox: '0 0 120 96',
    conteudo: (
      <>
        <circle cx="24" cy="48" r="13" fill="var(--azul)" />
        <circle cx="96" cy="48" r="13" fill="var(--rosa)" />
        <path d="M37 48h9M74 48h9" strokeDasharray="3 5" />
        <path d="M60 32l13 16-13 16-13-16z" fill="var(--branco)" />
        <Pontos x={56} y={44} colunas={2} linhas={2} passo={8} raio={1.8} />
      </>
    ),
  },
};

export function Ilustracao({
  nome,
  largura = 120,
  className,
}: {
  nome: NomeIlustracao;
  largura?: number;
  className?: string;
}) {
  const desenho = DESENHOS[nome];
  return (
    <svg
      className={`ilustracao ${className ?? ''}`}
      viewBox={desenho.viewBox}
      width={largura}
      role="presentation"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ height: 'auto' }}
    >
      {desenho.conteudo}
    </svg>
  );
}
