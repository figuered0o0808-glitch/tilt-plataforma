import Link from 'next/link';

import { Chip, type CorChip } from '@/components/Chip';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { arquivoPublico } from '@/lib/format';
import { rota } from '@/lib/rotas';
import type { Article, Trilha } from '@/lib/types';

import { Capa } from './_Capa';
import { dataCurta } from './_regras';

/** Nome da trilha em texto de interface. */
export function rotuloTrilha(idioma: Idioma, trilha: Trilha): string {
  const t = textos(idioma);
  return trilha === 'criadores'
    ? t.aprendizado.materiais.trilhaCriadores
    : t.aprendizado.materiais.trilhaOrganizacoes;
}

/** Cor fixa por trilha, para que o leitor reconheca a trilha de relance. */
function corDaTrilha(trilha: Trilha): CorChip {
  return trilha === 'criadores' ? 'menta' : 'azul';
}

/** A mesma cor da trilha, para a regua fina no alto de um cartao. */
export function marcaDaTrilha(trilha: Trilha): string {
  return `var(--${corDaTrilha(trilha)})`;
}

/**
 * Cartao de material: quem publica, quem assina, sobre o que, em que formato e
 * de quando. A data entra no pe porque o acervo ordena por ela.
 *
 * Sem hooks: serve a lista de materiais, o indice da Biblioteca e a faixa de
 * publicacoes vizinhas ao pe de cada texto.
 */
export function CartaoMaterial({
  idioma,
  material,
  mostrarTrilha,
}: {
  idioma: Idioma;
  material: Article;
  mostrarTrilha?: boolean;
}) {
  const r = textos(idioma).aprendizado.materiais;

  return (
    <Link
      href={rota(idioma, `biblioteca/materiais/${material.slug}`)}
      className="cartao publicacao"
    >
      <div className="publicacao__capa">
        <Capa material={material} cor={marcaDaTrilha(material.trilha)} variante="cartao" />
      </div>

      <div className="publicacao__ficha">
        <div className="publicacao__marca">
          {material.logoOrganizacao ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={arquivoPublico(material.logoOrganizacao)}
              alt={material.organizacao}
              className="publicacao__logo"
            />
          ) : (
            <span className="olho" style={{ margin: 0 }}>
              {material.organizacao}
            </span>
          )}
          {mostrarTrilha ? (
            <Chip cor={corDaTrilha(material.trilha)}>{rotuloTrilha(idioma, material.trilha)}</Chip>
          ) : null}
        </div>

        <p className="cartao__titulo">{material.titulo}</p>
        <p className="texto-pequeno" style={{ margin: 0 }}>
          {material.autoria.join(', ')}
        </p>
        <p className="cartao__texto">{material.resumo}</p>
        <div className="chips">
          <Chip vazado>{material.tema}</Chip>
        </div>
        {/* O cartao inteiro e o link: no pe cabe o que ajuda a escolher. */}
        <div className="cartao__rodape">
          <span>{material.formato}</span>
          <span>{dataCurta(material.atualizadoEm, r.dataCurtaModelo)}</span>
        </div>
      </div>
    </Link>
  );
}
