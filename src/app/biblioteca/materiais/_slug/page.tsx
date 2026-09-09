import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { materiais, materiaisDaTrilha, materialPorSlug } from '@/lib/data';
import { data } from '@/lib/format';

import { CartaoMaterial, marcaDaTrilha, rotuloTrilha } from '../_CartaoMaterial';

export function generateStaticParams() {
  return materiais.map((material) => ({ slug: material.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const material = materialPorSlug(slug);
  return {
    title: material?.titulo ?? t.aprendizado.materiais.titulo,
    description: material?.resumo ?? t.aprendizado.materiais.descricao,
  };
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = materialPorSlug(slug);
  if (!material) notFound();

  const trilha = rotuloTrilha(material.trilha);
  const sugestao = materiaisDaTrilha(material.trilha).find(
    (outro) => outro.slug !== material.slug,
  );

  return (
    <>
      <CabecalhoPagina
        estreito
        olho={`${t.aprendizado.materiais.titulo}: ${trilha}`}
        titulo={material.titulo}
      />

      <div className="secao secao--curta">
        <div className="container-estreito pilha--g">
          <div
            className="cartao cartao--marcado"
            style={{ '--marca': marcaDaTrilha(material.trilha) } as CSSProperties}
          >
            <p className="olho" style={{ margin: 0 }}>
              {t.aprendizado.materiais.resumoTitulo}
            </p>
            <p style={{ margin: 0 }}>{material.resumo}</p>
          </div>

          <dl className="definicoes definicoes--2">
            <div>
              <dt>{t.aprendizado.materiais.formato}</dt>
              <dd>{material.formato}</dd>
            </div>
            <div>
              <dt>{t.aprendizado.materiais.tempoLeitura}</dt>
              <dd>{material.tempoLeitura}</dd>
            </div>
            <div>
              <dt>{t.aprendizado.materiais.atualizadoEm}</dt>
              <dd>{data(material.atualizadoEm)}</dd>
            </div>
          </dl>

          <div className="prosa">
            {material.secoes.map((secao) => (
              <section key={secao.titulo}>
                <h2>{secao.titulo}</h2>
                {secao.paragrafos.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </section>
            ))}
          </div>

          <div
            className="cartao cartao--compacto"
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}
          >
            <Selo status="licenca" rotulo={material.licenca} />
            <p className="texto-pequeno texto-secundario" style={{ margin: 0 }}>
              {t.aprendizado.materiais.licencaNota}
            </p>
          </div>

          <div className="linha">
            <Botao
              href={`/biblioteca/materiais#${material.trilha}`}
              variante="discreto"
              tamanho="pequeno"
            >
              {t.aprendizado.materiais.voltarTrilha}: {trilha}
            </Botao>
          </div>
        </div>
      </div>

      {sugestao ? (
        <div className="secao secao--curta">
          <div className="container-estreito pilha">
            <p className="olho" style={{ margin: 0 }}>
              {t.aprendizado.materiais.leiaTambem}
            </p>
            <CartaoMaterial material={sugestao} />
          </div>
        </div>
      ) : null}
    </>
  );
}
