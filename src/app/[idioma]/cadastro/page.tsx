import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';

import { Cadastro } from './_Cadastro';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) return {};
  return { title: textos(idioma).cadastro.olho };
}

/**
 * Cadastro. A pagina inteira fica no cliente porque o titulo e o conteudo
 * mudam conforme o cadastro esteja aberto ou fechado, e o formulario depende
 * do estado guardado no navegador.
 */
export default async function PaginaCadastro({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  return <Cadastro idioma={idioma} />;
}
