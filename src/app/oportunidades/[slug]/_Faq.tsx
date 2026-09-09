import { t } from '@/i18n/strings';
import type { PerguntaFrequente } from '@/lib/types';

/**
 * Perguntas frequentes em lista aberta, no padrao de registro do manual:
 * numero da pergunta a esquerda, pergunta e resposta a direita. As respostas
 * ficam visiveis sem depender de clique, para poder ser lidas e buscadas
 * direto na pagina da chamada.
 */
export function Faq({ itens }: { itens: PerguntaFrequente[] }) {
  return (
    <div>
      {itens.map((item, indice) => (
        <div className="registro" key={item.pergunta}>
          <p className="registro__rotulo">
            {`${t.editais.perguntaRotulo} ${String(indice + 1).padStart(2, '0')}`}
          </p>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.08rem' }}>{item.pergunta}</h3>
            <p className="texto-pequeno" style={{ margin: 0, maxWidth: '62ch' }}>
              {item.resposta}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
