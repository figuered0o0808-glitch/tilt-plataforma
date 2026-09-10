import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { Avatar } from '@/components/Avatar';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { corDoTema } from '@/components/Chip';
import { Faixas } from '@/components/Faixas';
import { Selo } from '@/components/Selo';
import { IDIOMAS, ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo, editalPorSlug } from '@/lib/data';
import { arquivoPublico, data, moeda } from '@/lib/format';

import { prazoDaChamada } from '../_prazo';

import { Lateral } from './_Lateral';
import { Resultado } from './_Resultado';

/** Cada idioma gera apenas as chamadas publicadas nele. */
export function generateStaticParams() {
  return IDIOMAS.flatMap((idioma) =>
    conteudo(idioma).editais.map((edital) => ({ idioma, slug: edital.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string; slug: string }>;
}): Promise<Metadata> {
  const { idioma, slug } = await params;
  if (!ehIdioma(idioma)) return {};
  return {
    title: editalPorSlug(idioma, slug)?.titulo ?? textos(idioma).editais.listaTitulo,
  };
}

/** Secao ancorada da pagina da chamada. O recuo evita ficar sob o cabecalho fixo. */
function Secao({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 96 }}>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

/** Linha de registro do manual: rotulo curto a esquerda, conteudo a direita. */
function Registro({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="registro">
      <p className="registro__rotulo">{rotulo}</p>
      <div>{children}</div>
    </div>
  );
}

export default async function PaginaEdital({
  params,
}: {
  params: Promise<{ idioma: string; slug: string }>;
}) {
  const { idioma, slug } = await params;
  if (!ehIdioma(idioma)) notFound();

  const t = textos(idioma);
  const edital = editalPorSlug(idioma, slug);
  if (!edital) notFound();

  /*
   * Ha chamada que atribui peso numerico a cada criterio e ha chamada que so
   * ordena os criterios por peso. Sem peso em todos, a pagina numera a ordem.
   */
  const pesos = edital.criterios.map((criterio) => criterio.peso);
  const comPeso = pesos.length > 0 && pesos.every((peso) => typeof peso === 'number');
  const somaPesos = pesos.reduce<number>((soma, peso) => soma + (peso ?? 0), 0);

  const prazo = prazoDaChamada(idioma, edital);
  const temObservacao = edital.distribuicao.some((faixa) => Boolean(faixa.observacao));

  return (
    <>
      <CabecalhoPagina
        olho={t.comum.tiposEdital[edital.tipo]}
        titulo={edital.titulo}
        descricao={edital.resumo}
        acoes={
          <div className="linha" style={{ gap: 18 }}>
            {edital.logoOrganizacao ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={arquivoPublico(edital.logoOrganizacao)}
                alt={edital.organizacao ?? ''}
                style={{ height: 20, width: 'auto', display: 'block' }}
              />
            ) : null}
            <Selo idioma={idioma} status={edital.status} />
          </div>
        }
      />

      <section className="secao secao--curta secao--branco" style={{ marginTop: 44 }}>
        <div className="container">
          <h2 className="sr-only">{t.editais.numerosTitulo}</h2>
          <dl
            className="definicoes"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: 24,
              margin: 0,
            }}
          >
            <div>
              <dt>{t.editais.proponente}</dt>
              <dd>{edital.proponente ?? t.editais.proponenteProprio}</dd>
            </div>
            <div>
              <dt>{t.comum.rotulos.valorTotal}</dt>
              <dd>{moeda(edital.valorTotal)}</dd>
            </div>
            <div>
              <dt>{t.comum.rotulos.apoio}</dt>
              <dd>
                {`${moeda(edital.faixaApoio.min)} ${t.editais.faixaSeparador} ${moeda(
                  edital.faixaApoio.max,
                )}`}
              </dd>
            </div>
            <div>
              <dt>{prazo.rotulo}</dt>
              <dd>{prazo.valor}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Faixas altura="fina" />

      {edital.status === 'encerrada' && edital.resultado ? (
        <Resultado idioma={idioma} resultado={edital.resultado} />
      ) : null}

      <div className="secao">
        <div className="container">
          <div className="grade--lateral">
            <div className="pilha--g">
              <Secao id="apresentacao" titulo={t.editais.secoes.apresentacao}>
                <div className="prosa">
                  {edital.apresentacao.map((paragrafo) => (
                    <p key={paragrafo}>{paragrafo}</p>
                  ))}
                </div>
              </Secao>

              <Secao id="escopo" titulo={t.editais.secoes.escopo}>
                <div className="cartao">
                  <ul style={{ margin: 0 }}>
                    {edital.escopo.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Secao>

              {edital.naoApoiado.length > 0 ? (
              <Secao id="nao-apoiado" titulo={t.editais.secoes.naoApoiado}>
                <div
                  className="cartao cartao--marcado"
                  style={{ '--marca': 'var(--rosa)' } as CSSProperties}
                >
                  <ul style={{ margin: 0 }}>
                    {edital.naoApoiado.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Secao>
              ) : null}

              <Secao id="criterios" titulo={t.editais.secoes.criterios}>
                {comPeso ? null : (
                  <p className="nota" style={{ marginBottom: 22 }}>
                    {t.editais.criteriosOrdem}
                  </p>
                )}
                <div>
                  {edital.criterios.map((criterio, indice) => (
                    <Registro
                      key={criterio.titulo}
                      rotulo={
                        comPeso
                          ? `${t.editais.pesoRotulo} ${criterio.peso}`
                          : `${indice + 1}${t.editais.posicaoSufixo}`
                      }
                    >
                      <h3 style={{ margin: '0 0 6px', fontSize: '1.08rem' }}>{criterio.titulo}</h3>
                      <p className="texto-pequeno" style={{ margin: 0, maxWidth: '62ch' }}>
                        {criterio.descricao}
                      </p>
                    </Registro>
                  ))}
                  {comPeso ? (
                    <Registro rotulo={t.editais.somaPesos}>
                      <p style={{ margin: 0 }}>{somaPesos}</p>
                    </Registro>
                  ) : null}
                </div>
              </Secao>

              <Secao id="banca" titulo={t.editais.secoes.banca}>
                {edital.banca.length > 0 ? (
                  <div className="grade--2">
                    {edital.banca.map((membro) => (
                      <div className="cartao cartao--compacto" key={membro.nome}>
                        <div className="linha" style={{ gap: 12, flexWrap: 'nowrap' }}>
                          <Avatar nome={membro.nome} cor={corDoTema(membro.nome)} />
                          <div>
                            <p style={{ margin: 0 }}>{membro.nome}</p>
                            <p className="texto-mini" style={{ margin: 0 }}>
                              {membro.afiliacao}
                            </p>
                          </div>
                        </div>
                        <p className="cartao__texto">{membro.minibio}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Composicao ainda nao publicada: vale a regra, nao uma grade vazia. */
                  <p className="nota" style={{ margin: 0, maxWidth: '62ch' }}>
                    {t.editais.bancaSemComposicao}
                  </p>
                )}
              </Secao>

              <Secao id="distribuicao" titulo={t.editais.secoes.distribuicao}>
                <div className="tabela-rolagem">
                  <table className="tabela">
                    <thead>
                      <tr>
                        <th scope="col">{t.editais.distribuicaoColunas.faixa}</th>
                        <th scope="col">{t.editais.distribuicaoColunas.quantidade}</th>
                        {temObservacao ? (
                          <th scope="col">{t.editais.distribuicaoColunas.observacao}</th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {edital.distribuicao.map((faixa) => (
                        <tr key={faixa.faixa}>
                          <td>{faixa.faixa}</td>
                          <td>{faixa.quantidade}</td>
                          {temObservacao ? <td>{faixa.observacao ?? ''}</td> : null}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Secao>

              {/* Cronograma so entra depois de fechado: sem etapas, sem secao. */}
              {edital.cronograma.length > 0 ? (
                <Secao id="cronograma" titulo={t.editais.secoes.cronograma}>
                  <div>
                    {edital.cronograma.map((etapa) => (
                      <Registro key={etapa.etapa} rotulo={data(etapa.data)}>
                        <p style={{ margin: 0 }}>{etapa.etapa}</p>
                      </Registro>
                    ))}
                  </div>
                </Secao>
              ) : null}

            </div>

            <Lateral idioma={idioma} edital={edital} />
          </div>
        </div>
      </div>
    </>
  );
}
