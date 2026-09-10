import { redirect } from 'next/navigation';

import { IDIOMA_PADRAO } from '@/i18n/idiomas';

/** A raiz nao tem conteudo proprio: manda para o idioma padrao. */
export default function Raiz() {
  redirect(`/${IDIOMA_PADRAO}`);
}
