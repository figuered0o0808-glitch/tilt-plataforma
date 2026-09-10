'use client';

/**
 * Cadastro: publico unico, criadores de conteudo.
 *
 * A pagina tem dois estados e quem decide e `cadastroAberto()`:
 *
 * - Enquanto nao houver chamada com inscricoes abertas nem curso com turma
 *   aberta, o cadastro nao desbloqueia nada e a pagina nao pede dado nenhum.
 * - Assim que /data trouxer uma chamada aberta ou um curso com turma aberta,
 *   o formulario abaixo volta a aparecer sozinho, sem mexer neste arquivo.
 *
 * A condicao e lida por idioma: cada idioma mostra apenas o que foi publicado
 * nele.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';

import type { RedeDoCriador } from '@/lib/types';

import { Botao } from '@/components/Botao';
import { CabecalhoPagina } from '@/components/CabecalhoPagina';
import { CampoSelecao, CampoTexto } from '@/components/Campo';
import { Selo } from '@/components/Selo';
import type { Idioma } from '@/i18n/idiomas';
import { textos } from '@/i18n/strings';
import { conteudo } from '@/lib/data';
import { rota } from '@/lib/rotas';
import { useApp } from '@/state/AppState';

/**
 * Condicao unica que reabre o cadastro e, junto com ele, o painel.
 *
 * O cadastro existe para candidatar projeto e para se inscrever em curso.
 * Sem nenhuma das duas coisas publicadas ele nao desbloqueia nada, e um
 * formulario que so guarda o que a pessoa digitou seria pior do que nao
 * ter formulario.
 */
export function cadastroAberto(idioma: Idioma): boolean {
  const { editais, cursos } = conteudo(idioma);
  return (
    editais.some((edital) => edital.status === 'aberta') ||
    cursos.some((curso) => curso.status === 'aberto')
  );
}

/**
 * Estado de hoje: sem chamada aberta e sem curso com turma aberta.
 *
 * A pagina inteira e um aviso, entao ela e o bloco preto: unica ancora forte,
 * sem cor chapada e sem lista repetindo o que o titulo ja diz.
 */
function CadastroFechado({ idioma }: { idioma: Idioma }) {
  const tc = textos(idioma).cadastro;
  const f = tc.fechado;

  return (
    <section className="secao secao--alta secao--preto">
      <div className="container-estreito">
        <p className="olho">{tc.olho}</p>
        <h1>{f.titulo}</h1>
        <p className="texto-guia">{f.descricao}</p>

        <div className="linha" style={{ marginTop: 30 }}>
          <Botao href={rota(idioma, 'oportunidades')} variante="secundario">
            {tc.verOportunidades}
          </Botao>
          <Botao href={rota(idioma, 'biblioteca')} variante="secundario">
            {tc.verBiblioteca}
          </Botao>
        </div>
      </div>
    </section>
  );
}

