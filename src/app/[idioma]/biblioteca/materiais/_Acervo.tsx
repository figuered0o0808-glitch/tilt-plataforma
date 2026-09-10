'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { EstadoVazio } from '@/components/EstadoVazio';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import type { Article, Trilha } from '@/lib/types';

import { CartaoMaterial, rotuloTrilha } from './_CartaoMaterial';
import {
  CAMPOS_FACETADOS,
  SELECAO_VAZIA,
  alvoDeBusca,
  ordenar,
  termosDaBusca,
  valorDoCampo,
  valoresDistintos,
  type CampoFacetado,
  type Opcao,
  type Ordem,
  type Selecao,
} from './_regras';

/** Nome de cada filtro no endereco, para que uma busca possa ser enviada a alguem. */
const PARAMETRO: Record<CampoFacetado, string> = {
  trilha: 'trilha',
  tema: 'tema',
  organizacao: 'org',
  formato: 'formato',
};

/**
 * Pilula de filtro. Desabilitada quando a opcao nao devolveria nada, para que
 * nenhum clique leve a lista vazia. A pilula que desfaz o filtro (fixa) nunca
 * desabilita: e por ela que se volta.
 */
function Pilula({
  ativo,
  total,
  rotulo,
  fixa,
  aoClicar,
}: {
  ativo: boolean;
  total?: number;
  rotulo: string;
  fixa?: boolean;
  aoClicar: () => void;
}) {
  return (
    <button
      type="button"
      className="bib-pilula"
      aria-pressed={ativo}
      disabled={!fixa && total === 0 && !ativo}
      onClick={aoClicar}
    >
      {rotulo}
      {total === undefined ? null : <span className="bib-pilula__n">{total}</span>}
    </button>
  );
}

interface Grupo {
  campo: CampoFacetado;
  rotulo: string;
  opcoes: Opcao[];
  total: number;
}

/**
 * Acervo navegavel: busca por texto, filtros tirados do proprio conteudo,
 * ordenacao e contagem.
 *
 * As opcoes de cada filtro sao contadas contra os outros filtros ativos, de modo
 * que nenhuma combinacao clicavel leva a lista vazia. Filtro com uma unica opcao
 * nao aparece, e com um material so a pagina mostra apenas a contagem: e por
 * isso que a biblioteca ja se comporta como acervo tendo uma publicacao.
 */
