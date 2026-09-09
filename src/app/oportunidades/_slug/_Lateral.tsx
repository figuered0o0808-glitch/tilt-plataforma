'use client';

import { Botao } from '@/components/Botao';
import { t } from '@/i18n/strings';
import { data } from '@/lib/format';
import type { Call } from '@/lib/types';
import { useApp } from '@/state/AppState';

const tc = t.fluxos.candidatura;

/** Etapa de divulgacao do resultado, quando existe no cronograma da chamada. */
function previsaoDoResultado(edital: Call): string | null {
  const etapa = edital.cronograma.find((item) => {
    const nome = item.etapa.toLowerCase();
    return nome.includes('resultado');
  });
  return etapa ? etapa.data : null;
}

function ancoras(edital: Call): { id: string; rotulo: string }[] {
  const itens: { id: string; rotulo: string }[] = [];
  if (edital.status === 'encerrada' && edital.resultado) {
    itens.push({ id: 'resultado', rotulo: t.editais.secoes.resultado });
  }
  itens.push(
    { id: 'apresentacao', rotulo: t.editais.secoes.apresentacao },
    { id: 'escopo', rotulo: t.editais.secoes.escopo },
    { id: 'nao-apoiado', rotulo: t.editais.secoes.naoApoiado },
    { id: 'criterios', rotulo: t.editais.secoes.criterios },
    { id: 'banca', rotulo: t.editais.secoes.banca },
    { id: 'distribuicao', rotulo: t.editais.secoes.distribuicao },
    { id: 'cronograma', rotulo: t.editais.secoes.cronograma },
    { id: 'faq', rotulo: t.editais.secoes.faq },
  );
  return itens;
}

/** Par de data com rotulo curto, usado no cartao de candidatura. */
function Data({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <p className="texto-mini" style={{ margin: 0 }}>
        {rotulo}
      </p>
      <p style={{ margin: '2px 0 0' }}>{valor}</p>
    </div>
  );
}

export function Lateral({ edital }: { edital: Call }) {
  const { cadastrado } = useApp();
  const previsao = previsaoDoResultado(edital);

  return (
    <aside className="lateral">
      <div className="cartao">
        <p className="olho" style={{ margin: 0 }}>
          {t.editais.candidaturaTitulo}
        </p>

        {edital.status === 'aberta' ? (
          <>
            <Data rotulo={t.comum.rotulos.inscricoesAte} valor={data(edital.inscricoesAte)} />
            {cadastrado ? (
              <Botao href={`/oportunidades/${edital.slug}/candidatura`} largo>
                {t.comum.acoes.candidatarProjeto}
              </Botao>
            ) : (
              <>
                <Botao href="/cadastro" largo>
                  {tc.cadastro.acao}
                </Botao>
                <p className="texto-mini" style={{ margin: 0 }}>
                  {tc.cadastro.nota}
                </p>
              </>
            )}
          </>
        ) : null}

        {edital.status === 'em-avaliacao' ? (
          <>
            <p className="texto-pequeno texto-secundario" style={{ margin: 0 }}>
              {t.editais.emAvaliacaoAviso}
            </p>
            {previsao ? (
              <Data rotulo={t.editais.resultadoPrevistoPara} valor={data(previsao)} />
            ) : null}
            <Botao href="/oportunidades" variante="secundario" largo>
              {t.editais.voltarLista}
            </Botao>
          </>
        ) : null}

        {edital.status === 'encerrada' ? (
          <>
            <p className="texto-pequeno texto-secundario" style={{ margin: 0 }}>
              {t.editais.encerradaAviso}
            </p>
            {edital.resultado ? (
              <>
                <Data
                  rotulo={t.editais.resultadoPublicadoEm}
                  valor={data(edital.resultado.publicadoEm)}
                />
                <Botao href="#resultado" largo>
                  {t.editais.verResultado}
                </Botao>
              </>
            ) : null}
            <Botao href="/oportunidades" variante="secundario" largo>
              {t.editais.voltarLista}
            </Botao>
          </>
        ) : null}
      </div>

      <nav className="cartao cartao--compacto" aria-label={t.editais.nestaPagina}>
        <p className="olho" style={{ margin: 0 }}>
          {t.editais.nestaPagina}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="pilha--p">
          {ancoras(edital).map((item) => (
            <li key={item.id} style={{ margin: 0 }}>
              <a href={`#${item.id}`} className="texto-pequeno">
                {item.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
