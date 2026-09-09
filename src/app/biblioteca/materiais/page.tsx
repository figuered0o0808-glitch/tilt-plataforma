import type { Metadata } from 'next';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { EstadoVazio } from '@/components/EstadoVazio';
import { Ilustracao } from '@/components/Ilustracao';
import { t } from '@/i18n/strings';
import { materiais } from '@/lib/data';

import { CartaoMaterial } from './_CartaoMaterial';
import { Trilhas } from './_Trilhas';

export const metadata: Metadata = {
  title: t.aprendizado.materiais.titulo,
  description: t.aprendizado.materiais.descricao,
};

/**
 * Biblioteca de materiais tecnicos. O que esta publicado abre a pagina; as duas
 * trilhas vem depois, como leitura do conjunto e como ancora do pe de cada
 * material.
 */
export default function MateriaisPage() {
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
                <Botao href="/" variante="secundario" tamanho="pequeno">
                  {t.aprendizado.materiais.vazioAcao}
                </Botao>
              }
            />
          ) : (
            <div className="grade--2">
              {materiais.map((material) => (
                <CartaoMaterial key={material.slug} material={material} mostrarTrilha />
              ))}
            </div>
          )}

          <Trilhas />
        </div>
      </div>
    </>
  );
}
