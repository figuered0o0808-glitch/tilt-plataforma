import { t } from '@/i18n/strings';

/**
 * As duas trilhas da biblioteca, com o que cada uma reune. A mesma descricao
 * serve a pagina indice da Biblioteca e a lista de materiais, para que os dois
 * lugares digam a mesma coisa. Sem estado e sem aba: enquanto nao ha material
 * publicado, a trilha e uma descricao, nao um filtro.
 */
export function Trilhas() {
  return (
    <div className="pilha">
      <div className="grade--2">
        <article className="cartao" id="criadores">
          <p className="olho" style={{ margin: 0 }}>
            {t.aprendizado.materiais.trilha}
          </p>
          <h3 className="cartao__titulo">{t.aprendizado.materiais.trilhaCriadores}</h3>
          <p className="cartao__texto">{t.aprendizado.materiais.trilhaCriadoresNota}</p>
        </article>

        <article className="cartao" id="organizacoes">
          <p className="olho" style={{ margin: 0 }}>
            {t.aprendizado.materiais.trilha}
          </p>
          <h3 className="cartao__titulo">{t.aprendizado.materiais.trilhaOrganizacoes}</h3>
          <p className="cartao__texto">{t.aprendizado.materiais.trilhaOrganizacoesNota}</p>
        </article>
      </div>

      <p className="nota" style={{ margin: 0 }}>
        {t.aprendizado.materiais.notaOrganizacoes}
      </p>
    </div>
  );
}
