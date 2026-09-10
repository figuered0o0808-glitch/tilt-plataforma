/**
 * Acesso tipado ao conteudo publicado, lido dos arquivos JSON em /data.
 * Ha uma pasta por idioma: o conteudo pode ser publicado em um idioma e nao
 * em outro, e cada idioma mostra apenas o que existe nele.
 * Nenhuma chamada de rede: o site inteiro e estatico.
 */
import type { Article, Call, Course, PanelData, Trilha } from '@/lib/types';
import type { Idioma } from '@/i18n/idiomas';

import ptCalls from '@data/pt/calls.json';
import ptCourses from '@data/pt/courses.json';
import ptArticles from '@data/pt/articles.json';
import ptPanel from '@data/pt/panel-data.json';

import enCalls from '@data/en/calls.json';
import enCourses from '@data/en/courses.json';
import enArticles from '@data/en/articles.json';
import enPanel from '@data/en/panel-data.json';

import esCalls from '@data/es/calls.json';
import esCourses from '@data/es/courses.json';
import esArticles from '@data/es/articles.json';
import esPanel from '@data/es/panel-data.json';

interface Conteudo {
  editais: Call[];
  cursos: Course[];
  materiais: Article[];
  painel: PanelData;
}

const CONTEUDO: Record<Idioma, Conteudo> = {
  pt: {
    editais: ptCalls as unknown as Call[],
    cursos: ptCourses as unknown as Course[],
    materiais: ptArticles as unknown as Article[],
    painel: ptPanel as unknown as PanelData,
  },
  en: {
    editais: enCalls as unknown as Call[],
    cursos: enCourses as unknown as Course[],
    materiais: enArticles as unknown as Article[],
    painel: enPanel as unknown as PanelData,
  },
  es: {
    editais: esCalls as unknown as Call[],
    cursos: esCourses as unknown as Course[],
    materiais: esArticles as unknown as Article[],
    painel: esPanel as unknown as PanelData,
  },
};

export function conteudo(idioma: Idioma): Conteudo {
  return CONTEUDO[idioma];
}

export function editalPorSlug(idioma: Idioma, slug: string): Call | undefined {
  return conteudo(idioma).editais.find((e) => e.slug === slug);
}

export function cursoPorSlug(idioma: Idioma, slug: string): Course | undefined {
  return conteudo(idioma).cursos.find((c) => c.slug === slug);
}

export function materialPorSlug(idioma: Idioma, slug: string): Article | undefined {
  return conteudo(idioma).materiais.find((m) => m.slug === slug);
}

export function materiaisDaTrilha(idioma: Idioma, trilha: Trilha): Article[] {
  return conteudo(idioma).materiais.filter((m) => m.trilha === trilha);
}
