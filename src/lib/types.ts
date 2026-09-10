/** Tipos do conteudo publicado em /data. Contrato unico da aplicacao. */

export type Regiao = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

export type StatusEdital = 'aberta' | 'em-avaliacao' | 'encerrada';

export type TipoEdital =
  | 'tema-amplo'
  | 'macrotema'
  | 'pauta-especifica'
  | 'edital-organizacao';

export interface CriterioSelecao {
  titulo: string;
  /** Ausente quando a chamada ordena os criterios sem atribuir peso numerico. */
  peso?: number;
  descricao: string;
}

export interface MembroBanca {
  nome: string;
  afiliacao: string;
  minibio: string;
}

export interface FaixaDistribuicao {
  faixa: string;
  quantidade: string;
  observacao?: string;
}

export interface EtapaCronograma {
  etapa: string;
  data: string;
}

export interface Apoiado {
  nome: string;
  projeto: string;
  formato: string;
  uf: string;
  valor: number;
}

export interface ResultadoEdital {
  fundamentacao: string;
  publicadoEm: string;
  inscricoesRecebidas: number;
  apoiados: Apoiado[];
}

export interface Call {
  slug: string;
  titulo: string;
  /** Quem opera a chamada. A marca aparece na pagina. */
  organizacao?: string;
  logoOrganizacao?: string;
  status: StatusEdital;
  tipo: TipoEdital;
  resumo: string;
  proponente: string | null;
  apresentacao: string[];
  escopo: string[];
  naoApoiado: string[];
  criterios: CriterioSelecao[];
  banca: MembroBanca[];
  distribuicao: FaixaDistribuicao[];
  valorTotal: number;
  faixaApoio: { min: number; max: number };
  /** Nulo enquanto o calendario da chamada nao esta fechado. */
  inscricoesAte: string | null;
  cronograma: EtapaCronograma[];
  resultado: ResultadoEdital | null;
}

export interface ModuloCurso {
  numero: number;
  titulo: string;
  descricao: string;
}

export interface Course {
  slug: string;
  titulo: string;
  status: 'aberto' | 'em-breve';
  resumo: string;
  descricao: string[];
  paraQuem: string[];
  modulos: ModuloCurso[];
  duracao: string;
  formato: string;
  proximaTurma: string;
}

export type Trilha = 'criadores' | 'organizacoes';

export interface SecaoArtigo {
  titulo: string;
  paragrafos: string[];
}

export interface ArquivoMaterial {
  idioma: string;
  arquivo: string;
  paginas?: number;
}

export interface Article {
  slug: string;
  titulo: string;
  trilha: Trilha;
  /** Quem assina. Varias organizacoes publicam na mesma biblioteca. */
  autoria: string[];
  organizacao: string;
  /** Marca da organizacao que publica, em /public/organizacoes. */
  logoOrganizacao?: string;
  /** Capa da publicacao, em /public/materiais/capas. Sem ela, entra a capa gerada. */
  capa?: string;
  /** Tematica geral, usada como filtro e como chip. */
  tema: string;
  palavrasChave: string[];
  resumo: string;
  formato: string;
  tempoLeitura?: string;
  atualizadoEm: string;
  secoes: SecaoArtigo[];
  arquivos: ArquivoMaterial[];
  licenca?: string;
}

export type StatusCandidatura =
  | 'em-avaliacao'
  | 'aprovada'
  | 'nao-selecionada'
  | 'enviada';

export interface Candidatura {
  id: string;
  editalSlug: string;
  editalTitulo: string;
  projeto: string;
  formato: string;
  valorSolicitado: number;
  enviadaEm: string;
  status: StatusCandidatura;
}

export interface CursoDoCriador {
  cursoSlug: string;
  titulo: string;
  status: 'inscrito' | 'em-andamento' | 'concluido';
  progresso: number;
}

export interface PanelData {
  candidaturas: Candidatura[];
  cursos: CursoDoCriador[];
}


/** Uma rede declarada no cadastro. */
export interface RedeDoCriador {
  plataforma: string;
  perfil: string;
  seguidores: string;
}

/** O que o cadastro coleta. Curto de proposito: o peso esta nas redes. */
export interface PerfilCadastro {
  nome: string;
  email: string;
  pais: string;
  cidade: string;
  uf: string;
  /** Nichos em que a pessoa atua. Varios, porque quase ninguem faz um so. */
  nichos: string[];
  redes: RedeDoCriador[];
}
