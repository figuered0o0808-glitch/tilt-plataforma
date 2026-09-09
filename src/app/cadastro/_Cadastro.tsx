'use client';

/**
 * Cadastro: publico unico, criadores de conteudo.
 *
 * A pagina tem dois estados e quem decide e `cadastroAberto()`:
 *
 * - Enquanto nao houver chamada com inscricoes abertas nem curso com turma
 *   aberta, o cadastro nao desbloqueia nada. Nesse caso a pagina explica
 *   quando ele abre, quanto custa e o que da acesso, e nao pede dado nenhum.
 * - Assim que /data trouxer uma chamada aberta ou um curso com turma aberta,
 *   o formulario abaixo volta a aparecer sozinho, sem mexer neste arquivo.
 */

import { useEffect, useRef, useState } from 'react';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { CampoSelecao, CampoTexto } from '@/components/Campo';
import { Selo } from '@/components/Selo';
import { t } from '@/i18n/strings';
import { cursos, editais } from '@/lib/data';
import { useApp } from '@/state/AppState';

const tc = t.cadastro;

/**
 * Condicao unica que reabre o cadastro e, junto com ele, o painel.
 *
 * O cadastro existe para candidatar projeto e para se inscrever em curso.
 * Sem nenhuma das duas coisas publicadas ele nao desbloqueia nada, e um
 * formulario que so guarda o que a pessoa digitou seria pior do que nao
 * ter formulario.
 */
export function cadastroAberto(): boolean {
  return (
    editais.some((edital) => edital.status === 'aberta') ||
    cursos.some((curso) => curso.status === 'aberto')
  );
}

