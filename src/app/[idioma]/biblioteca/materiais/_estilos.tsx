/**
 * Estilo do acervo.
 *
 * Fica aqui, junto das paginas da Biblioteca, e nao na folha geral: sao classes
 * que so a Biblioteca usa. Todas com prefixo bib- e escritas com as variaveis
 * do sistema, para herdar paleta, tipografia e o canto reto de 2px.
 */
const CSS = `
/* Barra de busca e filtros: um cartao denso, nada de painel lateral. */
.bib-controles {
  background: var(--branco);
  border: 1px solid var(--preto);
  border-radius: 2px;
  padding: 14px 18px 6px;
}
.bib-busca {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding-bottom: 12px;
}
.bib-busca input[type='search'] {
  padding: 10px 14px;
  font-size: 1rem;
}
.bib-linha {
  display: grid;
  grid-template-columns: 108px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid var(--linha);
}
.bib-linha__rotulo {
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--tinta-suave);
  margin: 0;
}
.bib-opcoes { display: flex; flex-wrap: wrap; gap: 6px; }

.bib-pilula {
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1;
  padding: 7px 11px;
  border: 1px solid var(--linha);
  border-radius: 2px;
  background: var(--branco);
  color: var(--tinta-media);
  cursor: pointer;
}
.bib-pilula:hover:not(:disabled) { border-color: var(--preto); color: var(--preto); }
.bib-pilula[aria-pressed='true'] {
  background: var(--preto);
  border-color: var(--preto);
  color: var(--branco);
}
.bib-pilula:disabled { opacity: 0.3; cursor: not-allowed; }
.bib-pilula__n { opacity: 0.58; margin-left: 6px; }

/* Contagem do acervo: numeros em monoespacada, sempre visiveis. */
.bib-contagem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--tinta-suave);
}
.bib-contagem strong { color: var(--preto); font-weight: 500; }

/* Capa: sem moldura e sem respiro, em qualquer tamanho. */
.bib-capa {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
  object-position: center top;
}
/* Sem capa enviada: malha de pontos e a marca de quem publica, sem texto. */
.bib-capa-marca {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow: hidden;
}
.bib-capa-marca__malha {
  position: absolute;
  inset: 0;
  color: rgba(0, 0, 0, 0.24);
  background-image: radial-gradient(circle, currentColor 1.2px, transparent 1.2px);
  background-size: 16px 16px;
}
.bib-capa-marca__logo {
  position: relative;
  display: block;
  width: auto;
  max-width: 76%;
  max-height: 40%;
}
.bib-capa-marca__sigla {
  position: relative;
  font-family: var(--mono);
  font-size: 0.8125rem;
  line-height: 1.35;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  color: var(--preto);
}

/* Abertura da pagina de um material: capa em tamanho digno ao lado da ficha. */
.bib-abertura {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 26px;
  align-items: start;
}
.bib-abertura__capa { display: block; overflow: hidden; border-radius: 2px; }
.bib-abertura__capa .bib-capa { height: auto; }
.bib-abertura__gerada { aspect-ratio: 3 / 4; background: var(--areia); }

.bib-ficha { display: grid; gap: 0; margin: 0; }
.bib-ficha__linha {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 14px;
  padding: 9px 0;
  border-top: 1px solid var(--linha);
}
.bib-ficha__linha:first-child { border-top: 0; padding-top: 0; }
.bib-ficha dt {
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--tinta-suave);
  padding-top: 0.3em;
}
.bib-ficha dd { margin: 0; font-size: 1rem; line-height: 1.4; }

/* Sumario: numero e titulo da secao, uma linha por secao. */
.bib-sumario { display: grid; gap: 0; }
.bib-sumario__item {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  gap: 10px;
  padding: 8px 2px;
  border-top: 1px solid var(--linha);
  font-size: 1rem;
  color: var(--preto);
  text-decoration: none;
}
.bib-sumario__item:first-child { border-top: 0; }
.bib-sumario__item:hover { background: var(--areia); text-decoration: none; }
.bib-sumario__item:hover .bib-sumario__titulo {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.bib-sumario__n {
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--tinta-suave);
  padding-top: 0.3em;
}

/* Arquivos: um por idioma, com o que o leitor baixa dito por extenso. */
.bib-arquivo {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 11px 0;
  border-top: 1px solid var(--linha);
}
.bib-arquivo__idioma { margin: 0; font-size: 1.05rem; line-height: 1.25; }
.bib-arquivo__nota {
  margin: 3px 0 0;
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--tinta-suave);
}

@media (max-width: 880px) {
  .bib-abertura { grid-template-columns: 184px minmax(0, 1fr); gap: 20px; }
}

@media (max-width: 640px) {
  .bib-abertura { grid-template-columns: minmax(0, 1fr); }
  .bib-abertura__capa { max-width: 200px; }
  .bib-busca { grid-template-columns: minmax(0, 1fr); }
  .bib-linha { grid-template-columns: minmax(0, 1fr); gap: 8px; }
}
`;

/** Injeta o estilo do acervo na pagina. Sem dependencia externa. */
export function EstilosAcervo() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}
