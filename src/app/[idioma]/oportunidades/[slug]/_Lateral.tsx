'use client';

import { Botao } from '@/components/Botao';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { data } from '@/lib/format';
import { rota } from '@/lib/rotas';
import type { Call } from '@/lib/types';
import { useApp } from '@/state/AppState';

import { prazoDaChamada } from '../_prazo';

/** Etapa de divulgacao do resultado, quando existe no cronograma da chamada. */
function previsaoDoResultado(idioma: Idioma, edital: Call): string | null {
  const termo = textos(idioma).editais.termoEtapaResultado;
  const etapa = edital.cronograma.find((item) => {
    const nome = item.etapa.toLowerCase();
    return nome.includes(termo);
  });
  return etapa ? etapa.data : null;
}

function ancoras(idioma: Idioma, edital: Call): { id: string; rotulo: string }[] {
  const { secoes } = textos(idioma).editais;
  const itens: { id: string; rotulo: string }[] = [];
  if (edital.status === 'encerrada' && edital.resultado) {
    itens.push({ id: 'resultado', rotulo: secoes.resultado });
  }
  itens.push(
    { id: 'apresentacao', rotulo: secoes.apresentacao },
    { id: 'escopo', rotulo: secoes.escopo },
    ...(edital.naoApoiado.length > 0 ? [{ id: 'nao-apoiado', rotulo: secoes.naoApoiado }] : []),
    { id: 'criterios', rotulo: secoes.criterios },
    { id: 'banca', rotulo: secoes.banca },
    { id: 'distribuicao', rotulo: secoes.distribuicao },
  );
  /* A pagina so publica cronograma quando ha etapas. */
  if (edital.cronograma.length > 0) {
    itens.push({ id: 'cronograma', rotulo: secoes.cronograma });
  }
  itens.push({ id: 'faq', rotulo: secoes.faq });
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

export function Lateral({ idioma, edital }: { idioma: Idioma; edital: Call }) {
  const t = textos(idioma);
  const tc = t.fluxos.candidatura;
  const { cadastrado } = useApp();
  const previsao = previsaoDoResultado(idioma, edital);
  const prazo = prazoDaChamada(idioma, edital);

  return (
    <aside className="lateral">
      <div className="cartao">
        <p className="olho" style={{ margin: 0 }}>
          {t.editais.candidaturaTitulo}
        </p>

        {edital.status === 'aberta' ? (
          <>
            <Data rotulo={prazo.rotulo} valor={prazo.valor} />
            {cadastrado ? (
              <Botao href={rota(idioma, `oportunidades/${edital.slug}/candidatura`)} largo>
                {t.comum.acoes.candidatarProjeto}
              </Botao>
            ) : (
              <Botao href={rota(idioma, 'cadastro')} largo>
                {tc.cadastro.acao}
              </Botao>
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
            <Botao href={rota(idioma, 'oportunidades')} variante="secundario" largo>
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
            <Botao href={rota(idioma, 'oportunidades')} variante="secundario" largo>
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
          {ancoras(idioma, edital).map((item) => (
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
