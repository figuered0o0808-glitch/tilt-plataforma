import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { CapaMaterial } from '@/components/CapaMaterial';
import { Enxame, Ponte } from '@/components/Enxame';
import { Marcador } from '@/components/Marcador';
import { PROGRAM_TAGLINE } from '@/config/program';
import { ehIdioma, type Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { moeda, numero } from '@/lib/format';
import { rota } from '@/lib/rotas';
import type { Article, Call } from '@/lib/types';

import { Entrada } from './_Entrada';

/**
 * A home: o enxame e a porta, as colunas sao a casa.
 *
 * Em cima, sobre branco, os 21 pontos do logotipo entram espalhados e assentam
 * na marca; a frase do programa vem depois. Embaixo, tres colunas de cor da
 * borda a borda, uma por assunto: a chamada aberta, o cadastro, a biblioteca.
 * O ponto faz tres trabalhos na mesma pagina: forma a marca, marca cada coluna
 * e mede as vagas da chamada.
 *
 * Tres pontos de cor entre as duas metades sao a ponte: surgem depois que a
 * marca assentou, cada um na cor da coluna que vem embaixo.
 */

/** Modelo curto com chaves entre chaves: "{n} de {max}". */
function preencher(modelo: string, valores: Record<string, string>): string {
  return modelo.replace(/\{(\w+)\}/g, (_, chave: string) => valores[chave] ?? '');
}

/* -------------------------------------------------------------------------- */
/* Coluna rosa: a chamada aberta                                               */
/* -------------------------------------------------------------------------- */

function ColunaChamada({ idioma, chamada }: { idioma: Idioma; chamada: Call | null }) {
  const t = textos(idioma);
  const tc = t.home.coluna;

  if (!chamada) {
    return (
      <div className="coluna coluna--rosa">
        <div className="coluna__cabeca">
          <Marcador arranjo={1} />
          <span className="rotulo">{t.home.chamadasTitulo}</span>
        </div>
        <p className="texto-guia" style={{ margin: 0 }}>
          {tc.semChamada}
        </p>
        <div className="coluna__pe">
          <Botao href={rota(idioma, 'oportunidades')} largo>
            {tc.verOportunidades}
          </Botao>
        </div>
      </div>
    );
  }

  /*
   * Os pontos: um por vaga ate o maximo declarado. Cheio e projeto ja
   * selecionado (so existe depois do resultado); vazado e vaga aberta.
   */
  const max = chamada.vagas?.max ?? 0;
  const selecionados = chamada.resultado?.apoiados.length ?? 0;
  const abertas = Math.max(max - selecionados, 0);
  const legenda =
    selecionados > 0
      ? preencher(tc.vagasSelecionados, {
          n: numero(selecionados, idioma),
          r: numero(abertas, idioma),
        })
      : preencher(tc.vagasFaixa, {
          min: numero(chamada.vagas?.min ?? 0, idioma),
          max: numero(max, idioma),
        });

  return (
    <div className="coluna coluna--rosa">
      <div className="coluna__cabeca">
        <Marcador arranjo={1} />
        <span className="rotulo">{t.home.chamadasTitulo}</span>
      </div>

      <h2 className="coluna__titulo">{chamada.titulo}</h2>

      <div className="coluna__linhas">
        <div className="coluna__linha">
          <span className="rotulo">{tc.apoio}</span>
          <span>
            {moeda(chamada.faixaApoio.min, idioma)} {t.editais.faixaSeparador}{' '}
            {moeda(chamada.faixaApoio.max, idioma)}
          </span>
        </div>
        {chamada.organizacao ? (
          <div className="coluna__linha">
            <span className="rotulo">{tc.proponente}</span>
            <span>{chamada.organizacao}</span>
          </div>
        ) : null}
      </div>

      {max > 0 ? (
        <div>
          <p className="rotulo" style={{ margin: '0 0 10px' }}>
            {tc.vagas}
          </p>
          {/* A fileira e desenho; o numero, para quem nao ve, esta na legenda. */}
          <div className="pontos" aria-hidden="true">
            {Array.from({ length: max }, (_, indice) => (
              <span
                key={indice}
                className={indice < selecionados ? 'pontos__ponto' : 'pontos__ponto pontos__ponto--vazado'}
              />
            ))}
          </div>
          <p className="texto-pequeno" style={{ margin: '9px 0 0' }}>
            {legenda}
          </p>
        </div>
      ) : null}

      <div className="coluna__pe">
        <Botao href={rota(idioma, `oportunidades/${chamada.slug}`)} largo>
          {tc.verChamada}
        </Botao>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Coluna menta: o cadastro                                                    */
/* -------------------------------------------------------------------------- */

function ColunaCadastro({ idioma }: { idioma: Idioma }) {
  const tc = textos(idioma).home.coluna;
  const destino = rota(idioma, 'cadastro');

  return (
    <div className="coluna coluna--menta">
      <div className="coluna__cabeca">
        <Marcador arranjo={2} />
        <span className="rotulo">{tc.cadastroOlho}</span>
      </div>

      <h2 className="coluna__titulo">{tc.cadastroTitulo}</h2>
      <p style={{ margin: 0, fontSize: 'var(--texto-m)', lineHeight: 1.45 }}>{tc.cadastroTexto}</p>

      {/*
       * Quatro pilulas com os nomes dos campos. Nao sao o formulario: sao
       * atalhos para ele, e por isso sao links. Duplicar o formulario aqui
       * seria manter dois.
       */}
      <div className="pilha--p" style={{ gap: 14 }}>
        {tc.cadastroCampos.map((campo) => (
          <Link key={campo} href={destino} className="campo-atalho">
            {campo}
          </Link>
        ))}
      </div>

      <div className="coluna__pe">
        <Botao href={destino} largo>
          {tc.cadastroAcao}
        </Botao>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Coluna amarela: a biblioteca                                                */
/* -------------------------------------------------------------------------- */

function ColunaBiblioteca({ idioma, material }: { idioma: Idioma; material: Article | null }) {
  const t = textos(idioma);
  const tc = t.home.coluna;

  return (
    <div className="coluna coluna--amarelo">
      <div className="coluna__cabeca">
        <Marcador arranjo={3} />
        <span className="rotulo">{t.home.recursosTitulo}</span>
      </div>

      {material ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '112px minmax(0, 1fr)', gap: 16, alignItems: 'start' }}>
            <Link
              href={rota(idioma, `biblioteca/materiais/${material.slug}`)}
              style={{ display: 'block', aspectRatio: '1414 / 2000', overflow: 'hidden' }}
              aria-hidden="true"
              tabIndex={-1}
            >
              <CapaMaterial capa={material.capa} titulo={material.titulo} cor="var(--amarelo)" />
            </Link>
            <div>
              <h2 className="coluna__titulo" style={{ fontSize: 'var(--titulo-p)', marginBottom: 8 }}>
                <Link href={rota(idioma, `biblioteca/materiais/${material.slug}`)}>{material.titulo}</Link>
              </h2>
              <p className="texto-pequeno" style={{ margin: 0 }}>
                {material.autoria.join(', ')}
              </p>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--texto-m)', lineHeight: 1.45 }}>{material.resumo}</p>
        </>
      ) : (
        <p className="texto-guia" style={{ margin: 0 }}>
          {tc.semMaterial}
        </p>
      )}

      <div className="coluna__pe">
        <Link href={rota(idioma, 'biblioteca')} className="link-sublinhado">
          {t.home.recursosAcao}
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pagina                                                                      */
/* -------------------------------------------------------------------------- */

export default async function Home({ params }: { params: Promise<{ idioma: string }> }) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  const t = textos(idioma);
  const { editais, cursos, materiais } = conteudo(idioma);

  /* A coluna mostra uma chamada: a aberta mais recente, ou nenhuma. */
  const chamada = editais.find((item) => item.status === 'aberta') ?? null;
  const material = materiais[0] ?? null;
  const temConteudo = editais.length > 0 || cursos.length > 0 || materiais.length > 0;

  return (
    <>
      <section className="hero hero--enxame" data-hero>
        <div className="container">
          <div className="hero__marca">
            <Enxame largura={560} />
            <p className="olho" style={{ margin: 0 }}>
              {PROGRAM_TAGLINE}
            </p>
          </div>

          <div className="hero__corpo">
            <div>
              <h1 className="hero__frase" style={{ maxWidth: '18ch' }}>
                {t.home.frase}
              </h1>
              <p className="texto-guia" style={{ margin: 0, maxWidth: '46ch' }}>
                {t.home.apresentacao}
              </p>
            </div>
            <div className="hero__acoes">
              <Entrada idioma={idioma} temConteudo={temConteudo} />
              <Ponte rotulo={t.home.ponte} />
            </div>
          </div>
        </div>
      </section>

      <section className="colunas">
        <ColunaChamada idioma={idioma} chamada={chamada} />
        <ColunaCadastro idioma={idioma} />
        <ColunaBiblioteca idioma={idioma} material={material} />
      </section>
    </>
  );
}
