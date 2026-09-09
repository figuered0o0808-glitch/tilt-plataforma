import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { Chips } from '@/components/Chip';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { materiais, materiaisDaTrilha, materialPorSlug } from '@/lib/data';
import { arquivoPublico, data } from '@/lib/format';

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

  const r = t.aprendizado.materiais;
  const trilha = rotuloTrilha(material.trilha);
  // O tema ja aparece na ficha: nao volta como palavra-chave.
  const palavrasChave = material.palavrasChave.filter(
    (palavra) => palavra.toLowerCase() !== material.tema.toLowerCase(),
  );
  const sugestao = materiaisDaTrilha(material.trilha).find(
    (outro) => outro.slug !== material.slug,
  );

  return (
    <>
      <CabecalhoPagina
        estreito
        olho={`${r.titulo}: ${trilha}`}
        titulo={material.titulo}
      />

      <div className="secao secao--curta">
        <div className="container-estreito pilha--g">
          <div
            className="cartao cartao--marcado"
            style={{ '--marca': marcaDaTrilha(material.trilha) } as CSSProperties}
          >
            <dl className="definicoes definicoes--2">
              <div>
                <dt>{r.autoria}</dt>
                <dd>{material.autoria.join(', ')}</dd>
              </div>
              <div>
                <dt>{r.organizacao}</dt>
                <dd>{material.organizacao}</dd>
              </div>
              <div>
                <dt>{r.tema}</dt>
                <dd>{material.tema}</dd>
              </div>
              <div>
                <dt>{r.formato}</dt>
                <dd>{material.formato}</dd>
              </div>
              <div>
                <dt>{r.atualizadoEm}</dt>
                <dd>{data(material.atualizadoEm)}</dd>
              </div>
              {material.tempoLeitura ? (
                <div>
                  <dt>{r.tempoLeitura}</dt>
                  <dd>{material.tempoLeitura}</dd>
                </div>
              ) : null}
            </dl>

            {palavrasChave.length > 0 ? (
              <div className="pilha--p">
                <p className="rotulo">{r.palavrasChave}</p>
                <Chips itens={palavrasChave} vazado />
              </div>
            ) : null}
          </div>

          <p className="texto-guia" style={{ margin: 0 }}>
            {material.resumo}
          </p>

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

          {material.arquivos.length > 0 ? (
            <div className="cartao cartao--compacto">
              <p className="rotulo rotulo--forte" style={{ margin: 0 }}>
                {r.arquivosTitulo}
              </p>
              <div className="linha">
                {material.arquivos.map((arquivo) => (
                  <a
                    key={arquivo.arquivo}
                    href={arquivoPublico(arquivo.arquivo)}
                    className="btn btn--secundario btn--pequeno"
                  >
                    {`${arquivo.idioma} (${r.arquivoTipo})`}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {material.licenca ? (
            <div
              className="cartao cartao--compacto"
              style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}
            >
              <Selo status="licenca" rotulo={material.licenca} />
              <p className="texto-pequeno texto-secundario" style={{ margin: 0 }}>
                {r.licencaNota}
              </p>
            </div>
          ) : null}

          <div className="linha">
            <Botao
              href={`/biblioteca/materiais#${material.trilha}`}
              variante="discreto"
              tamanho="pequeno"
            >
              {r.voltarTrilha}: {trilha}
            </Botao>
          </div>
        </div>
      </div>

      {sugestao ? (
        <div className="secao secao--curta">
          <div className="container-estreito pilha">
            <p className="olho" style={{ margin: 0 }}>
              {r.leiaTambem}
            </p>
            <CartaoMaterial material={sugestao} />
          </div>
        </div>
      ) : null}
    </>
  );
}
