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
    <header className="secao secao--curta cabecalho-pagina">
      <div className={estreito ? 'container-estreito' : 'container'}>
        {olho ? <p className="olho">{olho}</p> : null}
        <div className="linha linha--fim cabecalho-pagina__topo">
          <div className="cabecalho-pagina__texto">
            <h1>{titulo}</h1>
            {descricao ? <p className="texto-guia">{descricao}</p> : null}
          </div>
          {acoes ? <div className="linha">{acoes}</div> : null}
        </div>
      </div>
    </header>
  );
}
