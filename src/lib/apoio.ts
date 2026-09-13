import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { moeda } from '@/lib/format';
import type { Call } from '@/lib/types';

/**
 * Como o apoio de uma chamada aparece em texto, nos lugares em que antes so
 * havia dinheiro. Uma chamada pode nao ter valor definido (em negociacao) ou
 * oferecer outra coisa (residencia, mentoria, estudio): nesses casos entra a
 * descricao, e sem descricao entra "A definir". Cinco telas mostravam a faixa
 * cada uma do seu jeito; agora todas perguntam aqui.
 */
export function textoDoApoio(idioma: Idioma, edital: Call): string {
  const t = textos(idioma).editais;
  if (edital.faixaApoio) {
    return `${moeda(edital.faixaApoio.min, idioma)} ${t.faixaSeparador} ${moeda(edital.faixaApoio.max, idioma)}`;
  }
  return edital.apoioDescricao ?? t.semValor;
}

export function textoDoValorTotal(idioma: Idioma, edital: Call): string {
  const t = textos(idioma).editais;
  return edital.valorTotal != null ? moeda(edital.valorTotal, idioma) : t.semValor;
}
