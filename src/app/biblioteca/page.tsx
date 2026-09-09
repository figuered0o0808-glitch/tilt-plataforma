import type { Metadata } from 'next';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';

import { Trilhas } from './materiais/_Trilhas';

export const metadata: Metadata = {
  title: t.aprendizado.indice.titulo,
  description: t.aprendizado.indice.descricao,
};

/**
 * Indice da Biblioteca. Enquanto o primeiro ciclo do programa nao abre,
 * a pagina cumpre o papel de explicar as duas metades da area, dizer em que
 * ponto cada uma esta e levar quem chega ate as regras que ja valem.
 */
export default function BibliotecaPage() {
  return (
    <>
      <CabecalhoPagina
        olho={t.aprendizado.indice.olho}
        titulo={t.aprendizado.indice.titulo}
        descricao={t.aprendizado.indice.descricao}
      />

      <div className="secao secao--curta">
        <div className="container pilha--g">
          <div className="destaque">
            <p className="destaque__titulo">{t.aprendizado.indice.estadoTitulo}</p>
            <p className="destaque__texto">{t.aprendizado.indice.estadoTexto}</p>
          </div>

          <div>
            {t.aprendizado.indice.abertura.map((item) => (
              <div key={item.rotulo} className="registro">
                <p className="registro__rotulo">{item.rotulo}</p>
                <p style={{ margin: 0 }}>{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="secao secao--amarelo">
        <div className="container pilha--g">
          <div className="linha linha--fim" style={{ alignItems: 'flex-end', gap: 20 }}>
            <div style={{ maxWidth: '46rem' }}>
              <p className="olho" style={{ marginBottom: 8 }}>
                {t.aprendizado.indice.formacaoOlho}
              </p>
              <h2 style={{ marginBottom: 10 }}>{t.aprendizado.indice.formacaoTitulo}</h2>
              <p className="texto-secundario" style={{ margin: 0 }}>
                {t.aprendizado.indice.formacaoTexto}
              </p>
            </div>
            <Botao href="/biblioteca/cursos" variante="secundario" tamanho="pequeno">
              {t.aprendizado.indice.formacaoLink}
            </Botao>
          </div>

          <p className="nota" style={{ margin: 0 }}>
            {t.aprendizado.indice.formacaoEstado}
          </p>
        </div>
      </section>

      <section className="secao secao--azul">
        <div className="container pilha--g">
          <div className="linha linha--fim" style={{ alignItems: 'flex-end', gap: 20 }}>
            <div style={{ maxWidth: '46rem' }}>
              <p className="olho" style={{ marginBottom: 8 }}>
                {t.aprendizado.indice.materiaisOlho}
              </p>
              <h2 style={{ marginBottom: 10 }}>{t.aprendizado.indice.materiaisTitulo}</h2>
              <p className="texto-secundario" style={{ margin: 0 }}>
                {t.aprendizado.indice.materiaisTexto}
              </p>
            </div>
            <Botao href="/biblioteca/materiais" variante="secundario" tamanho="pequeno">
              {t.aprendizado.indice.materiaisLink}
            </Botao>
          </div>

          <p className="nota" style={{ margin: 0 }}>
            {t.aprendizado.indice.materiaisEstado}
          </p>

          <Trilhas />

          <div className="linha">
            <Selo status="licenca" rotulo={t.aprendizado.materiais.licencaSelo} />
            <span className="texto-pequeno">{t.aprendizado.materiais.licencaNota}</span>
          </div>
        </div>
      </section>
    </>
  );
}
