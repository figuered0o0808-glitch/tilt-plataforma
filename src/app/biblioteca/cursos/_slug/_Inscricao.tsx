'use client';

import { Botao } from '@/components/Botao';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { useApp } from '@/state/AppState';

/**
 * Inscricao na turma. Quem ainda nao tem cadastro recebe o convite para criar
 * um; quem ja tem, o botao. Depois de inscrita, a pessoa ve a confirmacao e o
 * caminho para o painel, onde a inscricao fica registrada.
 */
export function Inscricao({ slug }: { slug: string }) {
  const { cadastrado, inscreverCurso, estaInscrito, hidratado } = useApp();
  const inscrito = hidratado && estaInscrito(slug);

  if (hidratado && !cadastrado && !inscrito) {
    return (
      <div className="pilha--p">
        <p className="texto-pequeno texto-secundario" style={{ margin: 0 }}>
          {t.aprendizado.cursos.inscricaoCadastro}
        </p>
        <Botao href="/cadastro" largo>
          {t.aprendizado.cursos.inscricaoAcaoCadastro}
        </Botao>
      </div>
    );
  }

  if (!inscrito) {
    return (
      <div className="pilha--p">
        <Botao largo onClick={() => inscreverCurso(slug)}>
          {t.comum.acoes.inscreverse}
        </Botao>
        <p className="texto-mini" style={{ margin: 0 }}>
          {t.aprendizado.cursos.inscricaoNota}
        </p>
      </div>
    );
  }

  return (
    <div className="pilha">
      <div className="pilha--p">
        <Selo status="inscrito" rotulo={t.comum.acoes.inscrito} />
        <p className="texto-pequeno texto-secundario" style={{ margin: 0 }}>
          {t.aprendizado.cursos.inscricaoConfirmada}
        </p>
      </div>
      <Botao href="/painel" variante="secundario" largo>
        {t.aprendizado.cursos.irAoPainel}
      </Botao>
    </div>
  );
}
