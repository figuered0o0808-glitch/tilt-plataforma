/**
 * Configuracao do programa.
 *
 * Para renomear a plataforma inteira, troque apenas estas constantes.
 */
export const PROGRAM_NAME = 'TILT';

/** Expansao do nome: T.I.L.T. */
export const PROGRAM_TAGLINE = 'The influencer lab for tomorrow';

/** Organizacoes executoras. */
export const EXECUTORAS = {
  indica: 'INDICA',
  tilt: 'TILT',
} as const;

/**
 * Data de referencia usada ao registrar acoes no navegador, no lugar do
 * relogio, para que a exportacao estatica seja deterministica.
 */
export const DATA_REFERENCIA = '2026-10-14';

/** Chave de persistência local (opcional: nada quebra sem localStorage). */
export const STORAGE_KEY = 'tilt:v1';
