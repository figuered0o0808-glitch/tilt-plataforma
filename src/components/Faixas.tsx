/**
 * Sistema visual do manual: faixas horizontais da paleta, em larguras
 * diferentes. Usado no lugar de repetir o logotipo.
 */
const PADRAO = [
  { cor: 'var(--azul)', peso: 14 },
  { cor: 'var(--amarelo)', peso: 4 },
  { cor: 'var(--menta)', peso: 22 },
  { cor: 'var(--areia)', peso: 38 },
  { cor: 'var(--rosa)', peso: 8 },
  { cor: 'var(--branco)', peso: 14 },
];

export function Faixas({
  altura = 'normal',
  invertido,
}: {
  altura?: 'fina' | 'normal' | 'alta';
  invertido?: boolean;
}) {
  const classe =
    altura === 'fina' ? 'faixas faixas--fina' : altura === 'alta' ? 'faixas faixas--alta' : 'faixas';
  const faixas = invertido ? [...PADRAO].reverse() : PADRAO;
  return (
    <div className={classe} aria-hidden="true">
      {faixas.map((faixa) => (
        <span key={faixa.cor + faixa.peso} style={{ background: faixa.cor, flex: faixa.peso }} />
      ))}
    </div>
  );
}
