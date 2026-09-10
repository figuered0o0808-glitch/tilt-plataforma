import Link from 'next/link';
import type { CSSProperties } from 'react';

import { Chip } from '@/components/Chip';
import { Selo } from '@/components/Selo';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { arquivoPublico, moeda } from '@/lib/format';
import { rota } from '@/lib/rotas';
import type { Call } from '@/lib/types';

import { prazoDaChamada } from './_prazo';

/**
 * Uma chamada sozinha, em largura inteira.
 *
 * Um cartao de grade ao lado de duas colunas vazias faz a unica chamada
 * publicada parecer sobra de lista. Aqui ela ocupa a coluna toda e ja mostra
 * os quatro numeros que decidem se vale ler o resto: quem financia, quanto ha
 * na chamada, quanto vai por projeto e ate quando da para se inscrever.
 */
export function ChamadaDestaque({
  idioma,
  edital,
  nivel = 2,
}: {
  idioma: Idioma;
  edital: Call;
  nivel?: 2 | 3;
}) {
  const t = textos(idioma);
  const prazo = prazoDaChamada(idioma, edital);
  const Titulo = nivel === 2 ? 'h2' : 'h3';
  const marca = edital.status === 'aberta' ? 'var(--menta)' : 'var(--areia)';

  return (
    <Link
      href={rota(idioma, `oportunidades/${edital.slug}`)}
      className="cartao cartao--marcado"
      style={{ '--marca': marca, gap: 'var(--esp-16)' } as CSSProperties}
    >
      <div className="linha linha--fim" style={{ gap: 12 }}>
        <div className="linha" style={{ gap: 8 }}>
          <Selo idioma={idioma} status={edital.status} />
          <Chip vazado>{t.comum.tiposEdital[edital.tipo]}</Chip>
        </div>
        {edital.logoOrganizacao ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={arquivoPublico(edital.logoOrganizacao)}
            alt={edital.organizacao ?? ''}
            style={{
              height: 22,
              width: 'auto',
              display: 'block',
              flex: 'none',
              /* Quando a linha quebra no celular, a marca fica no fim, nao orfa a esquerda. */
              marginLeft: 'auto',
            }}
          />
        ) : null}
      </div>

      {/* Sozinha na pagina, a chamada leva o corpo de titulo, nao o de cartao. */}
      <Titulo
        style={{
          margin: 0,
          maxWidth: '38ch',
          fontSize: 'var(--titulo-g)',
          lineHeight: 'var(--entrelinha-g)',
        }}
      >
        {edital.titulo}
      </Titulo>

      <p className="cartao__texto" style={{ maxWidth: '64ch' }}>
        {edital.resumo}
      </p>

      <dl
        className="definicoes"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 'var(--esp-24)',
          borderTop: '1px solid var(--linha)',
          paddingTop: 'var(--esp-24)',
          margin: 0,
        }}
      >
        <div>
          <dt>{t.editais.proponente}</dt>
          <dd>{edital.proponente ?? t.editais.proponenteProprio}</dd>
        </div>
        <div>
          <dt>{t.comum.rotulos.valorTotal}</dt>
          <dd>{moeda(edital.valorTotal, idioma)}</dd>
        </div>
        <div>
          <dt>{t.comum.rotulos.apoio}</dt>
          <dd>
            {`${moeda(edital.faixaApoio.min, idioma)} ${t.editais.faixaSeparador} ${moeda(
              edital.faixaApoio.max, idioma
)}`}
          </dd>
        </div>
        <div>
          <dt>{prazo.rotulo}</dt>
          <dd>{prazo.valor}</dd>
        </div>
      </dl>

      <div className="cartao__rodape">
        <span className="link-seta">{t.comum.acoes.verEdital}</span>
      </div>
    </Link>
  );
}
