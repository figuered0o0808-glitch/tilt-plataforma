import type { Metadata } from 'next';

import { t } from '@/i18n/strings';

import { Cadastro } from './_Cadastro';

export const metadata: Metadata = { title: t.cadastro.olho };

/**
 * Cadastro. A pagina inteira fica no cliente porque o titulo e o conteudo
 * mudam conforme o cadastro esteja aberto ou fechado, e o formulario depende
 * do estado guardado no navegador.
 */
export default function PaginaCadastro() {
  return <Cadastro />;
}
