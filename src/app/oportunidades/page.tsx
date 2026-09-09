import type { Metadata } from 'next';

import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { t } from '@/i18n/strings';
import { editais } from '@/lib/data';
import { moeda, numero } from '@/lib/format';
import type { Call, StatusEdital } from '@/lib/types';

import { ListaEditais } from './_ListaEditais';
import { SemChamadas } from './_SemChamadas';

export const metadata: Metadata = { title: t.editais.listaTitulo };

const PESO_STATUS: Record<StatusEdital, number> = {
  aberta: 0,
  'em-avaliacao': 1,
  encerrada: 2,
};

/** Chamada sem calendario fechado nao tem data para comparar: vai para o fim. */
const SEM_PRAZO = { crescente: '9999-12-31', decrescente: '0000-01-01' };

/**
 * Abertas primeiro, com o prazo mais proximo no topo. Depois as chamadas em
 * avaliacao e as encerradas, da mais recente para a mais antiga.
 */
function ordenar(lista: Call[]): Call[] {
  return [...lista].sort((a, b) => {
    const porStatus = PESO_STATUS[a.status] - PESO_STATUS[b.status];
    if (porStatus !== 0) return porStatus;
    if (a.status === 'aberta') {
      const { crescente } = SEM_PRAZO;
      return (a.inscricoesAte ?? crescente).localeCompare(b.inscricoesAte ?? crescente);
    }
    const { decrescente } = SEM_PRAZO;
    return (b.inscricoesAte ?? decrescente).localeCompare(a.inscricoesAte ?? decrescente);
  });
}

/** Numeros do ciclo, todos derivados das chamadas publicadas. */
function resumoDoCiclo(lista: Call[]) {
  const abertas = lista.filter((edital) => edital.status === 'aberta');
  return {
    abertas: abertas.length,
    recursos: abertas.reduce((soma, edital) => soma + edital.valorTotal, 0),
    apoiados: lista.reduce(
      (soma, edital) => soma + (edital.resultado ? edital.resultado.apoiados.length : 0),
      0,
    ),
  };
}

export default function PaginaEditais() {
  const lista = ordenar(editais);

  const cabecalho = (estreito: boolean) => (
    <CabecalhoPagina
      estreito={estreito}
      olho={t.editais.listaOlho}
      titulo={t.editais.listaTitulo}
    />
  );

  /* Sem chamada publicada nao ha resumo do ciclo, filtro nem lista. */
  if (lista.length === 0) {
    return (
      <>
        {cabecalho(true)}
        <SemChamadas />
      </>
    );
  }

  const resumo = resumoDoCiclo(lista);

  return (
    <>
      {cabecalho(false)}

      {/*
        Com uma unica chamada publicada os numeros do ciclo repetem o que o
        cartao ja diz. O resumo entra quando ha mais de uma chamada.
      */}
      {lista.length > 1 ? (
        <section className="secao secao--curta secao--branco" style={{ marginTop: 48 }}>
          <div className="container">
            <h2 className="sr-only">{t.editais.resumoTitulo}</h2>
            <dl
              className="definicoes"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                margin: 0,
                gap: 28,
              }}
            >
              <div>
                <dt>{t.editais.resumoAbertas}</dt>
                <dd>
                  <span className="numero-grande">{numero(resumo.abertas)}</span>
                </dd>
              </div>
              <div>
                <dt>{t.editais.resumoRecursos}</dt>
                <dd>
                  <span className="numero-grande">{moeda(resumo.recursos)}</span>
                </dd>
              </div>
              {resumo.apoiados > 0 ? (
                <div>
                  <dt>{t.editais.resumoApoiados}</dt>
                  <dd>
                    <span className="numero-grande">{numero(resumo.apoiados)}</span>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </section>
      ) : null}

      <div className="secao">
        <div className="container">
          <ListaEditais editais={lista} />
        </div>
      </div>
    </>
  );
}