export function Acervo({ idioma, materiais }: { idioma: Idioma; materiais: Article[] }) {
  const t = textos(idioma);
  const a = t.aprendizado.materiais.acervo;

  const [busca, setBusca] = useState('');
  const [selecao, setSelecao] = useState<Selecao>(SELECAO_VAZIA);
  const [ordem, setOrdem] = useState<Ordem>('atualizacao');
  const [lido, setLido] = useState(false);
  const campoBusca = useRef<HTMLInputElement>(null);

  /* O endereco carrega o estado da busca: um recorte do acervo pode ser enviado. */
  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    const vindo: Selecao = { ...SELECAO_VAZIA };
    for (const campo of CAMPOS_FACETADOS) {
      const valor = parametros.get(PARAMETRO[campo]) ?? '';
      if (valor && valoresDistintos(materiais, campo).includes(valor)) vindo[campo] = valor;
    }
    setSelecao(vindo);
    setBusca(parametros.get('busca') ?? '');
    if (parametros.get('ordem') === 'titulo') setOrdem('titulo');
    setLido(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lido) return;
    const parametros = new URLSearchParams();
    if (busca.trim()) parametros.set('busca', busca.trim());
    for (const campo of CAMPOS_FACETADOS) {
      if (selecao[campo]) parametros.set(PARAMETRO[campo], selecao[campo]);
    }
    if (ordem !== 'atualizacao') parametros.set('ordem', ordem);
    const consulta = parametros.toString();
    window.history.replaceState(
      null,
      '',
      consulta ? `${window.location.pathname}?${consulta}` : window.location.pathname,
    );
  }, [lido, busca, selecao, ordem]);

  /* Barra de espaco da ferramenta: a tecla / leva o cursor para a busca. */
  useEffect(() => {
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key !== '/' || evento.metaKey || evento.ctrlKey || evento.altKey) return;
      const alvo = evento.target as HTMLElement | null;
      const etiqueta = alvo?.tagName;
      if (etiqueta === 'INPUT' || etiqueta === 'TEXTAREA' || etiqueta === 'SELECT') return;
      if (alvo?.isContentEditable) return;
      evento.preventDefault();
      campoBusca.current?.focus();
    }
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, []);

  const itens = useMemo(
    () => materiais.map((material) => ({ material, alvo: alvoDeBusca(material) })),
    [materiais],
  );
  const termos = useMemo(() => termosDaBusca(busca), [busca]);
  const porBusca = useMemo(
    () => itens.filter((item) => termos.every((termo) => item.alvo.includes(termo))),
    [itens, termos],
  );

  const filtrados = useMemo(
    () =>
      ordenar(
        porBusca
          .filter((item) =>
            CAMPOS_FACETADOS.every(
              (campo) =>
                !selecao[campo] || valorDoCampo(item.material, campo) === selecao[campo],
            ),
          )
          .map((item) => item.material),
        ordem,
      ),
    [porBusca, selecao, ordem],
  );

  const grupos = useMemo<Grupo[]>(() => {
    function rotuloDoCampo(campo: CampoFacetado): string {
      if (campo === 'trilha') return a.filtroTrilha;
      if (campo === 'tema') return a.filtroTema;
      if (campo === 'organizacao') return a.filtroOrganizacao;
      return a.filtroFormato;
    }

    return CAMPOS_FACETADOS.map((campo) => {
      const valores = valoresDistintos(materiais, campo);
      /* Filtro de uma opcao so nao informa nada: fica de fora. */
      if (valores.length < 2) return null;

      const parciais = porBusca.filter((item) =>
        CAMPOS_FACETADOS.every(
          (outro) =>
            outro === campo || !selecao[outro] || valorDoCampo(item.material, outro) === selecao[outro],
        ),
      );

      return {
        campo,
        rotulo: rotuloDoCampo(campo),
        total: parciais.length,
        opcoes: valores.map((valor) => ({
          valor,
          rotulo: campo === 'trilha' ? rotuloTrilha(idioma, valor as Trilha) : valor,
          total: parciais.filter((item) => valorDoCampo(item.material, campo) === valor).length,
        })),
      };
    }).filter((grupo): grupo is Grupo => grupo !== null);
  }, [materiais, porBusca, selecao, idioma, a]);

  const total = materiais.length;
  const recortado =
    busca.trim() !== '' || CAMPOS_FACETADOS.some((campo) => selecao[campo] !== '');
  const temControles = total > 1;

  function escolher(campo: CampoFacetado, valor: string) {
    setSelecao((atual) => ({ ...atual, [campo]: atual[campo] === valor ? '' : valor }));
  }

  function limpar() {
    setBusca('');
    setSelecao(SELECAO_VAZIA);
  }

  return (
    <div className="pilha">
      {temControles ? (
        <div className="bib-controles">
          <div className="bib-busca">
            <input
              ref={campoBusca}
              type="search"
              value={busca}
              aria-label={a.busca}
              aria-keyshortcuts="/"
              placeholder={a.buscaDica}
              onChange={(evento) => setBusca(evento.target.value)}
            />
            <div className="bib-opcoes" role="group" aria-label={a.ordem}>
              <span className="bib-linha__rotulo" style={{ alignSelf: 'center' }}>
                {a.ordem}
              </span>
              <Pilula
                ativo={ordem === 'atualizacao'}
                rotulo={a.ordemAtualizacao}
                aoClicar={() => setOrdem('atualizacao')}
              />
              <Pilula
                ativo={ordem === 'titulo'}
                rotulo={a.ordemTitulo}
                aoClicar={() => setOrdem('titulo')}
              />
            </div>
          </div>

          {grupos.map((grupo) => (
            <div key={grupo.campo} className="bib-linha">
              <p className="bib-linha__rotulo">{grupo.rotulo}</p>
              <div className="bib-opcoes" role="group" aria-label={grupo.rotulo}>
                <Pilula
                  fixa
                  ativo={selecao[grupo.campo] === ''}
                  total={grupo.total}
                  rotulo={a.tudo}
                  aoClicar={() => escolher(grupo.campo, '')}
                />
                {grupo.opcoes.map((opcao) => (
                  <Pilula
                    key={opcao.valor}
                    ativo={selecao[grupo.campo] === opcao.valor}
                    total={opcao.total}
                    rotulo={opcao.rotulo}
                    aoClicar={() => escolher(grupo.campo, opcao.valor)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="bib-contagem">
        <p style={{ margin: 0 }} aria-live="polite">
          {recortado ? (
            <>
              <strong>{filtrados.length}</strong> {a.de} {total} {a.contagemVarios}
            </>
          ) : (
            <>
              <strong>{total}</strong> {total === 1 ? a.contagemUm : a.contagemVarios}
            </>
          )}
        </p>
        {recortado ? (
          <button type="button" className="bib-pilula" onClick={limpar}>
            {a.limpar}
          </button>
        ) : null}
      </div>

      {filtrados.length === 0 ? (
        <EstadoVazio
          titulo={t.comum.rotulos.nenhumResultado}
          desenho="busca"
          acao={
            <button type="button" className="bib-pilula" onClick={limpar}>
              {a.limpar}
            </button>
          }
        />
      ) : (
        /*
         * Coluna unica, e nao duas. O cartao ja e horizontal (capa a esquerda,
         * ficha a direita): em duas colunas ele fica estreito, a capa perde as
         * laterais no recorte e o titulo impresso nela some.
         */
        <div className="pilha">
          {filtrados.map((material) => (
            <CartaoMaterial key={material.slug} idioma={idioma} material={material} mostrarTrilha />
          ))}
        </div>
      )}
    </div>
  );
}
