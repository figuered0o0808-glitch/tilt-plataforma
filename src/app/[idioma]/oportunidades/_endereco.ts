/**
 * Endereco publico de uma chamada.
 *
 * Montado sem o navegador: o bloco de compartilhamento precisa trazer o
 * endereco escrito no HTML estatico, antes de qualquer script rodar. Depois
 * de montar, o componente troca pelo endereco real da barra de enderecos,
 * que e o que vale quando o site ganhar dominio proprio.
 */
import type { Idioma } from '@/i18n/idiomas';
import { rota } from '@/lib/rotas';

/** Origem do site publicado. Ao apontar um dominio proprio, troque aqui. */
export const ORIGEM = 'https://figuered0o0808-glitch.github.io';

export function enderecoDaChamada(idioma: Idioma, slug: string): string {
  const base = process.env.BASE_PATH ?? '';
  return `${ORIGEM}${base}${rota(idioma, `oportunidades/${slug}`)}/`;
}
