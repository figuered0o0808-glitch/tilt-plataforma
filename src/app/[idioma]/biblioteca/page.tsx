import type { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { rota } from '@/lib/rotas';

import { CartaoMaterial } from './materiais/_CartaoMaterial';
import { ordenar } from './materiais/_regras';
import { EstilosAcervo } from './materiais/_estilos';

/** Quantas publicacoes recentes cabem no indice antes de mandar para o acervo. */
const RECENTES = 3;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) return {};
  const { indice } = textos(idioma).aprendizado;
  return { title: indice.titulo, description: indice.descricao };
}

/**
 * Indice da Biblioteca: as publicacoes atualizadas mais recentemente abrem a
 * pagina e o acervo inteiro fica a um clique, com a contagem no proprio link.
 * Os cursos ficam numa linha so enquanto nao ha turma.
 */
export default async function BibliotecaPage({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  const t = textos(idioma);
  const { indice } = t.aprendizado;
  const { cursos, materiais } = conteudo(idioma);
  const recentes = ordenar(materiais, 'atualizacao').slice(0, RECENTES);

  return (
    <>
      <EstilosAcervo />
      <CabecalhoPagina olho={indice.olho} titulo={indice.titulo} />

      <section className="secao">
        <div className="container pilha--g">
          {recentes.length > 0 ? (
            <div className="pilha">
              <h2 className="olho" style={{ margin: 0 }}>
                {indice.materiaisTitulo}
              </h2>
              <div className="pilha">
                {recentes.map((material) => (
                  <CartaoMaterial
                    key={material.slug}
                    idioma={idioma}
                    material={material}
                    mostrarTrilha
                  />
                ))}
              </div>
              <div className="linha">
                <Link href={rota(idioma, 'biblioteca/materiais')} className="link-seta">
                  {`${indice.materiaisAcao} (${materiais.length})`}
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
              <h2 className="rotulo rotulo--forte" style={{ margin: 0 }}>
                {indice.cursosTitulo}
              </h2>
              {cursos.length === 0 ? (
                <p style={{ margin: 0 }}>{indice.cursosVazio}</p>
              ) : null}
            </div>
            <Link href={rota(idioma, 'biblioteca/cursos')} className="link-seta">
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
