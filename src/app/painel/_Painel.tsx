'use client';

/**
 * Painel unico da plataforma: a area de trabalho de quem tem cadastro, com
 * as candidaturas enviadas e os cursos.
 *
 * Tres estados, nesta ordem:
 *
 * 1. Cadastro fechado (`cadastroAberto()` falso, que e o estado de hoje):
 *    nao existe cadastro possivel nem dado para mostrar. A pagina fica em
 *    duas linhas e dois links. Sem tabela, sem indicador.
 * 2. Cadastro aberto e visitante sem cadastro: convite.
 * 3. Cadastro aberto e pessoa cadastrada: o painel propriamente dito, que
 *    volta inteiro assim que houver conteudo publicado.
 *
 * O painel nao esta na navegacao e so e alcancado por link direto, o que
 * basta enquanto ele nao tem o que mostrar.
 */

import { useMemo } from 'react';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { t } from '@/i18n/strings';
import { useApp } from '@/state/AppState';

import { cadastroAberto } from '../cadastro/_Cadastro';
import { Candidaturas } from './_Candidaturas';
import { Cursos, cursosDoPainel } from './_Cursos';
import { ResumoPainel, SecaoPainel } from './_PainelUI';

const s = t.paineis;

/** Estado de hoje: o painel abre junto com o cadastro. */
function PainelFechado() {
  const f = s.fechado;

  return (
    <>
      <CabecalhoPagina estreito olho={s.olho} titulo={f.titulo} descricao={f.descricao} />

      <div className="secao secao--curta">
        <div className="container-estreito">
          <div className="linha">
            <Botao href="/oportunidades" variante="secundario">
              {s.verOportunidades}
            </Botao>
            <Botao href="/biblioteca" variante="secundario">
              {s.verBiblioteca}
            </Botao>
          </div>
        </div>
      </div>
    </>
  );
}

/** Cadastro aberto, visitante ainda sem cadastro. */
function Convite() {
  return (
    <section className="secao">
      <div className="container-estreito">
        <div
          className="cartao"
          style={{ alignItems: 'center', textAlign: 'center', padding: '56px 30px', gap: 18 }}
        >
          <p className="olho" style={{ margin: 0 }}>
            {s.olho}
          </p>
          <h1 style={{ margin: 0, maxWidth: '20ch' }}>{s.convite.titulo}</h1>
          <div className="linha" style={{ justifyContent: 'center', marginTop: 6 }}>
            <Botao href="/cadastro">{s.convite.acao}</Botao>
            <Botao href="/oportunidades" variante="secundario">
              {s.verOportunidades}
            </Botao>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Painel() {
  const { candidaturas, cadastrado, cursosInscritos, hidratado, nome } = useApp();

  const linhasCursos = useMemo(() => cursosDoPainel(cursosInscritos), [cursosInscritos]);

  const emAvaliacao = candidaturas.filter(
    (candidatura) => candidatura.status === 'em-avaliacao' || candidatura.status === 'enviada',
  ).length;
  const aprovadas = candidaturas.filter((candidatura) => candidatura.status === 'aprovada').length;

  // Sem chamada aberta e sem curso com turma aberta nao ha cadastro possivel,
  // e sem cadastro nao ha o que acompanhar.
  if (!cadastroAberto()) return <PainelFechado />;

  // Enquanto o estado nao foi lido do navegador, nada e desenhado: assim a
  // pagina nao pisca entre o convite e o painel.
  if (!hidratado) return <div className="secao" style={{ minHeight: '60vh' }} />;

  if (!cadastrado) return <Convite />;

  // A faixa de indicadores so aparece quando ha algo para contar: quatro
  // zeros lado a lado nao informam nada.
  const temRegistro = candidaturas.length > 0 || linhasCursos.length > 0;

  return (
    <>
      <CabecalhoPagina
        olho={s.olho}
        titulo={nome || s.titulo}
        acoes={
          <Botao href="/oportunidades" variante="secundario">
            {s.verOportunidades}
          </Botao>
        }
      />

      {temRegistro ? (
        <div className="secao secao--curta">
          <div className="container">
            <ResumoPainel
              itens={[
                { rotulo: s.resumo.enviadas, valor: String(candidaturas.length) },
                { rotulo: s.resumo.emAvaliacao, valor: String(emAvaliacao) },
                { rotulo: s.resumo.aprovadas, valor: String(aprovadas) },
                { rotulo: s.resumo.cursos, valor: String(linhasCursos.length) },
              ]}
            />
          </div>
        </div>
      ) : null}

      <SecaoPainel id="candidaturas" titulo={s.candidaturasTitulo}>
        <Candidaturas candidaturas={candidaturas} />
      </SecaoPainel>

      <SecaoPainel
        id="cursos"
        titulo={s.cursosTitulo}
        fundo
        acoes={
          linhasCursos.length > 0 ? (
            <Botao href="/biblioteca" variante="secundario" tamanho="pequeno">
              {s.verBiblioteca}
            </Botao>
          ) : null
        }
      >
        <Cursos linhas={linhasCursos} />
      </SecaoPainel>
    </>
  );
}
