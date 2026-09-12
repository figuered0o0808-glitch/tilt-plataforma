'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { LogoTilt } from '@/components/LogoTilt';
import { SeletorIdioma } from '@/components/SeletorIdioma';
import { PROGRAM_NAME } from '@/config/program';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { rota } from '@/lib/rotas';
import { useApp } from '@/state/AppState';

/**
 * O que o cabecalho observa na home e a MARCA animada (.enxame), e nao a secao
 * do hero. A regra e "nunca duas marcas na tela, nunca nenhuma": enquanto a
 * grande estiver visivel, a pequena fica escondida; assim que a grande sai por
 * cima, a pequena entra. Observar a secao inteira falhava no desktop, porque a
 * pagina e curta e o hero nunca sai de vista por completo, e o logotipo do
 * cabecalho nunca aparecia.
 *
 * querySelector com lista devolve o PRIMEIRO elemento do documento que casa
 * com qualquer seletor, e nao respeita a ordem da lista: por isso a busca e em
 * duas etapas, e nao numa lista so.
 */
const SELETORES_DA_MARCA = ['.enxame', '[data-hero]', '.hero'];

function marcaDaHome(): Element | null {
  for (const seletor of SELETORES_DA_MARCA) {
    const alvo = document.querySelector(seletor);
    if (alvo) return alvo;
  }
  return null;
}

export function SiteHeader({
  idioma,
  marcaNoCabecalho,
}: {
  idioma: Idioma;
  /**
   * Com `false`, o logotipo do cabecalho so aparece depois que a pessoa rola
   * alem do hero: na home a marca se forma no meio da tela, e duas seriam uma
   * a mais. Sem valor, vale `true` em toda pagina interna e `false` na home,
   * que e o unico lugar em que a marca entra pelo meio.
   */
  marcaNoCabecalho?: boolean;
}) {
  const caminho = usePathname();
  const { cadastrado, hidratado } = useApp();
  const t = textos(idioma);

  const inicio = rota(idioma);
  const ehHome = caminho === inicio || caminho === `${inicio}/`;
  const marcaFixa = marcaNoCabecalho ?? !ehHome;

  /*
   * O estado inicial e o mesmo no servidor e no navegador: fixa quando a
   * pagina pede, escondida quando nao. So o efeito, que roda no cliente,
   * observa a rolagem e muda isso.
   */
  const [marcaVisivel, setMarcaVisivel] = useState(marcaFixa);
  const cabecalhoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (marcaFixa) {
      setMarcaVisivel(true);
      return;
    }

    const hero = marcaDaHome();
    if (!hero || typeof IntersectionObserver === 'undefined') {
      // Sem hero para observar, esconder seria esconder para sempre.
      setMarcaVisivel(true);
      return;
    }

    setMarcaVisivel(false);
    const alturaCabecalho = cabecalhoRef.current?.offsetHeight ?? 0;
    const observador = new IntersectionObserver(
      ([entrada]) => setMarcaVisivel(!entrada.isIntersecting),
      // O cabecalho cobre o topo da tela: o hero so "saiu" quando passou por baixo dele.
      { rootMargin: `-${alturaCabecalho}px 0px 0px 0px`, threshold: 0 },
    );
    observador.observe(hero);
    return () => observador.disconnect();
  }, [marcaFixa, caminho]);

  const { editais, cursos, materiais } = conteudo(idioma);
  const temConteudo = editais.length > 0 || cursos.length > 0 || materiais.length > 0;

  const abas = [
    { href: rota(idioma, 'oportunidades'), rotulo: t.comum.navegacao.editais },
    { href: rota(idioma, 'biblioteca'), rotulo: t.comum.navegacao.biblioteca },
  ];

  function atual(href: string) {
    return caminho === href || caminho.startsWith(`${href}/`) ? 'page' : undefined;
  }

  return (
    <header className="cabecalho" ref={cabecalhoRef}>
      <div className="container cabecalho__interno">
        <Link
          href={inicio}
          className={marcaVisivel ? 'cabecalho__marca' : 'cabecalho__marca cabecalho__marca--oculta'}
          aria-label={PROGRAM_NAME}
          aria-hidden={marcaVisivel ? undefined : true}
          tabIndex={marcaVisivel ? undefined : -1}
        >
          <LogoTilt altura={24} />
        </Link>

        <nav className="cabecalho__nav" aria-label={t.comum.navegacao.principal}>
          {abas.map((aba) => (
            <Link
              key={aba.href}
              href={aba.href}
              className="cabecalho__link"
              aria-current={atual(aba.href)}
            >
              {aba.rotulo}
            </Link>
          ))}
        </nav>

        <div className="cabecalho__acoes">
          <SeletorIdioma />
          {!temConteudo ? null : hidratado && cadastrado ? (
            <Link href={rota(idioma, 'painel')} className="btn btn--secundario btn--pequeno">
              {t.comum.navegacao.painel}
            </Link>
          ) : (
            <Link href={rota(idioma, 'cadastro')} className="btn btn--primario btn--pequeno">
              {t.cadastro.entrar}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
