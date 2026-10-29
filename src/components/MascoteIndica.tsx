'use client';

import { useEffect, useRef, useState } from 'react';
import type { Idioma } from '@/i18n/idiomas';
import { arquivoPublico } from '@/lib/format';

const TEXTOS = {
  pt: { play: 'Rever a animação da INDICA', pause: 'Pausar animação', resume: 'Continuar animação', expression: 'Mudar a expressão da carinha', caption: 'Uma rede com muitas formas de criar.' },
  en: { play: 'Replay the INDICA animation', pause: 'Pause animation', resume: 'Resume animation', expression: 'Change the character’s expression', caption: 'A network with many ways to create.' },
  es: { play: 'Repetir la animación de INDICA', pause: 'Pausar animación', resume: 'Continuar animación', expression: 'Cambiar la expresión del personaje', caption: 'Una red con muchas formas de crear.' },
};

/** A animação toca uma vez; a pessoa pode pausar, repetir ou trocar a expressão. */
export function MascoteIndica({ idioma }: { idioma: Idioma }) {
  const video = useRef<HTMLVideoElement>(null);
  const area = useRef<HTMLElement>(null);
  const [estado, setEstado] = useState<'still' | 'playing' | 'paused'>('still');
  const [expressao, setExpressao] = useState(1);
  const t = TEXTOS[idioma];
  const emVideo = estado !== 'still';

  async function reproduzir(reiniciar = true) {
    const el = video.current;
    if (!el) return;
    if (reiniciar) el.currentTime = 0;
    el.muted = true;
    try { await el.play(); setEstado('playing'); } catch { setEstado('still'); }
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respeitarPreferencia = () => {
      if (media.matches) { video.current?.pause(); setEstado('still'); }
    };
    media.addEventListener('change', respeitarPreferencia);
    const alvo = area.current;
    if (media.matches || !alvo) return () => media.removeEventListener('change', respeitarPreferencia);
    if (typeof IntersectionObserver === 'undefined') {
      void reproduzir();
      return () => media.removeEventListener('change', respeitarPreferencia);
    }
    const observer = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return;
      observer.disconnect();
      void reproduzir();
    }, { threshold: 0.35 });
    observer.observe(alvo);
    return () => { observer.disconnect(); media.removeEventListener('change', respeitarPreferencia); };
    // A abertura ocorre só na montagem, depois de conferir a preferência de movimento.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pausar() {
    video.current?.pause();
    setEstado('paused');
  }

  function mudarExpressao() {
    video.current?.pause();
    setEstado('still');
    setExpressao((atual) => atual % 3 + 1);
  }

  return (
    <figure className="mascote-indica" ref={area} data-estado={estado}>
      <div className="mascote-indica__palco">
        <button className="mascote-indica__rosto" type="button" onClick={mudarExpressao}
          aria-label={t.expression} tabIndex={emVideo ? -1 : 0} aria-hidden={emVideo || undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={expressao} src={arquivoPublico(`/marca/rostos/rosto-0${expressao}.png`)} alt="" width="400" height="400" />
        </button>
        <video ref={video} className="mascote-indica__video" muted playsInline preload="none"
          aria-hidden="true" tabIndex={-1} onEnded={() => setEstado('still')}
          onError={() => setEstado('still')}>
          <source src={arquivoPublico('/marca/indica-motion.mp4')} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mascote-indica__pe">
        <span>{t.caption}</span>
        <button type="button" className="mascote-indica__controle"
          onClick={() => estado === 'playing' ? pausar() : void reproduzir(estado !== 'paused')}
          aria-label={estado === 'playing' ? t.pause : estado === 'paused' ? t.resume : t.play}
          title={estado === 'playing' ? t.pause : estado === 'paused' ? t.resume : t.play}>
          {estado === 'playing' ? <span aria-hidden="true">Ⅱ</span> : <span aria-hidden="true">↻</span>}
        </button>
      </figcaption>
    </figure>
  );
}
