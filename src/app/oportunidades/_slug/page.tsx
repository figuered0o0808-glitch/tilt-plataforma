import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { Avatar } from '@/components/Avatar';
import { BlocoAutonomia } from '@/components/BlocoAutonomia';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { corDoTema } from '@/components/Chip';
import { Faixas } from '@/components/Faixas';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { editais, editalPorSlug } from '@/lib/data';
import { data, moeda } from '@/lib/format';

import { Faq } from './_Faq';
import { Lateral } from './_Lateral';
import { Resultado } from './_Resultado';

export function generateStaticParams() {
  return editais.map((edital) => ({ slug: edital.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: editalPorSlug(slug)?.titulo ?? t.editais.listaTitulo };
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

export default async function PaginaEdital({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edital = editalPorSlug(slug);
  if (!edital) notFound();

  const somaPesos = edital.criterios.reduce((soma, criterio) => soma + criterio.peso, 0);
  const rotuloPrazo =
    edital.status === 'aberta' ? t.comum.rotulos.inscricoesAte : t.editais.inscricoesEncerradasEm;
  const temObservacao = edital.distribuicao.some((faixa) => Boolean(faixa.observacao));

  return (
    <>
      <CabecalhoPagina
        olho={t.comum.tiposEdital[edital.tipo]}
        titulo={edital.titulo}
        descricao={edital.resumo}
        acoes={<Selo status={edital.status} />}
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
              <dd>{`${moeda(edital.faixaApoio.min)} a ${moeda(edital.faixaApoio.max)}`}</dd>
            </div>
            <div>
              <dt>{rotuloPrazo}</dt>
              <dd>{data(edital.inscricoesAte)}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Faixas altura="fina" />

      {edital.status === 'encerrada' && edital.resultado ? (
        <Resultado resultado={edital.resultado} />
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

              <BlocoAutonomia />

              <Secao id="escopo" titulo={t.editais.secoes.escopo}>
                <div className="cartao">
                  <ul style={{ margin: 0 }}>
                    {edital.escopo.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Secao>

              <Secao id="nao-apoiado" titulo={t.editais.secoes.naoApoiado}>
                <div className="cartao cartao--rosa">
                  <ul style={{ margin: 0 }}>
                    {edital.naoApoiado.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Secao>

              <Secao id="criterios" titulo={t.editais.secoes.criterios}>
                <div>
                  {edital.criterios.map((criterio) => (
                    <Registro
                      key={criterio.titulo}
                      rotulo={`${t.editais.pesoRotulo} ${criterio.peso}`}
                    >
                      <h3 style={{ margin: '0 0 6px', fontSize: '1.08rem' }}>{criterio.titulo}</h3>
                      <p className="texto-pequeno" style={{ margin: 0, maxWidth: '62ch' }}>
                        {criterio.descricao}
                      </p>
                    </Registro>
                  ))}
                  <Registro rotulo={t.editais.somaPesos}>
                    <p style={{ margin: 0 }}>{somaPesos}</p>
                  </Registro>
                </div>
                <p className="nota" style={{ marginTop: 22 }}>
                  {t.editais.criteriosNota}
                </p>
              </Secao>

              <Secao id="banca" titulo={t.editais.secoes.banca}>
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
                <p className="nota" style={{ marginTop: 22 }}>
                  {t.editais.bancaNota}
                </p>
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
                <p className="nota" style={{ marginTop: 22 }}>
                  {t.editais.distribuicaoNota}
                </p>
              </Secao>

              <Secao id="cronograma" titulo={t.editais.secoes.cronograma}>
                <div>
                  {edital.cronograma.map((etapa) => (
                    <Registro key={etapa.etapa} rotulo={data(etapa.data)}>
                      <p style={{ margin: 0 }}>{etapa.etapa}</p>
                    </Registro>
                  ))}
                </div>
              </Secao>

              <Secao id="faq" titulo={t.editais.secoes.faq}>
                <Faq itens={edital.faq} />
              </Secao>
            </div>

            <Lateral edital={edital} />
          </div>
        </div>
      </div>
    </>
  );
}
