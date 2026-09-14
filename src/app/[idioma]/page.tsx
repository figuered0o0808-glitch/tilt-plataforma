import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { CapaMaterial } from '@/components/CapaMaterial';
import { Carrossel } from '@/components/Carrossel';
import { Enxame, Ponte } from '@/components/Enxame';
import { Marcador } from '@/components/Marcador';
import { Vagas } from '@/components/Vagas';
import { Organizacao } from '@/components/Organizacao';
import { PROGRAM_TAGLINE } from '@/config/program';
import { ehIdioma, type Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { moeda } from '@/lib/format';
import { rota } from '@/lib/rotas';
import type { Article, Call } from '@/lib/types';
import { textoDoApoio, textoDoValorTotal } from '@/lib/apoio';

import { Entrada } from './_Entrada';
import { ordenar } from './biblioteca/materiais/_regras';

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
 *
 * A coluna rosa e a amarela sao carrosseis: uma chamada ou um material por
 * vez, e passa-se para o lado, sozinho ou pela seta. Cabe mais de um no
 * quadrado, mas nao ao mesmo tempo: a coluna e estreita, e o que se ganha em
 * quantidade se perde em leitura.
 */

/** Quantos materiais a coluna amarela percorre antes de mandar para a Biblioteca. */
const RECENTES = 6;

/** Quanto tempo cada item fica antes de a coluna passar sozinha: da para ler o titulo e as linhas. */
const INTERVALO = 7000;

/* -------------------------------------------------------------------------- */
/* Coluna rosa: as chamadas abertas                                            */
/* -------------------------------------------------------------------------- */

function SlideChamada({ idioma, chamada }: { idioma: Idioma; chamada: Call }) {
  const tc = textos(idioma).home.coluna;
  return (
    <div className="carrossel__conteudo">
      <h2 className="coluna__titulo">{chamada.titulo}</h2>

      <div className="coluna__linhas">
        <div className="coluna__linha">
          <span className="rotulo">{tc.apoio}</span>
          <span>{textoDoApoio(idioma, chamada)}</span>
        </div>
        {chamada.organizacao ? (
          <div className="coluna__linha">
            <span className="rotulo">{tc.proponente}</span>
            <Organizacao nome={chamada.organizacao} logo={chamada.logoOrganizacao} />
          </div>
        ) : null}
      </div>

      <Vagas idioma={idioma} chamada={chamada} />

      <div className="coluna__pe">
        <Botao href={rota(idioma, `oportunidades/${chamada.slug}`)} largo>
          {tc.verChamada}
        </Botao>
      </div>
    </div>
  );
}

function ColunaChamada({ idioma, chamadas }: { idioma: Idioma; chamadas: Call[] }) {
  const t = textos(idioma);
  const tc = t.home.coluna;
  const cabeca = (
    <>
      <Marcador arranjo={1} />
      <span className="rotulo">{t.home.chamadasTitulo}</span>
    </>
  );

  if (chamadas.length === 0) {
    return (
      <div className="coluna coluna--rosa">
        <div className="coluna__cabeca">{cabeca}</div>
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

  return (
    <div className="coluna coluna--rosa">
      <Carrossel
        cabeca={cabeca}
        rotulo={t.home.chamadasTitulo}
        anterior={tc.anterior}
        proximo={tc.proximo}
        posicao={tc.posicao}
        automatico={INTERVALO}
        pausar={tc.pausar}
        continuar={tc.continuar}
        itens={chamadas.map((chamada) => (
          <SlideChamada key={chamada.slug} idioma={idioma} chamada={chamada} />
        ))}
      />
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
       * Uma pilula por campo do cadastro. Nao sao o formulario: sao atalhos
       * para ele, e por isso sao links. Duplicar o formulario aqui seria
       * manter dois.
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

function SlideMaterial({ idioma, material }: { idioma: Idioma; material: Article }) {
  const destino = rota(idioma, `biblioteca/materiais/${material.slug}`);
  return (
    <div className="carrossel__conteudo">
      <div style={{ display: 'grid', gridTemplateColumns: '112px minmax(0, 1fr)', gap: 16, alignItems: 'start' }}>
        <Link
          href={destino}
          style={{ display: 'block', aspectRatio: '1414 / 2000', overflow: 'hidden' }}
          aria-hidden="true"
          tabIndex={-1}
        >
          <CapaMaterial capa={material.capa} titulo={material.titulo} cor="var(--amarelo)" />
        </Link>
        <div>
          <h2 className="coluna__titulo" style={{ fontSize: 'var(--titulo-p)', marginBottom: 8 }}>
            <Link href={destino}>{material.titulo}</Link>
          </h2>
          <p className="texto-pequeno" style={{ margin: 0 }}>
            {material.autoria.join(', ')}
          </p>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 'var(--texto-m)', lineHeight: 1.45 }}>{material.resumo}</p>
    </div>
  );
}

function ColunaBiblioteca({ idioma, materiais }: { idioma: Idioma; materiais: Article[] }) {
  const t = textos(idioma);
  const tc = t.home.coluna;
  const cabeca = (
    <>
      <Marcador arranjo={3} />
      <span className="rotulo">{t.home.recursosTitulo}</span>
    </>
  );

  return (
    <div className="coluna coluna--amarelo">
      {materiais.length > 0 ? (
        <Carrossel
          cabeca={cabeca}
          rotulo={t.home.recursosTitulo}
          anterior={tc.anterior}
          proximo={tc.proximo}
          posicao={tc.posicao}
          automatico={INTERVALO}
          pausar={tc.pausar}
          continuar={tc.continuar}
          itens={materiais.map((material) => (
            <SlideMaterial key={material.slug} idioma={idioma} material={material} />
          ))}
        />
      ) : (
        <>
          <div className="coluna__cabeca">{cabeca}</div>
          <p className="texto-guia" style={{ margin: 0 }}>
            {tc.semMaterial}
          </p>
        </>
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

  /* A coluna rosa passa pelas chamadas abertas; a amarela, pelos materiais, do mais novo ao mais antigo. */
  const chamadas = editais.filter((item) => item.status === 'aberta');
  const recentes = ordenar(materiais, 'atualizacao').slice(0, RECENTES);
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
              {/* So o titulo. O cliente vetou qualquer frase de apoio: ela reduzia o projeto. */}
              <h1 className="hero__frase" style={{ maxWidth: '18ch', margin: 0 }}>
                {t.home.frase}
              </h1>
            </div>
            <div className="hero__acoes">
              <Entrada idioma={idioma} temConteudo={temConteudo} />
              <Ponte rotulo={t.home.ponte} />
            </div>
          </div>
        </div>
      </section>

      <section className="colunas">
        <ColunaChamada idioma={idioma} chamadas={chamadas} />
        <ColunaCadastro idioma={idioma} />
        <ColunaBiblioteca idioma={idioma} materiais={recentes} />
      </section>
    </>
  );
}
