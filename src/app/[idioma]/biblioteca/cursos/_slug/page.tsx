import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { Selo } from '@/components/Selo';
import { IDIOMAS, ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo, cursoPorSlug } from '@/lib/data';
import { data } from '@/lib/format';
import { rota } from '@/lib/rotas';

import { Inscricao } from './_Inscricao';

/**
 * So o curso com turma aberta tem pagina, em cada idioma que o publicou. Os
 * demais ficam no catalogo.
 */
export function generateStaticParams() {
  return IDIOMAS.flatMap((idioma) =>
    conteudo(idioma)
      .cursos.filter((curso) => curso.status === 'aberto')
      .map((curso) => ({ idioma, slug: curso.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string; slug: string }>;
}): Promise<Metadata> {
  const { idioma, slug } = await params;
  if (!ehIdioma(idioma)) return {};

  const c = textos(idioma).aprendizado.cursos;
  const curso = cursoPorSlug(idioma, slug);
  return {
    title: curso?.titulo ?? c.titulo,
    description: curso?.resumo ?? c.descricao,
  };
}

export default async function CursoPage({
  params,
}: {
  params: Promise<{ idioma: string; slug: string }>;
}) {
  const { idioma, slug } = await params;
  if (!ehIdioma(idioma)) notFound();

  const curso = cursoPorSlug(idioma, slug);
  if (!curso || curso.status !== 'aberto') notFound();

  const t = textos(idioma);

  return (
    <>
      <CabecalhoPagina
        olho={t.aprendizado.cursos.olho}
        titulo={curso.titulo}
        descricao={curso.resumo}
        acoes={<Selo idioma={idioma} status={curso.status} />}
      />

      <div className="secao">
        <div className="container grade--lateral">
          <div className="pilha--g">
            <div className="prosa">
              {curso.descricao.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
            </div>

            <section className="pilha">
              <h2 style={{ margin: 0 }}>{t.aprendizado.cursos.paraQuem}</h2>
              <ul className="pilha--p" style={{ margin: 0, paddingLeft: 20 }}>
                {curso.paraQuem.map((item) => (
                  <li key={item} className="texto-secundario">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pilha">
              <div className="linha linha--fim">
                <h2 style={{ margin: 0 }}>{t.aprendizado.cursos.modulosTitulo}</h2>
                <span className="texto-mini">
                  {curso.modulos.length} {t.aprendizado.cursos.modulos.toLowerCase()}
                </span>
              </div>
              <ol className="pilha" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {curso.modulos.map((modulo) => (
                  <li key={modulo.numero} className="cartao cartao--compacto">
                    <div
                      className="linha"
                      style={{ alignItems: 'flex-start', gap: 14, flexWrap: 'nowrap' }}
                    >
                      <span className="passo__numero">{modulo.numero}</span>
                      <div className="pilha--p">
                        <h3 className="cartao__titulo">{modulo.titulo}</h3>
                        <p className="cartao__texto">{modulo.descricao}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="lateral">
            <div className="cartao">
              <dl className="definicoes">
                <div>
                  <dt>{t.aprendizado.cursos.duracao}</dt>
                  <dd>{curso.duracao}</dd>
                </div>
                <div>
                  <dt>{t.aprendizado.cursos.formato}</dt>
                  <dd>{curso.formato}</dd>
                </div>
                <div>
                  <dt>{t.aprendizado.cursos.proximaTurma}</dt>
                  <dd>{data(curso.proximaTurma)}</dd>
                </div>
              </dl>
            </div>

            <div
              className="cartao cartao--marcado"
              style={{ '--marca': 'var(--menta)' } as CSSProperties}
            >
              <p className="olho" style={{ margin: 0 }}>
                {t.aprendizado.cursos.inscricaoTitulo}
              </p>
              <Inscricao idioma={idioma} slug={curso.slug} />
            </div>

            <div className="linha">
              <Botao
                href={rota(idioma, 'biblioteca/cursos')}
                variante="discreto"
                tamanho="pequeno"
              >
                {t.aprendizado.cursos.voltarCatalogo}
              </Botao>
            </div>
          </aside>
        </div>
      </div>

    </>
  );
}
