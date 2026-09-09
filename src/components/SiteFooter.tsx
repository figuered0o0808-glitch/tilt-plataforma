import Link from 'next/link';

import { Faixas } from '@/components/Faixas';
import { LogoTilt } from '@/components/LogoTilt';
import { PROGRAM_NAME, PROGRAM_TAGLINE } from '@/config/program';
import { t } from '@/i18n/strings';

export function SiteFooter() {
  return (
    <>
      <Faixas altura="normal" invertido />
      <footer className="rodape">
        <div className="container">
          <div className="rodape__grade">
            <div>
              <p style={{ margin: '0 0 12px' }}>
                <LogoTilt altura={26} rotulo={PROGRAM_NAME} />
              </p>
              <p className="rotulo" style={{ marginBottom: 14 }}>
                {PROGRAM_TAGLINE}
              </p>
              <p className="texto-pequeno" style={{ maxWidth: '40ch' }}>
                {t.comum.rodape.descricao}
              </p>
            </div>
            <div>
              <p className="rodape__titulo">{t.comum.rodape.navegue}</p>
              <ul className="rodape__lista">
                <li>
                  <Link href="/oportunidades">{t.comum.navegacao.editais}</Link>
                </li>
                <li>
                  <Link href="/biblioteca">{t.comum.navegacao.biblioteca}</Link>
                </li>
                <li>
                  <Link href="/cadastro">{t.cadastro.entrar}</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="rodape__titulo">{t.comum.rodape.programa}</p>
              <ul className="rodape__lista">
                <li>INDICA</li>
                <li>TILT</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
