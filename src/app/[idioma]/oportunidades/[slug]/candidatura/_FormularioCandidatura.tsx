'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';

import { Botao } from '@/components/Botao';
import { CampoArea, CampoSelecao, CampoTexto } from '@/components/Campo';
import { Ilustracao } from '@/components/Ilustracao';
import { Passos } from '@/components/Passos';
import { Selo } from '@/components/Selo';
import type { Idioma } from '@/i18n/idiomas';
import { textos, type Strings } from '@/i18n/strings';
import { data, moeda } from '@/lib/format';
import { rota } from '@/lib/rotas';
import type { Candidatura } from '@/lib/types';
import { useApp } from '@/state/AppState';

export interface EditalResumo {
  slug: string;
  titulo: string;
  faixaApoio: { min: number; max: number };
}

/** Strings do fluxo, passadas para as funcoes que validam fora do componente. */
type TextosCandidatura = Strings['fluxos']['candidatura'];

interface Dados {
  nome: string;
  documento: string;
  cidade: string;
  uf: string;
  email: string;
  projeto: string;
  descricao: string;
  formato: string;
  valor: string;
  justificativa: string;
  alcance: string;
  distribuicao: string;
}

type NomeCampo = keyof Dados;
type Erros = Partial<Record<NomeCampo, string>>;

const VAZIO: Dados = {
  nome: '',
  documento: '',
  cidade: '',
  uf: '',
  email: '',
  projeto: '',
  descricao: '',
  formato: '',
  valor: '',
  justificativa: '',
  alcance: '',
  distribuicao: '',
};

const CAMPOS_DO_PASSO: NomeCampo[][] = [
  ['nome', 'documento', 'cidade', 'uf', 'email'],
  ['projeto', 'descricao', 'formato', 'valor', 'justificativa', 'alcance', 'distribuicao'],
];

function digitos(valor: string): string {
  return valor.replace(/\D/g, '');
}

function emailValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim());
}

function validarProponente(dados: Dados, tc: TextosCandidatura): Erros {
  const erros: Erros = {};
  if (!dados.nome.trim()) erros.nome = tc.erros.obrigatorio;
  if (!dados.documento.trim()) erros.documento = tc.erros.obrigatorio;
  else if (![11, 14].includes(digitos(dados.documento).length)) erros.documento = tc.erros.documento;
  if (!dados.cidade.trim()) erros.cidade = tc.erros.obrigatorio;
  if (!dados.uf) erros.uf = tc.erros.uf;
  if (!dados.email.trim()) erros.email = tc.erros.obrigatorio;
  else if (!emailValido(dados.email)) erros.email = tc.erros.email;
  return erros;
}

function validarProjeto(
  dados: Dados,
  faixa: { min: number; max: number },
  tc: TextosCandidatura,
  separador: string,
): Erros {
  const erros: Erros = {};
  if (!dados.projeto.trim()) erros.projeto = tc.erros.obrigatorio;
  if (!dados.descricao.trim()) erros.descricao = tc.erros.obrigatorio;
  if (!dados.formato) erros.formato = tc.erros.formato;

  const valor = Number(dados.valor);
  if (!dados.valor.trim()) erros.valor = tc.erros.obrigatorio;
  else if (!Number.isFinite(valor) || valor <= 0) erros.valor = tc.erros.valorNumero;
  else if (valor < faixa.min || valor > faixa.max) {
    erros.valor = `${tc.erros.valorFaixa} ${moeda(faixa.min)} ${separador} ${moeda(faixa.max)}.`;
  }

  if (!dados.justificativa.trim()) erros.justificativa = tc.erros.obrigatorio;
  if (!dados.alcance.trim()) erros.alcance = tc.erros.obrigatorio;
  if (!dados.distribuicao.trim()) erros.distribuicao = tc.erros.obrigatorio;
  return erros;
}

function validarPasso(
  passo: number,
  dados: Dados,
  faixa: { min: number; max: number },
  tc: TextosCandidatura,
  separador: string,
): Erros {
  if (passo === 0) return validarProponente(dados, tc);
  if (passo === 1) return validarProjeto(dados, faixa, tc, separador);
  return {};
}

