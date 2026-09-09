import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

import { t } from '@/i18n/strings';

interface Envolucro {
  id: string;
  rotulo: string;
  ajuda?: string;
  erro?: string;
  opcional?: boolean;
  children: ReactNode;
}

export function Campo({ id, rotulo, ajuda, erro, opcional, children }: Envolucro) {
  return (
    <div className="campo">
      <label className="campo__rotulo" htmlFor={id}>
        {rotulo}
        {opcional ? <span className="campo__opcional"> ({t.comum.rotulos.opcional})</span> : null}
      </label>
      {ajuda ? (
        <p className="campo__ajuda" id={`${id}-ajuda`}>
          {ajuda}
        </p>
      ) : null}
      {children}
      {erro ? (
        <p className="campo__erro" id={`${id}-erro`}>
          {erro}
        </p>
      ) : null}
    </div>
  );
}

/** aria-describedby e aria-invalid derivados do estado do campo. */
function ariaCampo(id: string, ajuda?: string, erro?: string) {
  const descritores = [ajuda ? `${id}-ajuda` : null, erro ? `${id}-erro` : null]
    .filter(Boolean)
    .join(' ');
  return {
    'aria-describedby': descritores || undefined,
    'aria-invalid': erro ? true : undefined,
  } as const;
}

type PropsTexto = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string;
  rotulo: string;
  ajuda?: string;
  erro?: string;
  opcional?: boolean;
};

export function CampoTexto({ id, rotulo, ajuda, erro, opcional, ...resto }: PropsTexto) {
  return (
    <Campo id={id} rotulo={rotulo} ajuda={ajuda} erro={erro} opcional={opcional}>
      <input id={id} type={resto.type ?? 'text'} {...ariaCampo(id, ajuda, erro)} {...resto} />
    </Campo>
  );
}

type PropsArea = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  id: string;
  rotulo: string;
  ajuda?: string;
  erro?: string;
  opcional?: boolean;
};

export function CampoArea({ id, rotulo, ajuda, erro, opcional, ...resto }: PropsArea) {
  return (
    <Campo id={id} rotulo={rotulo} ajuda={ajuda} erro={erro} opcional={opcional}>
      <textarea id={id} {...ariaCampo(id, ajuda, erro)} {...resto} />
    </Campo>
  );
}

type PropsSelecao = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  id: string;
  rotulo: string;
  ajuda?: string;
  erro?: string;
  opcional?: boolean;
  opcoes: { valor: string; rotulo: string }[];
  vazio?: string;
};

export function CampoSelecao({
  id,
  rotulo,
  ajuda,
  erro,
  opcional,
  opcoes,
  vazio,
  ...resto
}: PropsSelecao) {
  return (
    <Campo id={id} rotulo={rotulo} ajuda={ajuda} erro={erro} opcional={opcional}>
      <select id={id} {...ariaCampo(id, ajuda, erro)} {...resto}>
        {vazio ? <option value="">{vazio}</option> : null}
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.rotulo}
          </option>
        ))}
      </select>
    </Campo>
  );
}

