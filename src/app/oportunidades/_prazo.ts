/**
 * Prazo de inscricao das chamadas. `inscricoesAte` e nulo enquanto o calendario
 * da chamada nao esta fechado: nesse caso nenhuma data e escrita.
 */
import { t } from '@/i18n/strings';
import { data, dataCurta } from '@/lib/format';
import type { Call } from '@/lib/types';

/** Rotulo e valor do prazo, coerentes com a situacao e com o calendario. */
export function prazoDaChamada(
  edital: Call,
  curto = false,
): { rotulo: string; valor: string } {
  if (!edital.inscricoesAte) {
    return { rotulo: t.comum.rotulos.prazo, valor: t.editais.semPrazo };
  }
  return {
    rotulo:
      edital.status === 'aberta'
        ? t.comum.rotulos.inscricoesAte
        : t.editais.inscricoesEncerradasEm,
    valor: curto ? dataCurta(edital.inscricoesAte) : data(edital.inscricoesAte),
  };
}

/** Mesma informacao em uma linha, para rodape de cartao e para chip. */
export function prazoEmLinha(edital: Call, curto = false): string {
  if (!edital.inscricoesAte) return t.editais.prazoADefinir;
  const { rotulo, valor } = prazoDaChamada(edital, curto);
  return `${rotulo} ${valor}`;
}
