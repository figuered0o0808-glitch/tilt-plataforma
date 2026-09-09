import type { CSSProperties } from 'react';

import { t } from '@/i18n/strings';
import { marcaDaTrilha } from './_CartaoMaterial';

/**
 * As duas trilhas dos materiais, com o que cada uma reune. Sao tambem as
 * ancoras usadas pelo pe de cada material. A cor da regua e a mesma do chip de
 * trilha no cartao.
 */
export function Trilhas() {
  return (
    <div className="grade--2">
      <article
        className="cartao cartao--marcado cartao--compacto"
        id="criadores"
        style={{ '--marca': marcaDaTrilha('criadores') } as CSSProperties}
      >
        <p className="olho" style={{ margin: 0 }}>
          {t.aprendizado.materiais.trilha}
        </p>
        <h2 className="cartao__titulo">{t.aprendizado.materiais.trilhaCriadores}</h2>
        <p className="cartao__texto">{t.aprendizado.materiais.trilhaCriadoresNota}</p>
      </article>

      <article
        className="cartao cartao--marcado cartao--compacto"
        id="organizacoes"
        style={{ '--marca': marcaDaTrilha('organizacoes') } as CSSProperties}
      >
        <p className="olho" style={{ margin: 0 }}>
          {t.aprendizado.materiais.trilha}
        </p>
        <h2 className="cartao__titulo">{t.aprendizado.materiais.trilhaOrganizacoes}</h2>
        <p className="cartao__texto">{t.aprendizado.materiais.trilhaOrganizacoesNota}</p>
      </article>
    </div>
  );
}
