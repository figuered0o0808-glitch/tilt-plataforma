import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

import Link from 'next/link';

import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { t } from '@/i18n/strings';
import { cursos, materiais } from '@/lib/data';

export const metadata: Metadata = {
  title: t.aprendizado.indice.titulo,
  description: t.aprendizado.indice.descricao,
};

/**
 * Indice da Biblioteca: as duas areas e as condicoes que valem para as duas.
 * O aviso de que nada foi publicado sai daqui quando entrar o primeiro curso
 * ou material.
 */
export default function BibliotecaPage() {
  const { indice } = t.aprendizado;
  const vazia = cursos.length === 0 && materiais.length === 0;

  return (
    <>
      <CabecalhoPagina
        olho={indice.olho}
        titulo={indice.titulo}
        descricao={indice.descricao}
      />

      <section className="secao">
        <div className="container pilha">
          <div className="grade--2">
            {indice.areas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="cartao cartao--marcado"
                style={{ '--marca': area.marca } as CSSProperties}
              >
                <h2 className="cartao__titulo">{area.titulo}</h2>
                <p className="cartao__texto">{area.texto}</p>
                <div className="cartao__rodape">
                  <span className="link-seta">{area.acao}</span>
                </div>
              </Link>
            ))}
          </div>

          {vazia ? (
            <p className="nota" style={{ margin: 0 }}>
              {indice.estado}
            </p>
          ) : null}
        </div>
      </section>

      <section className="secao secao--preto">
        <div className="container">
          {indice.abertura.map((item) => (
            <div key={item.rotulo} className="registro">
              <p className="registro__rotulo">{item.rotulo}</p>
              <p style={{ margin: 0 }}>{item.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
