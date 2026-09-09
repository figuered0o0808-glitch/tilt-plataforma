import type { CSSProperties } from 'react';

import { t } from '@/i18n/strings';

/**
 * Conteudo da aba enquanto nenhuma chamada esta publicada: a situacao, as
 * condicoes de autonomia editorial que ja valem e o que da para preparar antes.
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

      <section className="secao secao--preto">
        <div className="container-estreito">
          <h2 style={{ marginBottom: 18 }}>{t.comum.autonomia.titulo}</h2>
          <p style={{ margin: 0, fontSize: '1.06rem', lineHeight: 1.6 }}>
            {t.comum.autonomia.texto}
          </p>
          <p className="texto-pequeno" style={{ margin: '16px 0 0' }}>
            {t.editais.autonomiaEscopo}
          </p>
        </div>
      </section>

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
