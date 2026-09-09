'use client';

/**
 * Entrada da home, nos dois estados da pagina.
 *
 * Com chamada, curso ou material publicado, o caminho principal e o cadastro
 * (ou a area de trabalho, para quem ja tem). Enquanto nada foi publicado nao ha
 * a que se candidatar, entao os botoes levam ao que a pagina de fato tem: o
 * desenho do programa e as duas areas do site.
 */

import { Botao } from '@/components/Botao';
import { t } from '@/i18n/strings';
import { useApp } from '@/state/AppState';

export function Entrada({ temConteudo }: { temConteudo: boolean }) {
  const { cadastrado, hidratado } = useApp();
  const entrou = hidratado && cadastrado;

  if (!temConteudo) {
    return (
      <div className="pilha" style={{ gap: 14, marginTop: 30, alignItems: 'flex-start' }}>
        <div className="linha" style={{ gap: 18 }}>
          <Botao href="#desenho">{t.home.inicioAcao}</Botao>
          <Botao href="#areas" variante="discreto">
            {t.home.inicioAcaoAreas}
          </Botao>
        </div>
        <p className="texto-mini" style={{ margin: 0 }}>
          {t.home.inicioNota}
        </p>
      </div>
    );
  }

  return (
    <div className="pilha" style={{ gap: 14, marginTop: 30, alignItems: 'flex-start' }}>
      <div className="linha" style={{ gap: 18 }}>
        <Botao href={entrou ? '/painel' : '/cadastro'}>
          {entrou ? t.home.entrarPainel : t.home.entrarPrincipal}
        </Botao>
        <Botao href="/oportunidades" variante="discreto">
          {t.home.entrarSecundario}
        </Botao>
      </div>
      {entrou ? null : (
        <p className="texto-mini" style={{ margin: 0 }}>
          {t.home.entrarNota}
        </p>
      )}
    </div>
  );
}
