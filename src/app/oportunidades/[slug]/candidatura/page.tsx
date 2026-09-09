import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { Chip } from '@/components/Chip';
import { t } from '@/i18n/strings';
import { editais, editalPorSlug } from '@/lib/data';

import { prazoEmLinha } from '../../_prazo';

import { FormularioCandidatura, type EditalResumo } from './_FormularioCandidatura';

/** Só chamadas com inscrições abertas recebem página de candidatura. */
export function generateStaticParams() {
  return editais
    .filter((edital) => edital.status === 'aberta')
    .map((edital) => ({ slug: edital.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edital = editalPorSlug(slug);
  return {
    title: edital ? `${t.fluxos.candidatura.titulo}: ${edital.titulo}` : t.fluxos.candidatura.titulo,
  };
}

export default async function PaginaCandidatura({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edital = editalPorSlug(slug);
  if (!edital || edital.status !== 'aberta') notFound();

  const resumo: EditalResumo = {
    slug: edital.slug,
    titulo: edital.titulo,
    faixaApoio: edital.faixaApoio,
  };

  return (
    <>
      <CabecalhoPagina estreito olho={t.fluxos.candidatura.titulo} titulo={edital.titulo} />

      <div className="secao secao--curta" style={{ paddingBottom: 0 }}>
        <div className="container-estreito">
          <div className="chips">
            <Chip vazado>{prazoEmLinha(edital)}</Chip>
          </div>
        </div>
      </div>

      <div className="secao">
        <div className="container-estreito">
          <FormularioCandidatura edital={resumo} />
        </div>
      </div>
    </>
  );
}
