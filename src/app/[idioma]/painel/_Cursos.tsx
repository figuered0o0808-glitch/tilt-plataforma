'use client';

/**
 * Cursos do painel: os que ja vem registrados em /data mais os que
 * receberam inscricao neste navegador, cruzados com o catalogo de
 * @/lib/data. So e montado com o cadastro aberto.
 */

import Link from 'next/link';

import { Botao } from '@/components/Botao';
import { EstadoVazio } from '@/components/EstadoVazio';
import { Selo } from '@/components/Selo';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import type { CursoDoCriador } from '@/lib/types';

import { BarraProgresso } from './_PainelUI';

export interface CursoDoPainel extends CursoDoCriador {
  duracao: string;
  modulos: number;
  /** Inscricao feita aqui, que por enquanto so existe neste navegador. */
  inscricaoLocal: boolean;
}

/** Junta os cursos registrados em /data com as inscricoes deste navegador. */
export function cursosDoPainel(idioma: Idioma, cursosInscritos: string[]): CursoDoPainel[] {
  const { cursos, painel } = conteudo(idioma);
  const catalogo = new Map(cursos.map((curso) => [curso.slug, curso]));

  const linhas: CursoDoPainel[] = painel.cursos.map((curso) => {
    const doCatalogo = catalogo.get(curso.cursoSlug);
    return {
      ...curso,
      duracao: doCatalogo?.duracao ?? '',
      modulos: doCatalogo?.modulos.length ?? 0,
      inscricaoLocal: false,
    };
  });

  cursosInscritos.forEach((slug) => {
    const doCatalogo = catalogo.get(slug);
    if (!doCatalogo) return;
    if (linhas.some((linha) => linha.cursoSlug === slug)) return;
    linhas.push({
      cursoSlug: slug,
      titulo: doCatalogo.titulo,
      status: 'inscrito',
      progresso: 0,
      duracao: doCatalogo.duracao,
      modulos: doCatalogo.modulos.length,
      inscricaoLocal: true,
    });
  });

  return linhas;
}

export function Cursos({ idioma, linhas }: { idioma: Idioma; linhas: CursoDoPainel[] }) {
  const s = textos(idioma).paineis;
  if (linhas.length === 0) {
    return (
      <EstadoVazio
        desenho="lista"
        titulo={s.cursosVazio}
        acao={
          <Botao href="/biblioteca" variante="secundario" tamanho="pequeno">
            {s.verBiblioteca}
          </Botao>
        }
      />
    );
  }

  return (
    <div className={linhas.length >= 3 ? 'grade--3' : 'grade--2'}>
      {linhas.map((linha) => (
        <article key={linha.cursoSlug} className="cartao">
          <div className="linha linha--fim" style={{ alignItems: 'flex-start' }}>
            <h3 className="cartao__titulo" style={{ maxWidth: '18rem' }}>
              {linha.titulo}
            </h3>
            <Selo idioma={idioma} status={linha.status} />
          </div>

          <BarraProgresso valor={linha.progresso} rotulo={s.cursoProgresso} />

          {linha.inscricaoLocal ? <p className="nota">{s.cursoInscricaoLocal}</p> : null}

          <div className="cartao__rodape">
            <span className="texto-mini">
              {[linha.duracao, linha.modulos ? `${linha.modulos} ${s.cursoModulos}` : '']
                .filter(Boolean)
                .join(' | ')}
            </span>
            <Link href={`/biblioteca/cursos/${linha.cursoSlug}`} className="link-seta">
              {textos(idioma).comum.acoes.verCurso}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
