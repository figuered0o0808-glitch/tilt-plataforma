import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { Chip } from '@/components/Chip';
import { IDIOMAS, ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo, editalPorSlug } from '@/lib/data';

import { prazoEmLinha } from '../../_prazo';

import { FormularioCandidatura, type EditalResumo } from './_FormularioCandidatura';

/**
 * Só chamadas com inscrições abertas recebem página de candidatura, e só no
 * idioma em que a chamada está publicada.
 */
export function generateStaticParams() {
  return IDIOMAS.flatMap((idioma) =>
    conteudo(idioma)
      .editais.filter((edital) => edital.status === 'aberta')
      .map((edital) => ({ idioma, slug: edital.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string; slug: string }>;
}): Promise<Metadata> {
  const { idioma, slug } = await params;
  if (!ehIdioma(idioma)) return {};
  const tc = textos(idioma).fluxos.candidatura;
  const edital = editalPorSlug(idioma, slug);
  return { title: edital ? `${tc.titulo}: ${edital.titulo}` : tc.titulo };
}

export default async function PaginaCandidatura({
  params,
}: {
  params: Promise<{ idioma: string; slug: string }>;
}) {
  const { idioma, slug } = await params;
  if (!ehIdioma(idioma)) notFound();

  const edital = editalPorSlug(idioma, slug);
  if (!edital || edital.status !== 'aberta') notFound();

  const resumo: EditalResumo = {
    slug: edital.slug,
    titulo: edital.titulo,
    faixaApoio: edital.faixaApoio,
  };

  return (
    <>
      <CabecalhoPagina
        estreito
        olho={textos(idioma).fluxos.candidatura.titulo}
        titulo={edital.titulo}
      />

      <div className="secao secao--curta" style={{ paddingBottom: 0 }}>
        <div className="container-estreito">
          <div className="chips">
            <Chip vazado>{prazoEmLinha(idioma, edital)}</Chip>
          </div>
        </div>
      </div>

      <div className="secao">
        <div className="container-estreito">
          <FormularioCandidatura idioma={idioma} edital={resumo} />
        </div>
      </div>
    </>
  );
}
