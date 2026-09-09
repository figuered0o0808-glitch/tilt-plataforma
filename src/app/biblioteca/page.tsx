import type { Metadata } from 'next';

import Link from 'next/link';

import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { t } from '@/i18n/strings';
import { cursos, materiais } from '@/lib/data';

import { CartaoMaterial } from './materiais/_CartaoMaterial';

export const metadata: Metadata = {
  title: t.aprendizado.indice.titulo,
  description: t.aprendizado.indice.descricao,
};

/**
 * Indice da Biblioteca: o que ja esta publicado abre a pagina. Os cursos ficam
 * numa linha so enquanto nao ha turma.
 */
export default function BibliotecaPage() {
  const { indice } = t.aprendizado;

  return (
    <>
      <CabecalhoPagina olho={indice.olho} titulo={indice.titulo} />

      <section className="secao">
        <div className="container pilha--g">
          {materiais.length > 0 ? (
            <div className="pilha">
              <p className="olho" style={{ margin: 0 }}>
                {indice.materiaisTitulo}
              </p>
              <div className="grade--2">
                {materiais.map((material) => (
                  <CartaoMaterial key={material.slug} material={material} mostrarTrilha />
                ))}
              </div>
              <div className="linha">
                <Link href="/biblioteca/materiais" className="link-seta">
                  {indice.materiaisAcao}
                </Link>
              </div>
            </div>
          ) : null}

          <div
            className="cartao cartao--compacto"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div className="pilha--p">
              <p className="rotulo rotulo--forte" style={{ margin: 0 }}>
                {indice.cursosTitulo}
              </p>
              {cursos.length === 0 ? (
                <p style={{ margin: 0 }}>{indice.cursosVazio}</p>
              ) : null}
            </div>
            <Link href="/biblioteca/cursos" className="link-seta">
              {cursos.length === 0 ? indice.cursosAcaoVazio : indice.cursosAcao}
            </Link>
          </div>
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
