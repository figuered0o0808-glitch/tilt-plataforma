import type { CSSProperties } from 'react';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { Chip, Chips } from '@/components/Chip';
import { Ilustracao } from '@/components/Ilustracao';
import { LogoTilt } from '@/components/LogoTilt';
import { Selo } from '@/components/Selo';
import { PROGRAM_TAGLINE } from '@/config/program';
import { ehIdioma, type Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { dataCurta, moeda, numero } from '@/lib/format';
import { rota } from '@/lib/rotas';
import type { Call } from '@/lib/types';

import { Entrada } from './_Entrada';

/** Rotulo do prazo, coerente com a situacao da chamada. */
function prazoRotulo(idioma: Idioma, chamada: Call): string {
  const t = textos(idioma);
  return chamada.status === 'aberta' ? t.comum.rotulos.inscricoesAte : t.comum.rotulos.prazo;
}

function CartaoChamada({ idioma, chamada }: { idioma: Idioma; chamada: Call }) {
  const t = textos(idioma);

  return (
    <Link href={rota(idioma, `oportunidades/${chamada.slug}`)} className="cartao">
      <div className="linha" style={{ gap: 8 }}>
        <Selo idioma={idioma} status={chamada.status} />
        <Chip vazado>{t.comum.tiposEdital[chamada.tipo]}</Chip>
      </div>

      <div>
        <h3 className="cartao__titulo">{chamada.titulo}</h3>
        {chamada.proponente ? (
          <p className="texto-mini" style={{ margin: '6px 0 0' }}>
            {`${t.home.rotuloProponente}: ${chamada.proponente}`}
          </p>
        ) : null}
      </div>

      <p className="cartao__texto">{chamada.resumo}</p>

      <dl className="definicoes" style={{ gap: 12 }}>
        <div>
          <dt>{t.comum.rotulos.apoio}</dt>
          <dd>{`${moeda(chamada.faixaApoio.min)} a ${moeda(chamada.faixaApoio.max)}`}</dd>
        </div>
        <div>
          <dt>{prazoRotulo(idioma, chamada)}</dt>
          <dd>{chamada.inscricoesAte ? dataCurta(chamada.inscricoesAte) : t.home.prazoADefinir}</dd>
        </div>
      </dl>

      <div className="cartao__rodape">
        <span className="link-seta">{t.comum.acoes.verEdital}</span>
      </div>
    </Link>
  );
}

/** Item da faixa de numeros. So entra na faixa quando ha o que contar. */
type Indicador = { rotulo: string; valor: string };

/** Classe de grade coerente com a quantidade de indicadores que sobrou. */
function gradeDe(quantidade: number): string {
  if (quantidade >= 4) return 'grade--4';
  if (quantidade === 3) return 'grade--3';
  if (quantidade === 2) return 'grade--2';
  return 'grade';
}

export default async function Home({ params }: { params: Promise<{ idioma: string }> }) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  const t = textos(idioma);
  const { editais, cursos, materiais } = conteudo(idioma);

  const abertas = editais.filter((chamada) => chamada.status === 'aberta');
  const emCartaz = (abertas.length > 0 ? abertas : editais).slice(0, 3);
  const totalAberto = abertas.reduce((soma, chamada) => soma + chamada.valorTotal, 0);
  const chamadaDestaque = abertas[0] ?? editais[0];
  const chamadaComResultado = editais.find((chamada) => chamada.resultado !== null);

  const curso = cursos.find((item) => item.status === 'aberto') ?? cursos[0];
  const formatos = Array.from(new Set(materiais.map((material) => material.formato)));
  const licencas = Array.from(new Set(materiais.map((material) => material.licenca)));

  // Os dois estados da home saem daqui: enquanto nada foi publicado, a pagina
  // explica o programa e as duas areas; quando entra conteudo, os blocos de
  // numeros, de chamadas e de recursos voltam sozinhos.
  const temChamadas = editais.length > 0;
  const temCursos = cursos.length > 0;
  const temMateriais = materiais.length > 0;
  const temRecursos = temCursos || temMateriais;
  const temConteudo = temChamadas || temRecursos;
  const doisCartoesRecursos = Boolean(curso) && temMateriais;

  const indicadores: (Indicador | null)[] = [
    totalAberto > 0 ? { rotulo: t.home.numeros.recursos, valor: moeda(totalAberto) } : null,
    abertas.length > 0 ? { rotulo: t.home.numeros.chamadas, valor: numero(abertas.length) } : null,
    temCursos ? { rotulo: t.home.numeros.cursos, valor: numero(cursos.length) } : null,
    temMateriais ? { rotulo: t.home.numeros.materiais, valor: numero(materiais.length) } : null,
  ];
  const numeros = indicadores.filter((item): item is Indicador => item !== null);

  return (
    <>
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          className="malha"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            color: 'rgba(0, 0, 0, 0.16)',
            maskImage: 'linear-gradient(to bottom, #000 0%, transparent 78%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 78%)',
          }}
        />
        <div className="container" style={{ position: 'relative' }}>
          <p className="olho">{PROGRAM_TAGLINE}</p>
          <h1 className="hero__frase" style={{ maxWidth: '18ch' }}>
            {t.home.frase}
          </h1>
          <p className="texto-guia">{t.home.apresentacao}</p>
          <Entrada idioma={idioma} temConteudo={temConteudo} />
        </div>
      </section>

      {temConteudo ? null : (
        <section className="secao" id="areas">
          <div className="container">
            <div className="secao__marca">
              <span className="secao__indice">02</span>
              <h2>{t.home.areasTitulo}</h2>
            </div>

            <div className="grade--2">
              {t.home.areas.map((area, indice) => (
                <Link
                  key={area.href}
                  href={rota(idioma, area.href)}
                  className="cartao cartao--marcado"
                  style={
                    { '--marca': indice === 0 ? 'var(--menta)' : 'var(--azul)' } as CSSProperties
                  }
                >
                  <h3 className="cartao__titulo">{area.titulo}</h3>
                  <p className="cartao__texto">{area.texto}</p>
                  <div className="cartao__rodape">
                    <span className="link-seta">{area.acao}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {numeros.length > 0 ? (
        <section className="secao secao--curta secao--branco">
          <div className="container">
            <dl className={`${gradeDe(numeros.length)} definicoes`} style={{ gap: 24, margin: 0 }}>
              {numeros.map((item) => (
                <div key={item.rotulo}>
                  <dt>{item.rotulo}</dt>
                  <dd>
                    <span className="numero-grande">{item.valor}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {temChamadas ? (
        <section className="secao">
          <div className="container">
            <div
              className="linha linha--fim"
              style={{ alignItems: 'flex-end', gap: 20, marginBottom: 28 }}
            >
              <div className="secao__marca" style={{ flex: 1, marginBottom: 0, borderBottom: 0 }}>
                <span className="secao__indice">01</span>
                <h2>{abertas.length > 0 ? t.home.chamadasTitulo : t.home.chamadasTituloSemAbertas}</h2>
              </div>
              <Botao href={rota(idioma, 'oportunidades')} variante="secundario" tamanho="pequeno">
                {t.home.chamadasAcao}
              </Botao>
            </div>

            <div className="grade--3">
              {emCartaz.map((chamada) => (
                <CartaoChamada key={chamada.slug} idioma={idioma} chamada={chamada} />
              ))}
            </div>
          </div>
        </section>
      ) : null}



      {temRecursos ? (
        <section className="secao secao--branco">
          <div className="container">
            <div
              className="linha linha--fim"
              style={{ alignItems: 'flex-end', gap: 20, marginBottom: 28 }}
            >
              <div style={{ maxWidth: '42rem' }}>
                <h2 style={{ marginBottom: 10 }}>{t.home.recursosTitulo}</h2>
                <p className="texto-secundario" style={{ margin: 0 }}>
                  {t.home.recursosTexto}
                </p>
              </div>
              <Botao href={rota(idioma, 'biblioteca')} variante="secundario" tamanho="pequeno">
                {t.home.recursosAcao}
              </Botao>
            </div>

            <div
              className={doisCartoesRecursos ? 'grade--2' : ''}
              style={doisCartoesRecursos ? undefined : { maxWidth: '34rem' }}
            >
              {curso ? (
                <Link href={rota(idioma, `biblioteca/cursos/${curso.slug}`)} className="cartao">
                  <div className="linha" style={{ gap: 8 }}>
                    <Selo idioma={idioma} status={curso.status} />
                    <Chip vazado>{t.home.cursoOlho}</Chip>
                  </div>
                  <h3 className="cartao__titulo">{curso.titulo}</h3>
                  <p className="cartao__texto">{curso.resumo}</p>
                  <dl className="definicoes definicoes--2" style={{ gap: 14 }}>
                    <div>
                      <dt>{t.home.cursoDuracao}</dt>
                      <dd>{curso.duracao}</dd>
                    </div>
                    <div>
                      <dt>{t.home.cursoTurma}</dt>
                      <dd>{curso.proximaTurma}</dd>
                    </div>
                  </dl>
                  <div className="cartao__rodape">
                    <span>{`${numero(curso.modulos.length)} ${t.home.cursoModulos}`}</span>
                    <span className="link-seta">{t.comum.acoes.verCurso}</span>
                  </div>
                </Link>
              ) : null}

              {temMateriais ? (
                <Link href={rota(idioma, 'biblioteca/materiais')} className="cartao">
                  <div className="linha" style={{ gap: 8 }}>
                    <Chip vazado>{t.home.materiaisOlho}</Chip>
                  </div>
                  <h3 className="cartao__titulo">
                    {`${numero(materiais.length)} ${t.home.materiaisContagem}`}
                  </h3>
                  <p className="cartao__texto">{t.home.materiaisTexto}</p>
                  <Chips itens={formatos} />
                  <div className="cartao__rodape">
                    <span>{`${t.home.materiaisLicenca} ${licencas.join(', ')}`}</span>
                    <span className="link-seta">{t.home.materiaisAcao}</span>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

            <section
        className="secao secao--alta secao--preto"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div
          className="malha malha--densa"
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, color: 'rgba(255, 255, 255, 0.22)' }}
        />
        <div className="container" style={{ position: 'relative' }}>
          <LogoTilt altura={34} />
          <p
            style={{
              margin: '26px 0 0',
              fontSize: 'clamp(1.8rem, 1rem + 2.6vw, 3.2rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              maxWidth: '16ch',
            }}
          >
            {PROGRAM_TAGLINE}
          </p>
        </div>
      </section>
    </>
  );
}
