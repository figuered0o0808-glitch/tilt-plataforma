import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { numero } from '@/lib/format';
import type { Call } from '@/lib/types';

/**
 * As vagas de uma chamada como fileira de pontos: um por vaga ate o maximo
 * declarado. Cheio, projeto ja selecionado (so existe depois do resultado);
 * vazado, vaga aberta. E o mesmo ponto do logotipo virando medida.
 *
 * A fileira e desenho: para quem nao ve, o numero esta na legenda. Por isso
 * ela leva aria-hidden e a legenda nunca e omitida.
 *
 * As strings moram em home.coluna porque nasceram na home, e a chamada, a
 * lateral e a lista usam as mesmas: uma lista de strings, tres idiomas.
 */

/** Modelo curto com chaves entre chaves: "{n} de {max}". */
function preencher(modelo: string, valores: Record<string, string>): string {
  return modelo.replace(/\{(\w+)\}/g, (_, chave: string) => valores[chave] ?? '');
}

export function Vagas({
  idioma,
  chamada,
  semRotulo,
}: {
  idioma: Idioma;
  chamada: Call;
  /** Some o rotulo "Vagas" acima da fileira, quando o contexto ja o diz. */
  semRotulo?: boolean;
}) {
  const tc = textos(idioma).home.coluna;
  const max = chamada.vagas?.max ?? 0;
  if (max <= 0) return null;

  const selecionados = chamada.resultado?.apoiados.length ?? 0;
  const abertas = Math.max(max - selecionados, 0);
  const legenda =
    selecionados > 0
      ? preencher(tc.vagasSelecionados, {
          n: numero(selecionados, idioma),
          r: numero(abertas, idioma),
        })
      : preencher(tc.vagasFaixa, {
          min: numero(chamada.vagas?.min ?? 0, idioma),
          max: numero(max, idioma),
        });

  return (
    <div>
      {semRotulo ? null : (
        <p className="rotulo" style={{ margin: '0 0 10px' }}>
          {tc.vagas}
        </p>
      )}
      <div className="pontos" aria-hidden="true">
        {Array.from({ length: max }, (_, indice) => (
          <span
            key={indice}
            className={indice < selecionados ? 'pontos__ponto' : 'pontos__ponto pontos__ponto--vazado'}
          />
        ))}
      </div>
      <p className="texto-pequeno" style={{ margin: '9px 0 0' }}>
        {legenda}
      </p>
    </div>
  );
}
