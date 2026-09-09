import type { Metadata } from 'next';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { EstadoVazio } from '@/components/EstadoVazio';
import { Ilustracao } from '@/components/Ilustracao';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { materiais } from '@/lib/data';

import { CartaoMaterial } from './_CartaoMaterial';
import { Trilhas } from './_Trilhas';

export const metadata: Metadata = {
  title: t.aprendizado.materiais.titulo,
  description: t.aprendizado.materiais.descricao,
};

/**
 * Biblioteca de materiais tecnicos. As duas trilhas abrem a pagina e as
 * condicoes de uso fecham: sao as duas coisas que valem antes do primeiro
 * texto sair.
 */
export default function MateriaisPage() {
  return (
    <>
      <CabecalhoPagina
        olho={t.aprendizado.materiais.olho}
        titulo={t.aprendizado.materiais.titulo}
        descricao={t.aprendizado.materiais.descricao}
        acoes={<Ilustracao nome="lista" largura={104} />}
      />

      <div className="secao">
        <div className="container pilha--g">
          <Trilhas />

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
        </div>
      </div>

      <section className="secao secao--preto">
        <div className="container">
          <div className="linha linha--fim" style={{ alignItems: 'flex-end', gap: 24 }}>
            <div style={{ maxWidth: '56ch' }}>
              <p className="olho" style={{ marginBottom: 10 }}>
                {t.aprendizado.materiais.licencaTitulo}
              </p>
              <p style={{ margin: 0 }}>{t.aprendizado.materiais.licencaTexto}</p>
            </div>
            <Selo status="licenca" rotulo={t.aprendizado.materiais.licencaSelo} />
          </div>
        </div>
      </section>
    </>
  );
}
