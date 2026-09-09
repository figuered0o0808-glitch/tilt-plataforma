/**
 * Acesso tipado ao conteudo publicado, lido dos arquivos JSON em /data.
 * Nenhuma chamada de rede: o site inteiro e estatico.
 */
import type { Article, Call, Course, PanelData, Trilha } from '@/lib/types';

import articlesJson from '@data/articles.json';
import callsJson from '@data/calls.json';
import coursesJson from '@data/courses.json';
import panelJson from '@data/panel-data.json';

export const editais = callsJson as unknown as Call[];
export const cursos = coursesJson as unknown as Course[];
export const materiais = articlesJson as unknown as Article[];
export const painel = panelJson as unknown as PanelData;

export function editalPorSlug(slug: string): Call | undefined {
  return editais.find((e) => e.slug === slug);
}

export function cursoPorSlug(slug: string): Course | undefined {
  return cursos.find((c) => c.slug === slug);
}

export function materialPorSlug(slug: string): Article | undefined {
  return materiais.find((m) => m.slug === slug);
}

export function materiaisDaTrilha(trilha: Trilha): Article[] {
  return materiais.filter((m) => m.trilha === trilha);
}
