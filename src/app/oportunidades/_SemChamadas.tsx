import { BlocoAutonomia } from '@/components/BlocoAutonomia';
import { t } from '@/i18n/strings';

/**
 * Conteudo da aba enquanto nenhuma chamada esta publicada. Diz o que ainda
 * nao existe, o que uma chamada traz quando entra no ar, o que ja vale desde
 * agora e o que da para preparar antes.
 */
export function SemChamadas() {
  return (
    <>
      <section className="secao secao--curta secao--menta" style={{ marginTop: 48 }}>
        <div className="container">
          <p className="olho" style={{ margin: '0 0 18px' }}>
            {t.editais.semChamadaOlho}
          </p>
          <div className="grade--2" style={{ gap: 44, alignItems: 'end' }}>
            <h2 style={{ margin: 0 }}>{t.editais.semChamadaTitulo}</h2>
            <p style={{ margin: 0, fontSize: '1.08rem', lineHeight: 1.6, maxWidth: '48ch' }}>
              {t.editais.semChamadaTexto}
            </p>
          </div>
        </div>
      </section>

      <div className="secao">
        <div className="container">
          <div className="pilha--g">
            <section>
              <h2 style={{ marginBottom: 18 }}>{t.editais.chamadaTrazTitulo}</h2>
              <div>
                {t.editais.chamadaTraz.map((item) => (
                  <div className="registro" key={item.rotulo}>
                    <p className="registro__rotulo">{item.rotulo}</p>
                    <p style={{ margin: 0, maxWidth: '62ch' }}>{item.texto}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 style={{ marginBottom: 10 }}>{t.editais.autonomiaValeTitulo}</h2>
              <p className="texto-pequeno" style={{ margin: '0 0 22px', maxWidth: '62ch' }}>
                {t.editais.autonomiaValeTexto}
              </p>
              <BlocoAutonomia />
            </section>

            <section>
              <h2 style={{ marginBottom: 10 }}>{t.editais.prepararTitulo}</h2>
              <p className="texto-pequeno" style={{ margin: '0 0 22px', maxWidth: '62ch' }}>
                {t.editais.prepararTexto}
              </p>
              <div className="cartao" style={{ maxWidth: '62ch' }}>
                <ul style={{ margin: 0 }}>
                  {t.editais.prepararItens.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
