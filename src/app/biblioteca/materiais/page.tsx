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
 * Biblioteca de materiais tecnicos. Sem texto publicado, a pagina descreve as
 * duas trilhas, que sao a porta de entrada das organizacoes, e diz o que cada
 * material vai trazer quando o primeiro sair.
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
          <div className="pilha">
            <h2 style={{ margin: 0 }}>{t.aprendizado.materiais.trilhasTitulo}</h2>
            <Trilhas />
          </div>

          {materiais.length === 0 ? (
            <EstadoVazio
              titulo={t.aprendizado.materiais.vazioTitulo}
              descricao={t.aprendizado.materiais.vazioDescricao}
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

      <div className="secao secao--curta secao--azul">
        <div className="container">
          <div className="grade--lateral" style={{ gap: 32, alignItems: 'center' }}>
            <div className="pilha--p">
              <p className="olho" style={{ margin: 0 }}>
                {t.aprendizado.materiais.licencaTitulo}
              </p>
              <p style={{ margin: 0, maxWidth: '56ch' }}>
                {t.aprendizado.materiais.licencaTexto}
              </p>
            </div>
            <div className="linha">
              <Selo status="licenca" rotulo={t.aprendizado.materiais.licencaSelo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
