'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Carrossel de uma coluna: um item por vez, e passa-se para o lado.
 *
 * O trilho e um rolo horizontal com encaixe (scroll-snap): no toque, arrasta;
 * no teclado, o foco que entra num item escondido o traz para a tela, porque
 * o navegador rola para o que ganha foco. As setas so rolam o trilho; o
 * contador le de onde ele parou. Nenhum estado alem do que o rolo ja tem.
 *
 * Sem laco: na ultima, a seta da frente apaga. Um carrossel que da a volta
 * esconde onde termina.
 */
export function Carrossel({
  itens,
  cabeca,
  rotulo,
  anterior,
  proximo,
  posicao,
}: {
  itens: ReactNode[];
  /** O que abre a coluna (marcador e rotulo); as setas entram ao lado. */
  cabeca: ReactNode;
  /** Nome do conjunto, para o leitor de tela. */
  rotulo: string;
  anterior: string;
  proximo: string;
  /** Modelo do contador: "{n} de {total}". */
  posicao: string;
}) {
  const trilho = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  /* Para onde a ultima seta mandou, enquanto o rolo ainda esta a caminho. */
  const pendente = useRef<number | null>(null);
  const total = itens.length;

  /* O item atual e o que esta sob a borda esquerda do trilho. */
  const ler = useCallback(() => {
    const el = trilho.current;
    if (!el || el.clientWidth === 0) return;
    const indice = Math.min(total - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth)));
    if (pendente.current !== null && Math.abs(el.scrollLeft - pendente.current * el.clientWidth) < 2) {
      pendente.current = null;
    }
    setAtual(indice);
  }, [total]);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    el.addEventListener('scroll', ler, { passive: true });
    window.addEventListener('resize', ler);
    return () => {
      el.removeEventListener('scroll', ler);
      window.removeEventListener('resize', ler);
    };
  }, [ler]);

  /*
   * Um passo a partir de onde a ultima seta mandou, e nao de onde o rolo esta:
   * duas setas em seguida, com o rolo ainda a caminho, contam dois passos.
   */
  function passo(delta: number) {
    const el = trilho.current;
    if (!el) return;
    const base = pendente.current ?? atual;
    const alvo = Math.min(total - 1, Math.max(0, base + delta));
    pendente.current = alvo;
    el.scrollTo({ left: alvo * el.clientWidth, behavior: 'smooth' });
  }

  const contador = posicao.replace('{n}', String(atual + 1)).replace('{total}', String(total));

  return (
    <>
      <div className="coluna__cabeca">
        {cabeca}
        {total > 1 ? (
          <div className="carrossel__nav">
            <span className="carrossel__contador" aria-live="polite">
              {contador}
            </span>
            <button
              type="button"
              className="carrossel__seta"
              onClick={() => passo(-1)}
              disabled={atual === 0}
              aria-label={anterior}
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              className="carrossel__seta"
              onClick={() => passo(1)}
              disabled={atual === total - 1}
              aria-label={proximo}
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        ) : null}
      </div>

      <div
        className="carrossel"
        ref={trilho}
        role="group"
        aria-roledescription="carrossel"
        aria-label={rotulo}
      >
        {itens.map((item, indice) => (
          <div
            key={indice}
            className="carrossel__item"
            role="group"
            aria-label={posicao.replace('{n}', String(indice + 1)).replace('{total}', String(total))}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}
