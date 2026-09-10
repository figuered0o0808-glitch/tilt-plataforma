'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Faixas } from '@/components/Faixas';
import { LogoTilt } from '@/components/LogoTilt';
import { SeletorIdioma } from '@/components/SeletorIdioma';
import { PROGRAM_NAME } from '@/config/program';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { rota } from '@/lib/rotas';
import { useApp } from '@/state/AppState';

export function SiteHeader({ idioma }: { idioma: Idioma }) {
  const caminho = usePathname();
  const { cadastrado, hidratado } = useApp();
  const t = textos(idioma);

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
    <>
      <header className="cabecalho">
        <div className="container cabecalho__interno">
          <Link href={rota(idioma)} className="cabecalho__marca" aria-label={PROGRAM_NAME}>
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
      <Faixas altura="fina" />
    </>
  );
}
