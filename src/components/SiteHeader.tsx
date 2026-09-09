'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Faixas } from '@/components/Faixas';
import { LogoTilt } from '@/components/LogoTilt';
import { PROGRAM_NAME } from '@/config/program';
import { t } from '@/i18n/strings';
import { cursos, editais, materiais } from '@/lib/data';
import { useApp } from '@/state/AppState';

const ABAS = [
  { href: '/oportunidades', rotulo: t.comum.navegacao.editais },
  { href: '/biblioteca', rotulo: t.comum.navegacao.biblioteca },
];

/**
 * Enquanto o programa nao publica o primeiro ciclo, nao ha o que o cadastro
 * desbloqueie: o cabecalho fica sem chamada para acao.
 */
const TEM_CONTEUDO = editais.length > 0 || cursos.length > 0 || materiais.length > 0;

export function SiteHeader() {
  const caminho = usePathname();
  const { cadastrado, hidratado } = useApp();

  function atual(href: string) {
    return caminho === href || caminho.startsWith(`${href}/`) ? 'page' : undefined;
  }

  return (
    <>
      <header className="cabecalho">
        <div className="container cabecalho__interno">
          <Link href="/" className="cabecalho__marca" aria-label={PROGRAM_NAME}>
            <LogoTilt altura={24} />
          </Link>

          <nav className="cabecalho__nav" aria-label="Navegação principal">
            {ABAS.map((aba) => (
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
            {!TEM_CONTEUDO ? null : hidratado && cadastrado ? (
              <Link href="/painel" className="btn btn--secundario btn--pequeno">
                {t.comum.navegacao.painel}
              </Link>
            ) : (
              <Link href="/cadastro" className="btn btn--primario btn--pequeno">
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
