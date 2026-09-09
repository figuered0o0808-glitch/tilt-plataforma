import { t } from '@/i18n/strings';

/** Bloco fixo de autonomia editorial. Texto obrigatorio em toda pagina de edital. */
export function BlocoAutonomia() {
  return (
    <aside className="destaque" aria-label={t.comum.autonomia.titulo}>
      <p className="destaque__titulo">{t.comum.autonomia.titulo}</p>
      <p className="destaque__texto">{t.comum.autonomia.texto}</p>
    </aside>
  );
}
