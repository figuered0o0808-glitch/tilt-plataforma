/**
 * Regras do acervo: busca, facetas, ordenacao e vizinhanca entre publicacoes.
 *
 * Sem estado e sem React, para que a lista e a pagina de um material usem o
 * mesmo criterio. As opcoes de filtro saem sempre do conteudo publicado: nada
 * aqui conhece um tema, uma organizacao ou um formato pelo nome.
 */
import type { Idioma } from '@/i18n/idiomas';
import type { Article, ArquivoMaterial } from '@/lib/types';

/** Campos que viram filtro. Todos sao texto livre vindo do conteudo. */
export type CampoFacetado = 'trilha' | 'tema' | 'organizacao' | 'formato';

export const CAMPOS_FACETADOS: readonly CampoFacetado[] = [
  'trilha',
  'tema',
  'organizacao',
  'formato',
];

export type Ordem = 'atualizacao' | 'titulo';

export type Selecao = Record<CampoFacetado, string>;

export const SELECAO_VAZIA: Selecao = {
  trilha: '',
  tema: '',
  organizacao: '',
  formato: '',
};

/** Uma opcao de filtro, com o total que ela ainda devolve. */
export interface Opcao {
  valor: string;
  rotulo: string;
  total: number;
}

/**
 * Minusculas e sem acento: quem procura "atencao" acha "atenção", e o mesmo
 * vale entre os tres idiomas. Comparacao por texto normalizado, nunca por
 * localeCompare, para que servidor e navegador ordenem igual.
 */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** Tudo que a busca varre em um material, ja normalizado. */
export function alvoDeBusca(material: Article): string {
  return normalizar(
    [
      material.titulo,
      material.resumo,
      material.organizacao,
      material.tema,
      material.formato,
      ...material.autoria,
      ...material.palavrasChave,
    ].join(' '),
  );
}

/** Termos separados por espaco, todos exigidos. */
export function termosDaBusca(consulta: string): string[] {
  return normalizar(consulta).split(/\s+/).filter(Boolean);
}

export function valorDoCampo(material: Article, campo: CampoFacetado): string {
  return material[campo];
}

/** Valores distintos de um campo, em ordem alfabetica estavel. */
export function valoresDistintos(materiais: Article[], campo: CampoFacetado): string[] {
  const vistos = new Set<string>();
  for (const material of materiais) {
    const valor = valorDoCampo(material, campo);
    if (valor) vistos.add(valor);
  }
  return [...vistos].sort((a, b) => (normalizar(a) < normalizar(b) ? -1 : 1));
}

/** Data mais recente primeiro; empate resolvido pelo titulo. */
export function ordenar(materiais: Article[], ordem: Ordem): Article[] {
  const lista = [...materiais];
  lista.sort((a, b) => {
    if (ordem === 'titulo') return normalizar(a.titulo) < normalizar(b.titulo) ? -1 : 1;
    if (a.atualizadoEm !== b.atualizadoEm) return a.atualizadoEm < b.atualizadoEm ? 1 : -1;
    return normalizar(a.titulo) < normalizar(b.titulo) ? -1 : 1;
  });
  return lista;
}

/**
 * Marca da organizacao quando ela nao envia logotipo: nome de uma palavra sai
 * inteiro, nome composto vira as iniciais. Nunca repete o titulo do material.
 */
export function siglaOrganizacao(nome: string): string {
  const palavras = nome.trim().split(/\s+/).filter((palavra) => palavra.length > 2);
  if (palavras.length <= 1) return nome.trim().slice(0, 14).toUpperCase();
  return palavras
    .slice(0, 4)
    .map((palavra) => palavra[0])
    .join('')
    .toUpperCase();
}

/** "2026-07-02" com o modelo do idioma: "2 de julho de 2026", "July 2, 2026". */
export function dataLonga(iso: string, modelo: string, meses: readonly string[]): string {
  const [ano, mes, dia] = iso.split('-');
  if (!ano || !mes || !dia) return iso;
  return modelo
    .replace('{dia}', String(Number(dia)))
    .replace('{mes}', meses[Number(mes) - 1] ?? mes)
    .replace('{ano}', ano);
}

/** "2026-07-02" com o modelo curto do idioma: "02/07/2026", "07/02/2026". */
export function dataCurta(iso: string, modelo: string): string {
  const [ano, mes, dia] = iso.split('-');
  if (!ano || !mes || !dia) return iso;
  return modelo.replace('{dia}', dia).replace('{mes}', mes).replace('{ano}', ano);
}

/**
 * O que ler depois: primeiro o resto da mesma organizacao, depois o mesmo tema
 * e, se nada disso existir, a mesma trilha. Uma publicacao nunca aparece duas
 * vezes na mesma faixa.
 */
export function vizinhanca(
  material: Article,
  todos: Article[],
  limite = 2,
): { organizacao: Article[]; tema: Article[]; trilha: Article[] } {
  const outros = ordenar(
    todos.filter((outro) => outro.slug !== material.slug),
    'atualizacao',
  );

  const organizacao = outros
    .filter((outro) => outro.organizacao === material.organizacao)
    .slice(0, limite);

  const usados = new Set(organizacao.map((outro) => outro.slug));
  const tema = outros
    .filter((outro) => !usados.has(outro.slug) && outro.tema === material.tema)
    .slice(0, limite);

  for (const outro of tema) usados.add(outro.slug);
  const trilha =
    organizacao.length + tema.length > 0
      ? []
      : outros.filter((outro) => outro.trilha === material.trilha).slice(0, limite);

  return { organizacao, tema, trilha };
}

/**
 * Codigo do idioma de um arquivo, lido do fim do nome: "-pt.pdf" devolve "pt".
 *
 * O JSON escreve o idioma por extenso e ja traduzido, o que serve de rotulo mas
 * nao serve de chave. Nome fora do padrao devolve string vazia e nao ordena
 * nada: uma publicacao com um arquivo so nunca depende disto.
 */
export function idiomaDoArquivo(caminho: string): string {
  return /-([a-z]{2})\.[a-z0-9]+$/i.exec(caminho)?.[1]?.toLowerCase() ?? '';
}

/**
 * O arquivo no idioma de quem le vem primeiro; os outros mantem a ordem
 * publicada. E o unico criterio que separa dois PDFs do mesmo texto.
 */
export function ordenarArquivos(
  arquivos: ArquivoMaterial[],
  idioma: Idioma,
): ArquivoMaterial[] {
  return [...arquivos].sort(
    (a, b) =>
      Number(idiomaDoArquivo(b.arquivo) === idioma) -
      Number(idiomaDoArquivo(a.arquivo) === idioma),
  );
}
