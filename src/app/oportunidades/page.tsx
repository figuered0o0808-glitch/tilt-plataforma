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

/**
 * Abertas primeiro, com o prazo mais proximo no topo. Depois as chamadas em
 * avaliacao e as encerradas, da mais recente para a mais antiga.
 */
function ordenar(lista: Call[]): Call[] {
  return [...lista].sort((a, b) => {
    const porStatus = PESO_STATUS[a.status] - PESO_STATUS[b.status];
    if (porStatus !== 0) return porStatus;
    if (a.status === 'aberta') return a.inscricoesAte.localeCompare(b.inscricoesAte);
    return b.inscricoesAte.localeCompare(a.inscricoesAte);
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

  const cabecalho = (
    <CabecalhoPagina
      olho={t.editais.listaOlho}
      titulo={t.editais.listaTitulo}
      descricao={t.editais.listaDescricao}
    />
  );

  /* Sem chamada publicada nao ha resumo do ciclo, filtro nem lista. */
  if (lista.length === 0) {
    return (
      <>
        {cabecalho}
        <SemChamadas />
      </>
    );
  }

  const resumo = resumoDoCiclo(lista);

  return (
    <>
      {cabecalho}

      <section className="secao secao--curta secao--menta" style={{ marginTop: 48 }}>
        <div className="container">
          <h2 className="sr-only">{t.editais.resumoTitulo}</h2>
          <dl
            className="definicoes"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', margin: 0, gap: 28 }}
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
            <div>
              <dt>{t.editais.resumoApoiados}</dt>
              <dd>
                <span className="numero-grande">{numero(resumo.apoiados)}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="secao">
        <div className="container">
          <ListaEditais editais={lista} />
        </div>
      </div>
    </>
  );
}
