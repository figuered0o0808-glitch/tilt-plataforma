'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CarinhaIndica, type ExpressaoCarinhaIndica, type CorCarinhaIndica } from '@/components/CarinhaIndica';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { arquivoPublico } from '@/lib/format';
import { rota } from '@/lib/rotas';
import { useApp } from '@/state/AppState';

type Caminho = 'oportunidades' | 'cadastro' | 'biblioteca';

/** A expressão acompanha o caminho em foco; a navegação nunca depende dela. */
export function MascoteIndica({ idioma, edital, aceitaCadastro = false }: { idioma: Idioma; edital?: { slug: string }; aceitaCadastro?: boolean }) {
  const area = useRef<HTMLElement>(null);
  const [entrada, setEntrada] = useState(false);
  const [ponteiro, setPonteiro] = useState<Caminho | null>(null);
  const [foco, setFoco] = useState<Caminho | null>(null);
  const ativo = ponteiro ?? foco ?? 'neutro';
  const { cadastrado, hidratado } = useApp();
  const t = textos(idioma).home.caminhos;
  const entrou = hidratado && cadastrado;
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let encerrado = false;
    let visivel = false;
    let imagensProntas = false;
    const iniciar = () => { if (!encerrado && visivel && imagensProntas) setEntrada(true); };
    const imagens = ['01', '02', '03'].map((expressao) => {
      const img = new Image();
      img.src = arquivoPublico(`/marca/rostos/rosto-${expressao}.png`);
      return img.decode().catch(() => undefined);
    });
    void Promise.all(imagens).then(() => { imagensProntas = true; iniciar(); });
    if (!area.current || typeof IntersectionObserver === 'undefined') {
      visivel = true;
      return () => { encerrado = true; };
    }
    const observer = new IntersectionObserver(([item]) => {
      if (!item.isIntersecting) return;
      visivel = true;
      observer.disconnect();
      iniciar();
    }, { threshold: 0.25 });
    observer.observe(area.current);
    return () => { encerrado = true; observer.disconnect(); };
  }, []);
  const caminhos: { id: Caminho; titulo: string; descricao: string; destino: string; expressao: ExpressaoCarinhaIndica; cor: CorCarinhaIndica }[] = [
    { id: 'oportunidades', titulo: t.oportunidades, descricao: t.oportunidadesTexto, destino: 'oportunidades', expressao: '03', cor: 'azul' },
    { id: 'cadastro', titulo: entrou ? t.painel : aceitaCadastro ? t.cadastro : t.edital, descricao: entrou ? t.painelTexto : aceitaCadastro ? t.cadastroTexto : t.editalTexto, destino: entrou ? 'painel' : aceitaCadastro ? 'cadastro' : edital ? `oportunidades/${edital.slug}` : 'oportunidades', expressao: '01', cor: 'verde' },
    { id: 'biblioteca', titulo: t.biblioteca, descricao: t.bibliotecaTexto, destino: 'biblioteca', expressao: '02', cor: 'rosa' },
  ];

  return (
    <nav ref={area} className="indica-caminhos" aria-label={t.rotulo} data-ativo={ativo}
      onPointerLeave={() => setPonteiro(null)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFoco(null); }}>
      <div className="indica-caminhos__links">
        {caminhos.map((caminho, indice) => (
          <Link key={caminho.id} href={rota(idioma, caminho.destino)}
            className="indica-caminhos__link" data-caminho={caminho.id}
            onPointerEnter={(e) => { if (e.pointerType !== 'touch') { setPonteiro(caminho.id); setFoco(null); } }}
            onFocus={() => { setFoco(caminho.id); setPonteiro(null); }}>
            <span className="indica-caminhos__carinha">
              <CarinhaIndica expressao={caminho.expressao} cor={caminho.cor} entrada={entrada} marca={ativo === caminho.id}
                estado={ativo === caminho.id ? caminho.id : 'neutro'} />
            </span>
            <span className="indica-caminhos__numero" aria-hidden="true">0{indice + 1}</span>
            <span className="indica-caminhos__conteudo">
              <span className="indica-caminhos__titulo">{caminho.titulo}</span>
              <span className="indica-caminhos__descricao">{caminho.descricao}</span>
            </span>
            <span className="indica-caminhos__seta" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
