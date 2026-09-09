/** Formatadores. Deterministas: nada depende do relogio nem do fuso. */

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/** 42000 -> "R$ 42.000" */
export function moeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(valor);
}

/** 1250000 -> "1,2 mi" | 480000 -> "480 mil" | 8200 -> "8,2 mil" */
export function seguidores(total: number): string {
  if (total >= 1_000_000) {
    const v = total / 1_000_000;
    return `${v.toFixed(v >= 10 ? 0 : 1).replace('.', ',')} mi`;
  }
  if (total >= 1_000) {
    const v = total / 1_000;
    return `${v.toFixed(v >= 100 ? 0 : 1).replace('.', ',').replace(',0', '')} mil`;
  }
  return numero(total);
}

/** 1250000 -> "1.250.000" */
export function numero(valor: number): string {
  return new Intl.NumberFormat('pt-BR').format(valor);
}

/** "2026-03-12" -> "12 de março de 2026" */
export function data(iso: string): string {
  const [ano, mes, dia] = iso.split('-').map(Number);
  if (!ano || !mes || !dia) return iso;
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}

/** "2026-03-12" -> "12/03/2026" */
export function dataCurta(iso: string): string {
  const [ano, mes, dia] = iso.split('-');
  if (!ano || !mes || !dia) return iso;
  return `${dia}/${mes}/${ano}`;
}

/** Iniciais para avatares: "Ana Beatriz Quirino" -> "AQ" */
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter((p) => p.length > 2);
  if (partes.length === 0) return nome.slice(0, 2).toUpperCase();
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

/** Identificador estavel sem depender de relogio nem de aleatoriedade. */
export function proximoId(prefixo: string, existentes: { id: string }[]): string {
  const numeros = existentes
    .map((item) => Number(item.id.replace(/\D/g, '')))
    .filter((n) => Number.isFinite(n));
  const proximo = (numeros.length ? Math.max(...numeros) : 0) + 1;
  return `${prefixo}-${String(proximo).padStart(3, '0')}`;
}
