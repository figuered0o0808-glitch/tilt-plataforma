/**
 * Arquivo unico de strings da interface (pt-BR).
 *
 * Para uma versao em ingles, duplique a pasta `pt-BR`, traduza os arquivos e
 * troque as importacoes abaixo. Nenhum texto de interface deve ser escrito
 * direto nos componentes de controle (botoes, rotulos, abas, estados).
 */
import { comum } from '@/i18n/pt-BR/comum';
import { home } from '@/i18n/pt-BR/home';
import { editais } from '@/i18n/pt-BR/editais';
import { aprendizado } from '@/i18n/pt-BR/aprendizado';
import { paineis } from '@/i18n/pt-BR/paineis';
import { fluxos } from '@/i18n/pt-BR/fluxos';
import { cadastro } from '@/i18n/pt-BR/cadastro';

export const t = {
  comum,
  home,
  editais,
  aprendizado,
  paineis,
  fluxos,
  cadastro,
} as const;

export type Strings = typeof t;