/** Linha de registro do manual, usada na revisao e no comprovante de envio. */
function Item({ rotulo, valor }: { rotulo: string; valor: ReactNode }) {
  return (
    <div className="registro">
      <p className="registro__rotulo">{rotulo}</p>
      <div style={{ whiteSpace: 'pre-line' }}>{valor}</div>
    </div>
  );
}

export function FormularioCandidatura({
  idioma,
  edital,
}: {
  idioma: Idioma;
  edital: EditalResumo;
}) {
  const t = textos(idioma);
  const tc = t.fluxos.candidatura;
  const separador = t.editais.faixaSeparador;
  const { cadastrado, enviarCandidatura } = useApp();
  const [passo, setPasso] = useState(0);
  const [dados, setDados] = useState<Dados>(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  const [enviada, setEnviada] = useState<Candidatura | null>(null);
  const topo = useRef<HTMLDivElement>(null);

  const faixa = edital.faixaApoio;
  const faixaTexto = `${tc.projeto.faixaAjuda} ${moeda(faixa.min)} ${separador} ${moeda(
    faixa.max,
  )}.`;

  function irPara(destino: number) {
    setPasso(destino);
    topo.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function atualizar(campo: NomeCampo, valor: string) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => {
      if (!atual[campo]) return atual;
      const proximo = { ...atual };
      delete proximo[campo];
      return proximo;
    });
  }

  function avancar() {
    const encontrados = validarPasso(passo, dados, faixa, tc, separador);
    setErros(encontrados);
    if (Object.keys(encontrados).length === 0) irPara(passo + 1);
  }

  function enviar() {
    const encontrados = {
      ...validarProponente(dados, tc),
      ...validarProjeto(dados, faixa, tc, separador),
    };
    if (Object.keys(encontrados).length > 0) {
      setErros(encontrados);
      const passoComErro = CAMPOS_DO_PASSO.findIndex((campos) =>
        campos.some((campo) => encontrados[campo]),
      );
      irPara(passoComErro === -1 ? 0 : passoComErro);
      return;
    }
    const nova = enviarCandidatura({
      editalSlug: edital.slug,
      editalTitulo: edital.titulo,
      projeto: dados.projeto.trim(),
      formato: dados.formato,
      valorSolicitado: Number(dados.valor),
    });
    setEnviada(nova);
    topo.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function aoSubmeter(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (passo < 2) avancar();
    else enviar();
  }

  /** Candidatar-se depende apenas de estar cadastrado. */
  if (!cadastrado && !enviada) {
    return (
      <section className="cartao" style={{ gap: 16 }}>
        <h2 className="cartao__titulo">{tc.cadastro.titulo}</h2>
        <p className="cartao__texto">{tc.cadastro.texto}</p>
        <div className="linha" style={{ marginTop: 4 }}>
          <Botao href={rota(idioma, 'cadastro')}>{tc.cadastro.acao}</Botao>
          <Botao href={rota(idioma, `oportunidades/${edital.slug}`)} variante="secundario">
            {tc.voltarEdital}
          </Botao>
        </div>
      </section>
    );
  }

  if (enviada) {
    return (
      <div ref={topo} className="pilha--g">
        <section className="cartao" style={{ gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Ilustracao nome="enviado" largura={180} />
          </div>
          <h2 style={{ textAlign: 'center', margin: 0 }}>{tc.confirmacao.titulo}</h2>

          <p className="rotulo rotulo--forte" style={{ margin: '10px 0 0' }}>
            {tc.confirmacao.resumoTitulo}
          </p>
          <div>
            <Item rotulo={tc.confirmacao.protocolo} valor={enviada.id} />
            <Item rotulo={tc.confirmacao.enviadaEm} valor={data(enviada.enviadaEm)} />
            <Item rotulo={tc.confirmacao.edital} valor={enviada.editalTitulo} />
            <Item rotulo={tc.confirmacao.projeto} valor={enviada.projeto} />
            <Item rotulo={tc.confirmacao.valor} valor={moeda(enviada.valorSolicitado)} />
            <Item rotulo={tc.confirmacao.situacao} valor={<Selo idioma={idioma} status={enviada.status} />} />
          </div>

          <p className="nota" style={{ marginTop: 6 }}>
            {tc.confirmacao.proximoPasso}
          </p>
        </section>

        <div className="linha">
          <Botao href={rota(idioma, 'painel')}>{tc.confirmacao.acao}</Botao>
          <Botao href={rota(idioma, 'oportunidades')} variante="secundario">
            {tc.confirmacao.secundaria}
          </Botao>
        </div>
      </div>
    );
  }

  return (
    <div ref={topo}>
      <Passos passos={tc.passos} atual={passo} />

      <form onSubmit={aoSubmeter} noValidate className="pilha--g">
        {passo === 0 ? (
          <section className="pilha">
            <div className="pilha--p">
              <h2 style={{ margin: 0 }}>{tc.proponente.titulo}</h2>
              <p className="texto-secundario texto-pequeno" style={{ margin: 0 }}>
                {tc.proponente.intro}
              </p>
            </div>

            <CampoTexto idioma={idioma}
              id="nome"
              rotulo={tc.proponente.nome}
              value={dados.nome}
              erro={erros.nome}
              autoComplete="off"
              onChange={(evento) => atualizar('nome', evento.target.value)}
            />

            <div className="grade--2" style={{ gap: 16 }}>
              <CampoTexto idioma={idioma}
                id="documento"
                rotulo={tc.proponente.documento}
                placeholder={tc.proponente.exemplos.documento}
                inputMode="numeric"
                value={dados.documento}
                erro={erros.documento}
                onChange={(evento) => atualizar('documento', evento.target.value)}
              />
              <CampoTexto idioma={idioma}
                id="email"
                type="email"
                rotulo={tc.proponente.email}
                placeholder={tc.proponente.exemplos.email}
                value={dados.email}
                erro={erros.email}
                autoComplete="off"
                onChange={(evento) => atualizar('email', evento.target.value)}
              />
            </div>

            <div className="grade--2" style={{ gap: 16 }}>
              <CampoTexto idioma={idioma}
                id="cidade"
                rotulo={tc.proponente.cidade}
                placeholder={tc.proponente.exemplos.cidade}
                value={dados.cidade}
                erro={erros.cidade}
                autoComplete="off"
                onChange={(evento) => atualizar('cidade', evento.target.value)}
              />
              <CampoSelecao idioma={idioma}
                id="uf"
                rotulo={tc.proponente.uf}
                vazio={tc.selecioneUf}
                opcoes={tc.ufs.map((uf) => ({ valor: uf, rotulo: uf }))}
                value={dados.uf}
                erro={erros.uf}
                onChange={(evento) => atualizar('uf', evento.target.value)}
              />
            </div>
          </section>
        ) : null}

        {passo === 1 ? (
          <section className="pilha">
            <h2 style={{ margin: 0 }}>{tc.projeto.titulo}</h2>

            <CampoTexto idioma={idioma}
              id="projeto"
              rotulo={tc.projeto.nome}
              value={dados.projeto}
              erro={erros.projeto}
              autoComplete="off"
              onChange={(evento) => atualizar('projeto', evento.target.value)}
            />

            <CampoArea idioma={idioma}
              id="descricao"
              rotulo={tc.projeto.descricao}
              ajuda={tc.projeto.descricaoAjuda}
              rows={5}
              value={dados.descricao}
              erro={erros.descricao}
              onChange={(evento) => atualizar('descricao', evento.target.value)}
            />

            <div className="grade--2" style={{ gap: 16 }}>
              <CampoSelecao idioma={idioma}
                id="formato"
                rotulo={tc.projeto.formato}
                vazio={tc.selecioneFormato}
                opcoes={tc.formatos.map((formato) => ({ valor: formato, rotulo: formato }))}
                value={dados.formato}
                erro={erros.formato}
                onChange={(evento) => atualizar('formato', evento.target.value)}
              />
              <CampoTexto idioma={idioma}
                id="valor"
                type="number"
                min={0}
                step={500}
                rotulo={tc.projeto.valor}
                ajuda={faixaTexto}
                placeholder={tc.projeto.exemplos.valor}
                value={dados.valor}
                erro={erros.valor}
                onChange={(evento) => atualizar('valor', evento.target.value)}
              />
            </div>

            <CampoArea idioma={idioma}
              id="justificativa"
              rotulo={tc.projeto.justificativa}
              ajuda={tc.projeto.justificativaAjuda}
              placeholder={tc.projeto.exemplos.justificativa}
              rows={3}
              value={dados.justificativa}
              erro={erros.justificativa}
              onChange={(evento) => atualizar('justificativa', evento.target.value)}
            />

            <CampoTexto idioma={idioma}
              id="alcance"
              rotulo={tc.projeto.alcance}
              ajuda={tc.projeto.alcanceAjuda}
              value={dados.alcance}
              erro={erros.alcance}
              autoComplete="off"
              onChange={(evento) => atualizar('alcance', evento.target.value)}
            />

            <CampoArea idioma={idioma}
              id="distribuicao"
              rotulo={tc.projeto.distribuicao}
              ajuda={tc.projeto.distribuicaoAjuda}
              rows={3}
              value={dados.distribuicao}
              erro={erros.distribuicao}
              onChange={(evento) => atualizar('distribuicao', evento.target.value)}
            />

          </section>
        ) : null}

        {passo === 2 ? (
          <section className="pilha--g">
            <div className="pilha--p">
              <h2 style={{ margin: 0 }}>{tc.revisao.titulo}</h2>
              <p className="texto-secundario texto-pequeno" style={{ margin: 0 }}>
                {tc.revisao.descricao}
              </p>
            </div>

            <div className="cartao">
              <div className="linha linha--fim">
                <h3 className="cartao__titulo">{tc.proponente.titulo}</h3>
                <Botao variante="discreto" tamanho="pequeno" onClick={() => irPara(0)}>
                  {tc.corrigir}
                </Botao>
              </div>
              <div>
                <Item rotulo={tc.proponente.nome} valor={dados.nome} />
                <Item rotulo={tc.proponente.documento} valor={dados.documento} />
                <Item rotulo={tc.proponente.email} valor={dados.email} />
                <Item rotulo={tc.proponente.cidade} valor={dados.cidade} />
                <Item rotulo={tc.proponente.uf} valor={dados.uf} />
              </div>
            </div>

            <div className="cartao">
              <div className="linha linha--fim">
                <h3 className="cartao__titulo">{tc.projeto.titulo}</h3>
                <Botao variante="discreto" tamanho="pequeno" onClick={() => irPara(1)}>
                  {tc.corrigir}
                </Botao>
              </div>
              <div>
                <Item rotulo={tc.projeto.nome} valor={dados.projeto} />
                <Item rotulo={tc.projeto.descricao} valor={dados.descricao} />
                <Item rotulo={tc.projeto.formato} valor={dados.formato} />
                <Item rotulo={tc.projeto.valor} valor={moeda(Number(dados.valor))} />
                <Item rotulo={tc.projeto.justificativa} valor={dados.justificativa} />
                <Item rotulo={tc.projeto.alcance} valor={dados.alcance} />
                <Item rotulo={tc.projeto.distribuicao} valor={dados.distribuicao} />
              </div>
            </div>
          </section>
        ) : null}

        {Object.keys(erros).length > 0 ? (
          <p className="campo__erro" role="alert" style={{ margin: 0 }}>
            {tc.erros.resumo}
          </p>
        ) : null}

        <div className="linha linha--fim">
          <div className="linha">
            {passo > 0 ? (
              <Botao variante="secundario" onClick={() => irPara(passo - 1)}>
                {t.comum.acoes.voltar}
              </Botao>
            ) : (
              <Botao href={rota(idioma, `oportunidades/${edital.slug}`)} variante="secundario">
                {tc.voltarEdital}
              </Botao>
            )}
          </div>
          <div className="linha">
            <Botao type="submit">{passo < 2 ? t.comum.acoes.avancar : t.comum.acoes.enviar}</Botao>
          </div>
        </div>

        {passo < 2 ? (
          <p className="texto-mini" style={{ margin: 0 }}>
            {tc.obrigatorios}
          </p>
        ) : null}
      </form>
    </div>
  );
}