/** Estado de hoje: sem chamada aberta e sem curso com turma aberta. */
function CadastroFechado() {
  const f = tc.fechado;

  return (
    <>
      <CabecalhoPagina olho={tc.olho} titulo={f.titulo} descricao={f.descricao} />

      <div className="secao">
        <div className="container">
          <div className="grade--lateral">
            <section aria-labelledby="cadastro-como-titulo">
              <h2 id="cadastro-como-titulo" style={{ marginBottom: 18 }}>
                {f.comoTitulo}
              </h2>

              <div>
                {f.itens.map((item) => (
                  <div className="registro" key={item.rotulo}>
                    <p className="registro__rotulo">{item.rotulo}</p>
                    <p style={{ margin: 0 }}>{item.texto}</p>
                  </div>
                ))}

                <div className="registro">
                  <p className="registro__rotulo">{f.acessoRotulo}</p>
                  <ul style={{ margin: 0 }}>
                    {f.acesso.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="registro">
                  <p className="registro__rotulo">{f.enquantoRotulo}</p>
                  <p style={{ margin: 0 }}>{f.enquantoTexto}</p>
                </div>
              </div>
            </section>

            <aside className="lateral">
              <div className="cartao cartao--azul">
                <p className="rotulo rotulo--forte" style={{ margin: 0 }}>
                  {f.situacaoTitulo}
                </p>
                <p className="texto-pequeno" style={{ margin: 0 }}>
                  {f.situacaoTexto}
                </p>
                <div className="linha" style={{ marginTop: 4 }}>
                  <Botao href="/oportunidades" variante="secundario" tamanho="pequeno">
                    {tc.verOportunidades}
                  </Botao>
                  <Botao href="/biblioteca" variante="secundario" tamanho="pequeno">
                    {tc.verBiblioteca}
                  </Botao>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/** Acoes oferecidas depois que o cadastro existe. */
function Acoes() {
  return (
    <div className="linha">
      <Botao href="/painel">{tc.irAoPainel}</Botao>
      <Botao href="/oportunidades" variante="secundario">
        {tc.verOportunidades}
      </Botao>
    </div>
  );
}

/**
 * Formulario de cadastro. So e montado quando `cadastroAberto()` e verdadeiro.
 *
 * Ao reabrir: hoje `cadastrar` apenas guarda o nome no navegador. Antes de
 * publicar o formulario de novo, o envio precisa de destino: sem isso, os
 * outros campos se perdem quando a pessoa troca de navegador.
 */
function CadastroFormulario() {
  const { cadastrado, nome: nomeCadastrado, hidratado, cadastrar } = useApp();

  const [enviado, setEnviado] = useState(false);
  const confirmacao = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enviado) confirmacao.current?.focus();
  }, [enviado]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [nicho, setNicho] = useState('');

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    cadastrar(nome);
    setEnviado(true);
  }

  const jaCadastrado = hidratado && cadastrado && !enviado;

  return (
    <>
      <CabecalhoPagina olho={tc.olho} titulo={tc.titulo} descricao={tc.descricao} />

      <div className="secao">
        <div className="container">
          <div className="grade--lateral">
            {enviado ? (
              <div className="cartao">
                <div className="destaque" role="status" tabIndex={-1} ref={confirmacao}>
                  <p className="destaque__titulo">{tc.confirmacaoTitulo}</p>
                  <p className="destaque__texto">{tc.confirmacaoTexto}</p>
                </div>
                <Acoes />
              </div>
            ) : jaCadastrado ? (
              <section className="cartao" aria-labelledby="cadastro-existente-titulo">
                <div className="linha">
                  <Selo status="aberta" rotulo={tc.jaCadastradoSelo} />
                </div>
                <h2 className="cartao__titulo" id="cadastro-existente-titulo">
                  {tc.jaCadastradoTitulo}
                </h2>
                <p className="cartao__texto">{tc.jaCadastradoTexto}</p>
                {nomeCadastrado ? (
                  <div className="registro">
                    <p className="registro__rotulo">{tc.nomeRotulo}</p>
                    <p style={{ margin: 0 }}>{nomeCadastrado}</p>
                  </div>
                ) : null}
                <Acoes />
              </section>
            ) : (
              <section className="cartao" aria-labelledby="cadastro-formulario-titulo">
                <h2 className="cartao__titulo" id="cadastro-formulario-titulo">
                  {tc.formularioTitulo}
                </h2>
                <p className="cartao__texto">{tc.formularioTexto}</p>

                <form onSubmit={enviar} className="pilha">
                  <CampoTexto
                    id="cadastro-nome"
                    rotulo={tc.campos.nome}
                    value={nome}
                    onChange={(evento) => setNome(evento.target.value)}
                    autoComplete="off"
                    required
                  />
                  <CampoTexto
                    id="cadastro-email"
                    rotulo={tc.campos.email}
                    type="email"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)}
                    autoComplete="off"
                    required
                  />
                  <div className="grade--2" style={{ gap: 14 }}>
                    <CampoTexto
                      id="cadastro-cidade"
                      rotulo={tc.campos.cidade}
                      value={cidade}
                      onChange={(evento) => setCidade(evento.target.value)}
                      autoComplete="off"
                      required
                    />
                    <CampoSelecao
                      id="cadastro-uf"
                      rotulo={tc.campos.uf}
                      vazio={t.fluxos.candidatura.selecioneUf}
                      opcoes={t.fluxos.candidatura.ufs.map((sigla) => ({
                        valor: sigla,
                        rotulo: sigla,
                      }))}
                      value={uf}
                      onChange={(evento) => setUf(evento.target.value)}
                      required
                    />
                  </div>
                  <CampoTexto
                    id="cadastro-nicho"
                    rotulo={tc.campos.nicho}
                    ajuda={tc.campos.nichoAjuda}
                    value={nicho}
                    onChange={(evento) => setNicho(evento.target.value)}
                    autoComplete="off"
                    required
                  />
                  <Botao type="submit" largo>
                    {tc.acao}
                  </Botao>
                </form>
              </section>
            )}

            <aside className="lateral">
              <div className="cartao cartao--azul">
                <p className="rotulo rotulo--forte" style={{ margin: 0 }}>
                  {tc.desbloqueiaTitulo}
                </p>
                <ul style={{ margin: 0 }}>
                  {tc.desbloqueia.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="texto-pequeno" style={{ margin: 0 }}>
                  {tc.aberto}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export function Cadastro() {
  return cadastroAberto() ? <CadastroFormulario /> : <CadastroFechado />;
}
