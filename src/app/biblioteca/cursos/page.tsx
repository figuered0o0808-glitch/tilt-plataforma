import type { Metadata } from 'next';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { EstadoVazio } from '@/components/EstadoVazio';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { cursos } from '@/lib/data';
import { data } from '@/lib/format';

export const metadata: Metadata = {
  title: t.aprendizado.cursos.titulo,
  description: t.aprendizado.cursos.descricao,
};

/**
 * Catalogo de cursos. Sem turma publicada, a pagina entrega o estado vazio e,
 * logo abaixo, as condicoes que ja valem para a primeira turma: quem chega
 * antes da abertura sai sabendo como a inscricao funciona.
 */
export default function CursosPage() {
  return (
    <>
      <CabecalhoPagina
        olho={t.aprendizado.cursos.olho}
        titulo={t.aprendizado.cursos.titulo}
        descricao={t.aprendizado.cursos.descricao}
      />

      <div className="secao">
        <div className="container pilha--g">
          {cursos.length === 0 ? (
            <EstadoVazio
              titulo={t.aprendizado.cursos.vazioTitulo}
              descricao={t.aprendizado.cursos.vazioDescricao}
              desenho="pasta"
              acao={
                <Botao href="/" variante="secundario" tamanho="pequeno">
                  {t.aprendizado.cursos.vazioAcao}
                </Botao>
              }
            />
          ) : (
            <div className="grade--2">
              {cursos.map((curso) => (
                <article key={curso.slug} className="cartao">
                  <div className="linha linha--fim">
                    <Selo status={curso.status} />
                    <span className="rotulo">{curso.duracao}</span>
                  </div>
                  <h2 className="cartao__titulo">{curso.titulo}</h2>
                  <p className="cartao__texto">{curso.resumo}</p>
                  <div className="cartao__rodape">
                    <span>
                      {t.aprendizado.cursos.proximaTurma}: {data(curso.proximaTurma)}
                    </span>
                    <Botao
                      href={`/biblioteca/cursos/${curso.slug}`}
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

      <div className="secao secao--curta secao--amarelo">
        <div className="container pilha">
          <h2 style={{ margin: 0 }}>{t.aprendizado.cursos.condicoesTitulo}</h2>
          <div className="grade--3">
            {t.aprendizado.cursos.condicoes.map((condicao) => (
              <div key={condicao.rotulo} className="pilha--p">
                <p className="olho" style={{ margin: 0 }}>
                  {condicao.rotulo}
                </p>
                <p className="cartao__texto">{condicao.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
