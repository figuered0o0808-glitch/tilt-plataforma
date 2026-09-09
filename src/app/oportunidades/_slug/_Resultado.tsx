import { t } from '@/i18n/strings';
import { data, moeda, numero } from '@/lib/format';
import type { ResultadoEdital } from '@/lib/types';

/**
 * Bloco de transparencia do resultado, em faixa de cor chapada no topo da
 * pagina da chamada encerrada, antes de qualquer outra secao, com a relacao
 * integral de apoiados, projetos e valores.
 */
export function Resultado({ resultado }: { resultado: ResultadoEdital }) {
  const total = resultado.apoiados.reduce((soma, apoiado) => soma + apoiado.valor, 0);

  return (
    <section id="resultado" className="secao secao--azul" style={{ scrollMarginTop: 84 }}>
      <div className="container">
        <p className="olho" style={{ color: 'var(--preto)' }}>
          {t.editais.resultadoOlho}
        </p>
        <div className="linha linha--fim" style={{ alignItems: 'flex-end', gap: 24 }}>
          <h2 style={{ margin: 0 }}>{t.editais.secoes.resultado}</h2>
          <p className="texto-pequeno" style={{ margin: 0 }}>
            {`${t.editais.resultadoPublicadoEm} ${data(resultado.publicadoEm)}`}
          </p>
        </div>

        <div style={{ marginTop: 28 }}>
          <div className="registro">
            <p className="registro__rotulo">{t.editais.resultadoFundamentacao}</p>
            <p style={{ margin: 0, maxWidth: '66ch' }}>{resultado.fundamentacao}</p>
          </div>
        </div>

        <dl
          className="definicoes"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            margin: '32px 0',
            gap: 24,
          }}
        >
          <div>
            <dt>{t.editais.inscricoesRecebidas}</dt>
            <dd>
              <span className="numero-grande">{numero(resultado.inscricoesRecebidas)}</span>
            </dd>
          </div>
          <div>
            <dt>{t.editais.projetosApoiados}</dt>
            <dd>
              <span className="numero-grande">{numero(resultado.apoiados.length)}</span>
            </dd>
          </div>
          <div>
            <dt>{t.editais.totalApoiado}</dt>
            <dd>
              <span className="numero-grande">{moeda(total)}</span>
            </dd>
          </div>
        </dl>

        <h3 style={{ marginBottom: 14 }}>{t.editais.resultadoTabelaTitulo}</h3>

        <div className="tabela-rolagem">
          <table className="tabela">
            <caption className="sr-only">{t.editais.resultadoTabelaTitulo}</caption>
            <thead>
              <tr>
                <th scope="col">{t.editais.resultadoColunas.apoiado}</th>
                <th scope="col">{t.editais.resultadoColunas.projeto}</th>
                <th scope="col">{t.editais.resultadoColunas.formato}</th>
                <th scope="col">{t.editais.resultadoColunas.uf}</th>
                <th scope="col" className="num">
                  {t.editais.resultadoColunas.valor}
                </th>
              </tr>
            </thead>
            <tbody>
              {resultado.apoiados.map((apoiado) => (
                <tr key={`${apoiado.nome}-${apoiado.projeto}`}>
                  <td>{apoiado.nome}</td>
                  <td>{apoiado.projeto}</td>
                  <td>{apoiado.formato}</td>
                  <td>{apoiado.uf}</td>
                  <td className="num">{moeda(apoiado.valor)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>{t.editais.totalApoiado}</td>
                <td className="num">{moeda(total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="nota" style={{ marginTop: 20 }}>
          {t.editais.resultadoNota}
        </p>
      </div>
    </section>
  );
}
