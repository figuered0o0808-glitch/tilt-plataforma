'use client';

/**
 * Estado local da pessoa que navega: cadastro, candidaturas enviadas e
 * inscricoes em curso. Nao ha divisao de papel: quem entra e sempre a mesma
 * pessoa, e o cadastro apenas desbloqueia a area de acompanhamento.
 *
 * Persiste em localStorage quando disponivel. Nada quebra sem ele: o estado
 * inicial vem sempre do conteudo publicado, e todo acesso ao storage e protegido.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { DATA_REFERENCIA, STORAGE_KEY } from '@/config/program';
import { proximoId } from '@/lib/format';
import type { Candidatura, PerfilCadastro } from '@/lib/types';
import {
  enviarCadastro as enviarCadastroParaIndica,
  enviarCandidatura as enviarCandidaturaParaIndica,
} from '@/lib/envio';

interface Estado {
  cadastrado: boolean;
  nome: string;
  perfil: PerfilCadastro | null;
  candidaturas: Candidatura[];
  cursosInscritos: string[];
}

function estadoInicial(): Estado {
  return {
    cadastrado: false,
    nome: '',
    perfil: null,
    candidaturas: [],
    cursosInscritos: [],
  };
}

export interface NovaCandidatura {
  editalSlug: string;
  editalTitulo: string;
  projeto: string;
  formato: string;
  valorSolicitado: number;
  /**
   * Dados de quem propoe, para o envio a INDICA.
   *
   * Opcional porque o estado local nao precisa deles: o painel do criador mostra
   * projeto, valor e situacao, e nao repete o que a pessoa digitou sobre si.
   * Quem preenche este campo e o formulario de candidatura, que os tem em maos.
   * Enquanto ele nao preencher, a candidatura chega a API sem identificacao do
   * proponente, o que a API deve recusar.
   */
  proponente?: Record<string, string>;
}

interface ContextoApp extends Estado {
  hidratado: boolean;
  cadastrar: (perfil: PerfilCadastro) => void;
  enviarCandidatura: (dados: NovaCandidatura) => Candidatura;
  inscreverCurso: (slug: string) => void;
  estaInscrito: (slug: string) => boolean;
  reiniciar: () => void;
}

const Contexto = createContext<ContextoApp | null>(null);

function ler(): Partial<Estado> | null {
  if (typeof window === 'undefined') return null;
  try {
    const bruto = window.localStorage.getItem(STORAGE_KEY);
    return bruto ? (JSON.parse(bruto) as Partial<Estado>) : null;
  } catch {
    return null;
  }
}

function gravar(estado: Estado): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch {
    /* modo privado ou storage cheio: a navegacao segue em memoria */
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>(estadoInicial);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    const salvo = ler();
    if (salvo) setEstado((atual) => ({ ...atual, ...salvo }));
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (hidratado) gravar(estado);
  }, [estado, hidratado]);

  const cadastrar = useCallback((perfil: PerfilCadastro) => {
    setEstado((atual) => ({
      ...atual,
      cadastrado: true,
      nome: perfil.nome.trim(),
      perfil,
    }));

    /*
     * Sai daqui para a INDICA quando ha destino configurado (ver src/lib/envio.ts).
     * Sem destino, nao ha requisicao nenhuma, e e esse o estado de hoje.
     * O envio nao e esperado de proposito: a confirmacao na tela responde ao que
     * a pessoa fez, e nao ao que a rede conseguiu fazer.
     */
    void enviarCadastroParaIndica(perfil);
  }, []);

  const enviarCandidatura = useCallback(
    (dados: NovaCandidatura): Candidatura => {
      const nova: Candidatura = {
        id: proximoId('cand', estado.candidaturas),
        editalSlug: dados.editalSlug,
        editalTitulo: dados.editalTitulo,
        projeto: dados.projeto,
        formato: dados.formato,
        valorSolicitado: dados.valorSolicitado,
        enviadaEm: DATA_REFERENCIA,
        status: 'enviada',
      };
      setEstado((atual) => ({
        ...atual,
        cadastrado: true,
        candidaturas: [nova, ...atual.candidaturas],
      }));

      /* Mesmo desenho do cadastro: nao espera e nao bloqueia a confirmacao. */
      void enviarCandidaturaParaIndica({
        chamadaSlug: dados.editalSlug,
        proponente: dados.proponente ?? {},
        projeto: { titulo: dados.projeto, formato: dados.formato },
        valorSolicitado: dados.valorSolicitado,
      });

      return nova;
    },
    [estado.candidaturas],
  );

  const inscreverCurso = useCallback((slug: string) => {
    setEstado((atual) =>
      atual.cursosInscritos.includes(slug)
        ? atual
        : { ...atual, cadastrado: true, cursosInscritos: [...atual.cursosInscritos, slug] },
    );
  }, []);

  const reiniciar = useCallback(() => {
    setEstado(estadoInicial());
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* sem storage, nada a limpar */
      }
    }
  }, []);

  const valor = useMemo<ContextoApp>(
    () => ({
      ...estado,
      hidratado,
      cadastrar,
      enviarCandidatura,
      inscreverCurso,
      estaInscrito: (slug: string) => estado.cursosInscritos.includes(slug),
      reiniciar,
    }),
    [estado, hidratado, cadastrar, enviarCandidatura, inscreverCurso, reiniciar],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useApp(): ContextoApp {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error('useApp precisa estar dentro de AppProvider');
  return contexto;
}
