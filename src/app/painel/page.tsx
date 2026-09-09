import type { Metadata } from 'next';

import { t } from '@/i18n/strings';

import { Painel } from './_Painel';

/**
 * O titulo fica no nome da area, e nao no que ela mostra, porque a pagina
 * muda conforme o cadastro esteja aberto ou fechado.
 */
export const metadata: Metadata = { title: t.paineis.olho };

export default function PaginaPainel() {
  return <Painel />;
}
