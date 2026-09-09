'use client';

export function Abas<T extends string>({
  abas,
  atual,
  aoTrocar,
}: {
  abas: { id: T; rotulo: string }[];
  atual: T;
  aoTrocar: (id: T) => void;
}) {
  return (
    <div className="abas" role="tablist">
      {abas.map((aba) => (
        <button
          key={aba.id}
          type="button"
          role="tab"
          id={`aba-${aba.id}`}
          className="aba"
          aria-selected={aba.id === atual}
          aria-controls={`painel-${aba.id}`}
          onClick={() => aoTrocar(aba.id)}
        >
          {aba.rotulo}
        </button>
      ))}
    </div>
  );
}
