import type { ReactNode } from 'react';
import { RostoIndica } from '@/components/RostoIndica';

export function EstadoVazio({
  titulo,
  descricao,
  acao,
  desenho = 'busca',
}: {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
  desenho?: 'busca' | 'lista' | 'pasta';
}) {
  return (
    <div className="vazio">
      <RostoIndica expressao={desenho === 'busca' ? '03' : '02'} tamanho={108} />
      <p className="vazio__titulo">{titulo}</p>
      {descricao ? <p className="texto-pequeno vazio__texto">{descricao}</p> : null}
      {acao}
    </div>
  );
}
