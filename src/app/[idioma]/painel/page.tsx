import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';

import { Painel } from './_Painel';

/**
 * O titulo fica no nome da area, e nao no que ela mostra, porque a pagina
 * muda conforme o cadastro esteja aberto ou fechado.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) return {};
  return { title: textos(idioma).paineis.olho };
}

export default async function PaginaPainel({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  return <Painel idioma={idioma} />;
}
