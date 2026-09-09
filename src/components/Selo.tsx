import { t } from '@/i18n/strings';

type Chave = keyof typeof t.comum.status;

const ATIVOS: Chave[] = ['aberta', 'aprovada', 'aberto'];
const APAGADOS: Chave[] = ['encerrada', 'nao-selecionada', 'em-breve', 'concluido'];

/** Selo de estado. O rotulo sai de strings.ts. */
export function Selo({ status, rotulo }: { status: string; rotulo?: string }) {
  const chave = status as Chave;
  const texto = rotulo ?? t.comum.status[chave] ?? status;
  const modificador = ATIVOS.includes(chave)
    ? 'selo--ativo'
    : APAGADOS.includes(chave)
      ? 'selo--apagado'
      : 'selo--neutro';
  return <span className={`selo ${modificador}`}>{texto}</span>;
}
