import Link from 'next/link';

import { Faixas } from '@/components/Faixas';
import { LogoTilt } from '@/components/LogoTilt';
import { PROGRAM_NAME, PROGRAM_TAGLINE } from '@/config/program';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { rota } from '@/lib/rotas';

export function SiteFooter({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma);

  return (
    <>
      <Faixas altura="normal" invertido />
      <footer className="rodape">
        <div className="container">
          <div className="rodape__grade">
            <div>
              <p className="rodape__marca">
                <LogoTilt altura={26} rotulo={PROGRAM_NAME} />
              </p>
              <p className="rotulo rodape__tagline">{PROGRAM_TAGLINE}</p>
              <p className="texto-pequeno rodape__descricao">{t.comum.rodape.descricao}</p>
            </div>
            <div>
              <p className="rodape__titulo">{t.comum.rodape.navegue}</p>
              <ul className="rodape__lista">
                <li>
                  <Link href={rota(idioma, 'oportunidades')}>{t.comum.navegacao.editais}</Link>
                </li>
                <li>
                  <Link href={rota(idioma, 'biblioteca')}>{t.comum.navegacao.biblioteca}</Link>
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
