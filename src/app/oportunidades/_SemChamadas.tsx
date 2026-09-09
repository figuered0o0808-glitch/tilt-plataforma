import type { CSSProperties } from 'react';

import { t } from '@/i18n/strings';

/**
 * Conteudo da aba enquanto nenhuma chamada esta publicada: a situacao, as
 * e o que da para preparar antes de a primeira chamada abrir.
 */
export function SemChamadas() {
  return (
    <>
      <div className="secao">
        <div className="container-estreito">
          <div
            className="cartao cartao--marcado"
            style={{ '--marca': 'var(--menta)' } as CSSProperties}
          >
            <h2 className="cartao__titulo">{t.editais.semChamadaTitulo}</h2>
            <p className="cartao__texto">{t.editais.semChamadaTexto}</p>
          </div>
        </div>
      </div>


      <div className="secao">
        <div className="container-estreito">
          <h2 style={{ marginBottom: 18 }}>{t.editais.prepararTitulo}</h2>
          <div className="cartao">
            <ul style={{ margin: 0 }}>
              {t.editais.prepararItens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
