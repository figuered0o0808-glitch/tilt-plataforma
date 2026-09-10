import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { EstadoVazio } from '@/components/EstadoVazio';
import { Ilustracao } from '@/components/Ilustracao';
import { ehIdioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { rota } from '@/lib/rotas';

import { CartaoMaterial } from './_CartaoMaterial';
import { Trilhas } from './_Trilhas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) return {};
  const r = textos(idioma).aprendizado.materiais;
  return { title: r.titulo, description: r.descricao };
}

/**
 * Biblioteca de materiais tecnicos. O que esta publicado abre a pagina; as duas
 * trilhas vem depois, como leitura do conjunto e como ancora do pe de cada
 * material.
 */
export default async function MateriaisPage({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  if (!ehIdioma(idioma)) notFound();

  const t = textos(idioma);
  const { materiais } = conteudo(idioma);

  return (
    <>
      <CabecalhoPagina
        olho={t.aprendizado.materiais.olho}
        titulo={t.aprendizado.materiais.titulo}
        acoes={<Ilustracao nome="lista" largura={104} />}
      />

      <div className="secao">
        <div className="container pilha--g">
          {materiais.length === 0 ? (
            <EstadoVazio
              titulo={t.aprendizado.materiais.vazioTitulo}
              desenho="pasta"
              acao={
                <Botao href={rota(idioma)} variante="secundario" tamanho="pequeno">
                  {t.aprendizado.materiais.vazioAcao}
                </Botao>
              }
            />
          ) : (
            <div className="pilha">
              {materiais.map((material) => (
                <CartaoMaterial
                  key={material.slug}
                  idioma={idioma}
                  material={material}
                  mostrarTrilha
                />
              ))}
            </div>
          )}

          <Trilhas idioma={idioma} />
        </div>
      </div>
    </>
  );
}
