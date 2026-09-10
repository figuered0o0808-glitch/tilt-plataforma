import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { PROGRAM_NAME, PROGRAM_TAGLINE } from '@/config/program';
import { IDIOMAS, ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) return { title: PROGRAM_NAME };
  return {
    title: { default: PROGRAM_NAME, template: `%s | ${PROGRAM_NAME}` },
    description: `${PROGRAM_TAGLINE}. ${textos(idioma).comum.rodape.descricao}`,
  };
}

export default async function LayoutIdioma({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  return (
    <>
      <SiteHeader idioma={idioma} />
      <main>{children}</main>
      <SiteFooter idioma={idioma} />
    </>
  );
}
