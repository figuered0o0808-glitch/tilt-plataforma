import Link from 'next/link';

import { Entrada } from '@/app/_Entrada';
import { Botao } from '@/components/Botao';
import { Chip, Chips } from '@/components/Chip';
import { Faixas } from '@/components/Faixas';
import { Ilustracao } from '@/components/Ilustracao';
import { Selo } from '@/components/Selo';
import { PROGRAM_TAGLINE } from '@/config/program';
import { t } from '@/i18n/strings';
import { cursos, editais, materiais } from '@/lib/data';
import { dataCurta, moeda, numero } from '@/lib/format';
import type { Call } from '@/lib/types';

/** Rotulo do prazo, coerente com a situacao da chamada. */
function prazoRotulo(chamada: Call): string {
  return chamada.status === 'aberta' ? t.comum.rotulos.inscricoesAte : t.comum.rotulos.prazo;
}

function CartaoChamada({ chamada }: { chamada: Call }) {
  return (
    <Link href={`/oportunidades/${chamada.slug}`} className="cartao">
      <div className="linha" style={{ gap: 8 }}>
        <Selo status={chamada.status} />
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
          <dt>{prazoRotulo(chamada)}</dt>
          <dd>{dataCurta(chamada.inscricoesAte)}</dd>
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

export default function Home() {
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
      <section className="hero">
        <div className="container">
          <div className="hero__grade">
            <div>
              <p className="olho">{PROGRAM_TAGLINE}</p>
              <h1 className="hero__frase">{t.home.frase}</h1>
              <p className="texto-guia">{t.home.apresentacao}</p>
              <Entrada temConteudo={temConteudo} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Ilustracao nome="hero" largura={420} className="ilustracao--suave" />
            </div>
          </div>
        </div>
      </section>

      {temConteudo ? null : (
        <section className="secao secao--menta" id="areas" style={{ scrollMarginTop: 88 }}>
          <div className="container">
            <div style={{ maxWidth: '42rem', marginBottom: 28 }}>
              <h2 style={{ marginBottom: 10 }}>{t.home.areasTitulo}</h2>
              <p className="texto-secundario" style={{ margin: 0 }}>
                {t.home.areasTexto}
              </p>
            </div>

            <div className="grade--2">
              {t.home.areas.map((area) => (
                <Link key={area.href} href={area.href} className="cartao">
                  <Ilustracao nome={area.desenho} largura={76} />
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
        <section className="secao secao--curta secao--menta">
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
              <div style={{ maxWidth: '42rem' }}>
                <h2 style={{ marginBottom: 10 }}>
                  {abertas.length > 0 ? t.home.chamadasTitulo : t.home.chamadasTituloSemAbertas}
                </h2>
                <p className="texto-secundario" style={{ margin: 0 }}>
                  {t.home.chamadasTexto}
                </p>
              </div>
              <Botao href="/oportunidades" variante="secundario" tamanho="pequeno">
                {t.home.chamadasAcao}
              </Botao>
            </div>

            <div className="grade--3">
              {emCartaz.map((chamada) => (
                <CartaoChamada key={chamada.slug} chamada={chamada} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Faixas altura="alta" />

      <section className="secao secao--azul" id="desenho" style={{ scrollMarginTop: 88 }}>
        <div className="container">
          <div style={{ maxWidth: '42rem', marginBottom: 30 }}>
            <h2 style={{ marginBottom: 10 }}>{t.home.desenhoTitulo}</h2>
            <p className="texto-guia">{t.home.desenhoTexto}</p>
          </div>

          <div>
            {t.home.desenho.map((item) => (
              <div className="registro" key={item.rotulo}>
                <p className="registro__rotulo">{item.rotulo}</p>
                <p style={{ margin: 0 }}>{item.texto}</p>
              </div>
            ))}
          </div>

          {chamadaDestaque || chamadaComResultado ? (
            <div className="linha" style={{ gap: 16, marginTop: 30 }}>
              {chamadaDestaque ? (
                <Botao
                  href={`/oportunidades/${chamadaDestaque.slug}`}
                  variante="secundario"
                  tamanho="pequeno"
                >
                  {t.home.desenhoLinkChamada}
                </Botao>
              ) : null}
              {chamadaComResultado ? (
                <Botao
                  href={`/oportunidades/${chamadaComResultado.slug}`}
                  variante="discreto"
                  tamanho="pequeno"
                >
                  {t.home.desenhoLinkResultado}
                </Botao>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {temRecursos ? (
        <section className="secao secao--amarelo">
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
              <Botao href="/biblioteca" variante="secundario" tamanho="pequeno">
                {t.home.recursosAcao}
              </Botao>
            </div>

            <div
              className={doisCartoesRecursos ? 'grade--2' : ''}
              style={doisCartoesRecursos ? undefined : { maxWidth: '34rem' }}
            >
              {curso ? (
                <Link href={`/biblioteca/cursos/${curso.slug}`} className="cartao">
                  <div className="linha" style={{ gap: 8 }}>
                    <Selo status={curso.status} />
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
                <Link href="/biblioteca/materiais" className="cartao">
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

      {temConteudo ? null : (
        <section className="secao secao--amarelo">
          <div className="container">
            <div style={{ maxWidth: '46rem' }}>
              <p className="olho">{t.home.estadoOlho}</p>
              <p className="texto-guia">{t.home.estadoTexto}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
