'use client';

/**
 * Tabela das candidaturas enviadas. So e montada com o cadastro aberto: o
 * estado vazio daqui e o de quem tem cadastro e ainda nao se candidatou.
 */

import Link from 'next/link';

import { Botao } from '@/components/Botao';
import { EstadoVazio } from '@/components/EstadoVazio';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { dataCurta, moeda } from '@/lib/format';
import type { Candidatura } from '@/lib/types';

const s = t.paineis;

export function Candidaturas({ candidaturas }: { candidaturas: Candidatura[] }) {
  if (candidaturas.length === 0) {
    return (
      <EstadoVazio
        desenho="pasta"
        titulo={s.candidaturasVazio}
        acao={
          <Botao href="/oportunidades" variante="secundario" tamanho="pequeno">
            {s.verOportunidades}
          </Botao>
        }
      />
    );
  }

  const total = candidaturas.reduce((soma, item) => soma + item.valorSolicitado, 0);

  return (
    <div className="tabela-rolagem">
      <table className="tabela">
        <thead>
          <tr>
            <th scope="col">{s.colunas.edital}</th>
            <th scope="col">{s.colunas.projeto}</th>
            <th scope="col" className="num">
              {s.colunas.valor}
            </th>
            <th scope="col">{s.colunas.enviada}</th>
            <th scope="col">{s.colunas.situacao}</th>
          </tr>
        </thead>
        <tbody>
          {candidaturas.map((candidatura) => (
            <tr key={candidatura.id}>
              <td>
                <Link href={`/oportunidades/${candidatura.editalSlug}`}>
                  {candidatura.editalTitulo}
                </Link>
              </td>
              <td>
                <span style={{ display: 'block', color: 'var(--preto)' }}>
                  {candidatura.projeto}
                </span>
                <span className="texto-mini">{candidatura.formato}</span>
              </td>
              <td className="num">{moeda(candidatura.valorSolicitado)}</td>
              <td>{dataCurta(candidatura.enviadaEm)}</td>
              <td>
                <Selo status={candidatura.status} />
              </td>
            </tr>
          ))}
        </tbody>
        {candidaturas.length > 1 ? (
          <tfoot>
            <tr>
              <td colSpan={2}>{s.totalSolicitado}</td>
              <td className="num">{moeda(total)}</td>
              <td colSpan={2} />
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}
