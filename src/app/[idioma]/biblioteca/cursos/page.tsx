import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { EstadoVazio } from '@/components/EstadoVazio';
import { Selo } from '@/components/Selo';
import { ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { data } from '@/lib/format';
import { rota } from '@/lib/rotas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) return {};
  const c = textos(idioma).aprendizado.cursos;
  return { title: c.titulo, description: c.descricao };
}

/**
 * Catalogo de cursos. Sem turma publicada, restam as condicoes que ja valem
 * para a primeira: quem chega antes da abertura sai sabendo como e a inscricao.
 */
export default async function CursosPage({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  const t = textos(idioma);
  const { cursos } = conteudo(idioma);

  return (
    <>
      <CabecalhoPagina
        olho={t.aprendizado.cursos.olho}
        titulo={t.aprendizado.cursos.titulo}
        descricao={t.aprendizado.cursos.descricao}
      />

      <div className="secao">
        <div className="container">
          {cursos.length === 0 ? (
            <EstadoVazio
              titulo={t.aprendizado.cursos.vazioTitulo}
              desenho="pasta"
              acao={
                <Botao href={rota(idioma)} variante="secundario" tamanho="pequeno">
                  {t.aprendizado.cursos.vazioAcao}
                </Botao>
              }
            />
          ) : (
            <div className="grade--2">
              {cursos.map((curso) => (
                <article key={curso.slug} className="cartao">
                  <div className="linha linha--fim">
                    <Selo idioma={idioma} status={curso.status} />
                    <span className="rotulo">{curso.duracao}</span>
                  </div>
                  <h2 className="cartao__titulo">{curso.titulo}</h2>
                  <p className="cartao__texto">{curso.resumo}</p>
                  <div className="cartao__rodape">
                    <span>
                      {t.aprendizado.cursos.proximaTurma}: {data(curso.proximaTurma, idioma)}
                    </span>
                    <Botao
                      href={rota(idioma, `biblioteca/cursos/${curso.slug}`)}
                      variante="discreto"
                      tamanho="pequeno"
                    >
                      {t.comum.acoes.verCurso}
                    </Botao>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="secao secao--preto">
        <div className="container pilha">
          <h2 style={{ margin: 0 }}>{t.aprendizado.cursos.condicoesTitulo}</h2>
          <div>
            {t.aprendizado.cursos.condicoes.map((condicao) => (
              <div key={condicao.rotulo} className="registro">
                <p className="registro__rotulo">{condicao.rotulo}</p>
                <p style={{ margin: 0 }}>{condicao.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
