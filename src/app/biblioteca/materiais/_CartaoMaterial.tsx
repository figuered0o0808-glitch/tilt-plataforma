import Link from 'next/link';

import { Chip, type CorChip } from '@/components/Chip';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import type { Article, Trilha } from '@/lib/types';

/** Nome da trilha em texto de interface. */
export function rotuloTrilha(trilha: Trilha): string {
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
 * Cartao de material. Sem hooks: serve a lista de materiais e a sugestao de
 * leitura ao pe de cada texto.
 */
export function CartaoMaterial({
  material,
  mostrarTrilha,
}: {
  material: Article;
  mostrarTrilha?: boolean;
}) {
  return (
    <Link href={`/biblioteca/materiais/${material.slug}`} className="cartao">
      <div className="linha linha--fim">
        <span className="olho" style={{ margin: 0 }}>
          {material.formato}
        </span>
        <Selo status="licenca" rotulo={t.aprendizado.materiais.licencaSelo} />
      </div>
      <p className="cartao__titulo">{material.titulo}</p>
      <p className="cartao__texto">{material.resumo}</p>
      {mostrarTrilha ? (
        <div className="chips">
          <Chip cor={corDaTrilha(material.trilha)}>
            {`${t.aprendizado.materiais.trilha}: ${rotuloTrilha(material.trilha)}`}
          </Chip>
        </div>
      ) : null}
      <div className="cartao__rodape">
        <span>
          {t.aprendizado.materiais.tempoLeitura}: {material.tempoLeitura}
        </span>
        <span className="link-seta">{t.comum.acoes.lerMaterial}</span>
      </div>
    </Link>
  );
}
