/**
 * Strings comuns da interface, em ingles.
 * Nao usar travessao em nenhum texto. Sem emoji e sem exclamacao.
 */
export const comum = {
  navegacao: {
    principal: 'Main navigation',
    editais: 'Opportunities',
    biblioteca: 'Library',
    painel: 'My dashboard',
    pularParaConteudo: 'Skip to content',
  },
  acoes: {
    candidatarProjeto: 'Apply with a project',
    verEdital: 'View call',
    verCurso: 'View course',
    inscreverse: 'Enroll',
    inscrito: 'Enrollment recorded',
    voltar: 'Back',
    avancar: 'Next',
    enviar: 'Submit',
  },
  status: {
    aberta: 'Applications open',
    'em-avaliacao': 'Under review',
    encerrada: 'Closed',
    aprovada: 'Approved',
    'nao-selecionada': 'Not selected',
    enviada: 'Submitted',
    concluido: 'Completed',
    inscrito: 'Enrolled',
    'em-andamento': 'In progress',
    aberto: 'Class open',
    'em-breve': 'Coming soon',
  },
  publicoEdital: {
    criadores: 'For creators',
    organizacoes: 'For organizations',
    ambos: 'For creators and organizations',
  },
  tiposEdital: {
    'tema-amplo': 'Broad theme',
    macrotema: 'Funder macro theme',
    'pauta-especifica': 'Specific topic',
    'edital-organizacao': 'Organization call',
  },
  rotulos: {
    idioma: 'Language',
    busca: 'Search',
    resultado: 'Result',
    prazo: 'Deadline',
    valor: 'Amount',
    valorTotal: 'Call funding',
    apoio: 'Support per project',
    inscricoesAte: 'Applications until',
    obrigatorio: 'Required field',
    opcional: 'optional',
    nenhumResultado: 'No results',
  },
  naoEncontrado: {
    titulo: 'Page not found',
    texto: 'The address you opened does not exist on this site.',
    acao: 'Back to the home page',
  },
  rodape: {
    descricao:
      'Platform by INDICA and TILT. Funding for original projects and training for creators, and open technical materials for creators and organizations.',
    programa: 'Program',
    navegue: 'Browse',
  },
} as const;
