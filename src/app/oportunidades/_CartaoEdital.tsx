import Link from 'next/link';

import { Chip } from '@/components/Chip';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { dataCurta, moeda } from '@/lib/format';
import type { Call } from '@/lib/types';

/** Prazo mostrado no rodape do cartao, coerente com a situacao da chamada. */
function prazo(edital: Call): string {
  if (edital.status === 'aberta') {
    return `${t.comum.rotulos.inscricoesAte} ${dataCurta(edital.inscricoesAte)}`;
  }
  if (edital.status === 'encerrada' && edital.resultado) {
    return `${t.editais.resultadoPublicadoEm} ${dataCurta(edital.resultado.publicadoEm)}`;
  }
  return `${t.editais.inscricoesEncerradasEm} ${dataCurta(edital.inscricoesAte)}`;
}

export function CartaoEdital({ edital }: { edital: Call }) {
  return (
    <Link href={`/oportunidades/${edital.slug}`} className="cartao">
      <div className="linha" style={{ gap: 8 }}>
        <Selo status={edital.status} />
        <Chip vazado>{t.comum.tiposEdital[edital.tipo]}</Chip>
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

      <dl
        className="definicoes definicoes--2"
        style={{ gap: 16, borderTop: '1px solid var(--linha)', paddingTop: 16 }}
      >
        <div>
          <dt>{t.comum.rotulos.valorTotal}</dt>
          <dd>{moeda(edital.valorTotal)}</dd>
        </div>
        <div>
          <dt>{t.comum.rotulos.apoio}</dt>
          <dd>{`${moeda(edital.faixaApoio.min)} a ${moeda(edital.faixaApoio.max)}`}</dd>
        </div>
      </dl>

      <div className="cartao__rodape">
        <span>{prazo(edital)}</span>
        <span className="link-seta">{t.comum.acoes.verEdital}</span>
      </div>
    </Link>
  );
}
