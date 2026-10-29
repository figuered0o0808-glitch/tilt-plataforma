'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CarinhaIndica } from '@/components/CarinhaIndica';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { rota } from '@/lib/rotas';
import { useApp } from '@/state/AppState';

type Caminho = 'oportunidades' | 'cadastro' | 'biblioteca';

/** A expressão acompanha o caminho em foco; a navegação nunca depende dela. */
export function MascoteIndica({ idioma }: { idioma: Idioma }) {
  const [ponteiro, setPonteiro] = useState<Caminho | null>(null);
  const [foco, setFoco] = useState<Caminho | null>(null);
  const ativo = ponteiro ?? foco ?? 'neutro';
  const { cadastrado, hidratado } = useApp();
  const t = textos(idioma).home.caminhos;
  const entrou = hidratado && cadastrado;
  const caminhos: { id: Caminho; titulo: string; descricao: string; destino: string }[] = [
    { id: 'oportunidades', titulo: t.oportunidades, descricao: t.oportunidadesTexto, destino: 'oportunidades' },
    { id: 'cadastro', titulo: entrou ? t.painel : t.cadastro, descricao: entrou ? t.painelTexto : t.cadastroTexto, destino: entrou ? 'painel' : 'cadastro' },
    { id: 'biblioteca', titulo: t.biblioteca, descricao: t.bibliotecaTexto, destino: 'biblioteca' },
  ];

  return (
    <nav className="indica-caminhos" aria-label={t.rotulo} data-ativo={ativo}
      onPointerLeave={() => setPonteiro(null)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFoco(null); }}>
      <div className="indica-caminhos__carinha">
        <CarinhaIndica estado={ativo} />
      </div>
      <div className="indica-caminhos__links">
        {caminhos.map((caminho, indice) => (
          <Link key={caminho.id} href={rota(idioma, caminho.destino)}
            className="indica-caminhos__link" data-caminho={caminho.id}
            onPointerEnter={(e) => { if (e.pointerType !== 'touch') setPonteiro(caminho.id); }}
            onFocus={() => setFoco(caminho.id)}>
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
