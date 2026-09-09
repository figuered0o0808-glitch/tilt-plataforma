export function Passos({ passos, atual }: { passos: readonly string[]; atual: number }) {
  return (
    <ol className="passos">
      {passos.map((passo, indice) => {
        const estado =
          indice === atual ? ' passo--ativo' : indice < atual ? ' passo--concluido' : '';
        return (
          <li key={passo} className={`passo${estado}`} aria-current={indice === atual ? 'step' : undefined}>
            <span className="passo__numero">{indice + 1}</span>
            {passo}
          </li>
        );
      })}
    </ol>
  );
}
