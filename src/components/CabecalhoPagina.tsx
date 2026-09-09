import type { ReactNode } from 'react';

/** Cabecalho padrao de pagina: olho, titulo, descricao e acoes. */
export function CabecalhoPagina({
  olho,
  titulo,
  descricao,
  acoes,
  estreito,
}: {
  olho?: string;
  titulo: string;
  descricao?: string;
  acoes?: ReactNode;
  estreito?: boolean;
}) {
  return (
    <header className="secao secao--curta" style={{ paddingBottom: 0 }}>
      <div className={estreito ? 'container-estreito' : 'container'}>
        {olho ? <p className="olho">{olho}</p> : null}
        <div className="linha linha--fim" style={{ alignItems: 'flex-end', gap: 20 }}>
          <div style={{ maxWidth: '46rem' }}>
            <h1>{titulo}</h1>
            {descricao ? <p className="texto-guia">{descricao}</p> : null}
          </div>
          {acoes ? <div className="linha">{acoes}</div> : null}
        </div>
      </div>
    </header>
  );
}
