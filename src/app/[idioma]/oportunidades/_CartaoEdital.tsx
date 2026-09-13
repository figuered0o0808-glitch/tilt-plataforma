import Link from 'next/link';

import { Chip } from '@/components/Chip';
import { Marcador } from '@/components/Marcador';
import { Selo } from '@/components/Selo';
import { Vagas } from '@/components/Vagas';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { arquivoPublico, dataCurta, moeda } from '@/lib/format';
import { rota } from '@/lib/rotas';
import type { Call } from '@/lib/types';

import { prazoEmLinha } from './_prazo';

/** Data mostrada no rodape do cartao, coerente com a situacao da chamada. */
function rodape(idioma: Idioma, edital: Call): string {
  if (edital.status === 'encerrada' && edital.resultado) {
    const t = textos(idioma);
    return `${t.editais.resultadoPublicadoEm} ${dataCurta(edital.resultado.publicadoEm, idioma)}`;
  }
  return prazoEmLinha(idioma, edital, true);
}

export function CartaoEdital({ idioma, edital }: { idioma: Idioma; edital: Call }) {
  const t = textos(idioma);

  return (
    <Link href={rota(idioma, `oportunidades/${edital.slug}`)} className="cartao">
      <div className="linha linha--fim" style={{ gap: 12 }}>
        <div className="linha" style={{ gap: 10 }}>
          <Marcador arranjo={1} />
          <Selo idioma={idioma} status={edital.status} />
          <Chip vazado>{t.comum.tiposEdital[edital.tipo]}</Chip>
        </div>
        {edital.logoOrganizacao ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={arquivoPublico(edital.logoOrganizacao)}
            alt={edital.organizacao ?? ''}
            style={{
              height: 16,
              width: 'auto',
              display: 'block',
              flex: 'none',
              /* Quando a linha quebra no celular, a marca fica no fim, nao orfa a esquerda. */
              marginLeft: 'auto',
            }}
          />
        ) : null}
      </div>

      <div>
        <h3 className="cartao__titulo">{edital.titulo}</h3>
        <p className="texto-mini" style={{ margin: '8px 0 0' }}>
          {edital.proponente
            ? `${t.editais.proponente}: ${edital.proponente}`
            : t.editais.proponenteProprio}
        </p>
      </div>

      {/* O resumo absorve a folga para que os blocos de numeros fiquem alinhados. */}
      <p className="cartao__texto" style={{ flex: 1 }}>
        {edital.resumo}
      </p>

      {/* A ficha em linhas com filete, como na coluna rosa da home. */}
      <div className="coluna__linhas">
        <div className="coluna__linha">
          <span className="rotulo">{t.comum.rotulos.valorTotal}</span>
          <span>{moeda(edital.valorTotal, idioma)}</span>
        </div>
        <div className="coluna__linha">
          <span className="rotulo">{t.comum.rotulos.apoio}</span>
          <span>
            {`${moeda(edital.faixaApoio.min, idioma)} ${t.editais.faixaSeparador} ${moeda(
              edital.faixaApoio.max,
              idioma,
            )}`}
          </span>
        </div>
      </div>

      <Vagas idioma={idioma} chamada={edital} />

      <div className="cartao__rodape">
        <span>{rodape(idioma, edital)}</span>
        <span className="link-seta">{t.comum.acoes.verEdital}</span>
      </div>
    </Link>
  );
}
