'use client';

import { useMemo, useState, type ReactNode } from 'react';

import { Botao } from '@/components/Botao';
import { EstadoVazio } from '@/components/EstadoVazio';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import type { Call, StatusEdital, TipoEdital } from '@/lib/types';

import { CartaoEdital } from './_CartaoEdital';

/** Ordem canonica de exibicao dos filtros. So aparece o que existe nos dados. */
const ORDEM_STATUS: StatusEdital[] = ['aberta', 'em-avaliacao', 'encerrada'];
const ORDEM_TIPO: TipoEdital[] = [
  'tema-amplo',
  'macrotema',
  'pauta-especifica',
  'edital-organizacao',
];

interface Opcao {
  valor: string;
  rotulo: string;
  total: number;
}

/** Pilula de filtro, no padrao de botao da marca. */
function Pilula({
  ativo,
  aoClicar,
  children,
}: {
  ativo: boolean;
  aoClicar: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="aba"
      aria-pressed={ativo}
      onClick={aoClicar}
      style={ativo ? { background: 'var(--preto)', color: 'var(--branco)' } : undefined}
    >
      {children}
    </button>
  );
}

/** Linha de filtro no padrao de composicao da marca: rotulo curto e pilulas. */
function LinhaFiltro({
  rotulo,
  rotuloTodos,
  total,
  opcoes,
  valor,
  aoEscolher,
}: {
  rotulo: string;
  rotuloTodos: string;
  total: number;
  opcoes: Opcao[];
  valor: string;
  aoEscolher: (valor: string) => void;
}) {
  return (
    <div className="registro">
      <p className="registro__rotulo">{rotulo}</p>
      <div className="chips" role="group" aria-label={rotulo}>
        <Pilula ativo={valor === ''} aoClicar={() => aoEscolher('')}>
          {`${rotuloTodos} (${total})`}
        </Pilula>
        {opcoes.map((opcao) => (
          <Pilula
            key={opcao.valor}
            ativo={valor === opcao.valor}
            aoClicar={() => aoEscolher(opcao.valor)}
          >
            {`${opcao.rotulo} (${opcao.total})`}
          </Pilula>
        ))}
      </div>
    </div>
  );
}

export function ListaEditais({ idioma, editais }: { idioma: Idioma; editais: Call[] }) {
  const t = textos(idioma);
  const [status, setStatus] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');

  const opcoesStatus = useMemo<Opcao[]>(
    () =>
      ORDEM_STATUS.map((valor) => ({
        valor,
        rotulo: t.comum.status[valor],
        total: editais.filter((edital) => edital.status === valor).length,
      })).filter((opcao) => opcao.total > 0),
    [editais, t],
  );

  const opcoesTipo = useMemo<Opcao[]>(
    () =>
      ORDEM_TIPO.map((valor) => ({
        valor,
        rotulo: t.comum.tiposEdital[valor],
        total: editais.filter((edital) => edital.tipo === valor).length,
      })).filter((opcao) => opcao.total > 0),
    [editais, t],
  );

  const filtrados = useMemo(
    () =>
      editais.filter(
        (edital) =>
          (status === '' || edital.status === status) && (tipo === '' || edital.tipo === tipo),
      ),
    [editais, status, tipo],
  );

  const temFiltro = status !== '' || tipo !== '';
  const limpar = () => {
    setStatus('');
    setTipo('');
  };

  /*
   * Sem nenhuma chamada publicada nao ha o que filtrar nem contar: a pagina
   * mostra o bloco SemChamadas no lugar desta lista. Com uma unica chamada,
   * filtro e contagem tambem nao acrescentam nada.
   */
  if (editais.length === 0) return null;
  if (editais.length === 1) {
    return (
      <div className="grade--2">
        <CartaoEdital idioma={idioma} edital={editais[0]} />
      </div>
    );
  }

  return (
    <>
      <section aria-label={t.editais.filtrosTitulo}>
        <LinhaFiltro
          rotulo={t.editais.filtroStatus}
          rotuloTodos={t.editais.todasSituacoes}
          total={editais.length}
          opcoes={opcoesStatus}
          valor={status}
          aoEscolher={setStatus}
        />
        <LinhaFiltro
          rotulo={t.editais.filtroTipo}
          rotuloTodos={t.editais.todosTipos}
          total={editais.length}
          opcoes={opcoesTipo}
          valor={tipo}
          aoEscolher={setTipo}
        />
      </section>

      <div className="barra-resultado">
        <p style={{ margin: 0 }} aria-live="polite">
          {`${filtrados.length} ${
            filtrados.length === 1 ? t.editais.contagemUma : t.editais.contagemVarias
          }`}
        </p>
        {temFiltro ? (
          <Botao variante="discreto" tamanho="pequeno" onClick={limpar}>
            {t.editais.limparFiltros}
          </Botao>
        ) : null}
      </div>

      {filtrados.length === 0 ? (
        <EstadoVazio
          titulo={t.editais.vazioTitulo}
          desenho="busca"
          acao={
            <Botao variante="secundario" tamanho="pequeno" onClick={limpar}>
              {t.editais.limparFiltros}
            </Botao>
          }
        />
      ) : (
        <div className="grade--2">
          {filtrados.map((edital) => (
            <CartaoEdital key={edital.slug} idioma={idioma} edital={edital} />
          ))}
        </div>
      )}
    </>
  );
}
