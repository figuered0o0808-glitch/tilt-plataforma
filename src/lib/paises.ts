/**
 * Paises do cadastro.
 *
 * O cadastro guarda o codigo ISO de dois digitos, nao o nome escrito. Duas
 * razoes.
 *
 * 1. O nome depende do idioma de quem preenche. Sem codigo, a mesma pessoa
 *    entraria como "Brasil" em portugues, "Brazil" em ingles e "Brasil" em
 *    espanhol, e o painel da equipe leria tres paises onde ha um.
 * 2. O nome depende de quem digita. Em campo livre, "EUA", "Estados Unidos" e
 *    "United States" sao tres linhas diferentes de uma lista que deveria ter
 *    uma.
 *
 * Os nomes vem do proprio navegador, por Intl.DisplayNames, entao a lista sai
 * traduzida nos tres idiomas sem manter tres listas a mao. Quando o navegador
 * nao souber traduzir um codigo, ele devolve o proprio codigo, e e isso que
 * aparece: melhor um codigo do que um campo vazio.
 */

import type { Idioma } from '@/i18n/idiomas';

/**
 * Codigos ISO 3166-1 alfa-2.
 *
 * Nao e a lista completa das Nacoes Unidas: e onde a INDICA tem ou pode ter
 * criador, que e America, Europa ocidental e as pracas de lingua portuguesa na
 * Africa e na Asia. Acrescentar um codigo aqui basta para ele aparecer nos tres
 * idiomas.
 */
export const PAISES: string[] = [
  // America do Sul
  'AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE',
  // America Central e Caribe
  'BZ', 'CR', 'CU', 'DO', 'SV', 'GT', 'HT', 'HN', 'JM', 'NI', 'PA', 'PR', 'TT',
  // America do Norte
  'CA', 'MX', 'US',
  // Europa
  'AT', 'BE', 'CH', 'CZ', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'GR', 'HU', 'IE',
  'IS', 'IT', 'LU', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE',
  // Africa
  'AO', 'CV', 'GW', 'MA', 'MZ', 'NG', 'GQ', 'ST', 'ZA', 'KE',
  // Asia e Oceania
  'AU', 'CN', 'IN', 'ID', 'JP', 'KR', 'MO', 'NZ', 'PH', 'SG', 'TL', 'TR', 'AE',
];

/** O codigo do pais que o formulario ja vem marcando. */
export const PAIS_PADRAO = 'BR';

const LOCALIDADE: Record<Idioma, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

/**
 * Nome do pais no idioma pedido.
 *
 * Intl.DisplayNames existe em todo navegador que roda este site, mas a chamada
 * fica protegida: se a implementacao faltar ou o codigo for desconhecido, o
 * retorno e o proprio codigo, e nada quebra por causa de um rotulo.
 */
export function nomeDoPais(codigo: string, idioma: Idioma): string {
  try {
    const nomes = new Intl.DisplayNames([LOCALIDADE[idioma]], { type: 'region' });
    return nomes.of(codigo) ?? codigo;
  } catch {
    return codigo;
  }
}

/** A lista pronta para um seletor, ja ordenada pelo nome traduzido. */
export function opcoesDePais(idioma: Idioma): { valor: string; rotulo: string }[] {
  return PAISES.map((codigo) => ({ valor: codigo, rotulo: nomeDoPais(codigo, idioma) })).sort(
    (a, b) => a.rotulo.localeCompare(b.rotulo, LOCALIDADE[idioma]),
  );
}