/** Acoes oferecidas depois que o cadastro existe. */
function Acoes({ idioma }: { idioma: Idioma }) {
  const tc = textos(idioma).cadastro;

  return (
    <div className="linha">
      <Botao href={rota(idioma, 'painel')}>{tc.irAoPainel}</Botao>
      <Botao href={rota(idioma, 'oportunidades')} variante="secundario">
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
function CadastroFormulario({ idioma }: { idioma: Idioma }) {
  const { cadastrado, nome: nomeCadastrado, hidratado, cadastrar } = useApp();

  const t = textos(idioma);
  const tc = t.cadastro;

  const [enviado, setEnviado] = useState(false);
  const confirmacao = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enviado) confirmacao.current?.focus();
  }, [enviado]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  /* O peso do cadastro esta aqui: onde a pessoa publica e para quantos. */
  const [redes, setRedes] = useState<RedeDoCriador[]>([
    { plataforma: '', perfil: '', seguidores: '' },
  ]);

  function alterarRede(indice: number, campo: keyof RedeDoCriador, valor: string) {
    setRedes((atuais) =>
      atuais.map((rede, i) => (i === indice ? { ...rede, [campo]: valor } : rede)),
    );
  }

  function acrescentarRede() {
    setRedes((atuais) => [...atuais, { plataforma: '', perfil: '', seguidores: '' }]);
  }

  function removerRede(indice: number) {
    setRedes((atuais) => atuais.filter((_, i) => i !== indice));
  }

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    cadastrar({
      nome,
      email,
      cidade,
      uf,
      redes: redes.filter((rede) => rede.plataforma && rede.perfil),
    });
    setEnviado(true);
  }

  const jaCadastrado = hidratado && cadastrado && !enviado;

  return (
    <>
      <CabecalhoPagina estreito olho={tc.olho} titulo={tc.titulo} descricao={tc.descricao} />

      <div className="secao">
        <div className="container-estreito">
          {enviado ? (
            <div className="cartao">
              <div className="destaque" role="status" tabIndex={-1} ref={confirmacao}>
                <p className="destaque__titulo">{tc.confirmacaoTitulo}</p>
                <p className="destaque__texto">{tc.confirmacaoTexto}</p>
              </div>
              <Acoes idioma={idioma} />
            </div>
          ) : jaCadastrado ? (
            <section className="cartao" aria-labelledby="cadastro-existente-titulo">
              <div className="linha">
                <Selo idioma={idioma} status="aberta" rotulo={tc.jaCadastradoSelo} />
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
              <Acoes idioma={idioma} />
            </section>
          ) : (
            <section
              className="cartao cartao--marcado"
              style={{ '--marca': 'var(--menta)' } as CSSProperties}
              aria-labelledby="cadastro-formulario-titulo"
            >
              <h2 className="cartao__titulo" id="cadastro-formulario-titulo">
                {tc.formularioTitulo}
              </h2>

              <form onSubmit={enviar} className="pilha">
                <CampoTexto idioma={idioma}
                  id="cadastro-nome"
                  rotulo={tc.campos.nome}
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  autoComplete="off"
                  required
                />
                <CampoTexto idioma={idioma}
                  id="cadastro-email"
                  rotulo={tc.campos.email}
                  type="email"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  autoComplete="off"
                  required
                />
                <div className="grade--2" style={{ gap: 14 }}>
                  <CampoTexto idioma={idioma}
                    id="cadastro-cidade"
                    rotulo={tc.campos.cidade}
                    value={cidade}
                    onChange={(evento) => setCidade(evento.target.value)}
                    autoComplete="off"
                    required
                  />
                  <CampoSelecao idioma={idioma}
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
                <fieldset
                  style={{
                    border: 0,
                    padding: 0,
                    margin: '10px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <legend style={{ padding: 0 }}>
                    <span className="campo__rotulo">{tc.redes.titulo}</span>
                  </legend>
                  <p className="campo__ajuda" style={{ marginTop: -6 }}>
                    {tc.redes.ajuda}
                  </p>

                  {redes.map((rede, indice) => (
                    <div key={indice} className="rede-linha">
                      <CampoSelecao
                        idioma={idioma}
                        id={`rede-plataforma-${indice}`}
                        rotulo={tc.redes.plataforma}
                        vazio={tc.redes.escolhaPlataforma}
                        opcoes={tc.redes.plataformas.map((nome) => ({
                          valor: nome,
                          rotulo: nome,
                        }))}
                        value={rede.plataforma}
                        onChange={(evento) => alterarRede(indice, 'plataforma', evento.target.value)}
                        required={indice === 0}
                      />
                      <CampoTexto
                        idioma={idioma}
                        id={`rede-perfil-${indice}`}
                        rotulo={tc.redes.perfil}
                        placeholder={tc.redes.perfilExemplo}
                        value={rede.perfil}
                        onChange={(evento) => alterarRede(indice, 'perfil', evento.target.value)}
                        autoComplete="off"
                        required={indice === 0}
                      />
                      <CampoTexto
                        idioma={idioma}
                        id={`rede-seguidores-${indice}`}
                        rotulo={tc.redes.seguidores}
                        placeholder={tc.redes.seguidoresExemplo}
                        inputMode="numeric"
                        value={rede.seguidores}
                        onChange={(evento) =>
                          alterarRede(indice, 'seguidores', evento.target.value.replace(/\D/g, ''))
                        }
                        autoComplete="off"
                      />
                      {redes.length > 1 ? (
                        <button
                          type="button"
                          className="btn btn--discreto btn--pequeno rede-linha__remover"
                          onClick={() => removerRede(indice)}
                        >
                          {tc.redes.remover}
                        </button>
                      ) : null}
                    </div>
                  ))}

                  <Botao variante="secundario" tamanho="pequeno" onClick={acrescentarRede}>
                    {tc.redes.acrescentar}
                  </Botao>
                </fieldset>

                <Botao type="submit" largo>
                  {tc.acao}
                </Botao>
              </form>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export function Cadastro({ idioma }: { idioma: Idioma }) {
  return cadastroAberto(idioma) ? (
    <CadastroFormulario idioma={idioma} />
  ) : (
    <CadastroFechado idioma={idioma} />
  );
}
