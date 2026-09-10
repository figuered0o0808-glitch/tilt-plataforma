/**
 * Strings da interface, uma pasta por idioma.
 *
 * Toda string de controle (botao, rotulo, aba, estado) sai daqui, nunca do
 * componente. Para acrescentar um idioma: duplique a pasta pt, traduza os
 * arquivos e registre abaixo.
 */
import type { Idioma } from '@/i18n/idiomas';

import { comum as ptComum } from '@/i18n/pt/comum';
import { home as ptHome } from '@/i18n/pt/home';
import { editais as ptEditais } from '@/i18n/pt/editais';
import { aprendizado as ptAprendizado } from '@/i18n/pt/aprendizado';
import { paineis as ptPaineis } from '@/i18n/pt/paineis';
import { fluxos as ptFluxos } from '@/i18n/pt/fluxos';
import { cadastro as ptCadastro } from '@/i18n/pt/cadastro';

import { comum as enComum } from '@/i18n/en/comum';
import { home as enHome } from '@/i18n/en/home';
import { editais as enEditais } from '@/i18n/en/editais';
import { aprendizado as enAprendizado } from '@/i18n/en/aprendizado';
import { paineis as enPaineis } from '@/i18n/en/paineis';
import { fluxos as enFluxos } from '@/i18n/en/fluxos';
import { cadastro as enCadastro } from '@/i18n/en/cadastro';

import { comum as esComum } from '@/i18n/es/comum';
import { home as esHome } from '@/i18n/es/home';
import { editais as esEditais } from '@/i18n/es/editais';
import { aprendizado as esAprendizado } from '@/i18n/es/aprendizado';
import { paineis as esPaineis } from '@/i18n/es/paineis';
import { fluxos as esFluxos } from '@/i18n/es/fluxos';
import { cadastro as esCadastro } from '@/i18n/es/cadastro';

const pt = {
  comum: ptComum,
  home: ptHome,
  editais: ptEditais,
  aprendizado: ptAprendizado,
  paineis: ptPaineis,
  fluxos: ptFluxos,
  cadastro: ptCadastro,
};

/**
 * O portugues e a referencia de estrutura. Widen troca os literais que o
 * `as const` cria por string, para que uma traducao com outro texto continue
 * satisfazendo o mesmo tipo.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

export type Strings = Widen<typeof pt>;

const TRADUCOES: Record<Idioma, Strings> = {
  pt,
  en: {
    comum: enComum,
    home: enHome,
    editais: enEditais,
    aprendizado: enAprendizado,
    paineis: enPaineis,
    fluxos: enFluxos,
    cadastro: enCadastro,
  } as unknown as Strings,
  es: {
    comum: esComum,
    home: esHome,
    editais: esEditais,
    aprendizado: esAprendizado,
    paineis: esPaineis,
    fluxos: esFluxos,
    cadastro: esCadastro,
  } as unknown as Strings,
};

export function textos(idioma: Idioma): Strings {
  return TRADUCOES[idioma];
}
