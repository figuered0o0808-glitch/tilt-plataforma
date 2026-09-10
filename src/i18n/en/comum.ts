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
    abrirMenu: 'Open navigation',
    fecharMenu: 'Close navigation',
  },
  acoes: {
    candidatarProjeto: 'Apply with a project',
    verEdital: 'View call',
    verCurso: 'View course',
    lerMaterial: 'Read material',
    inscreverse: 'Enroll',
    inscrito: 'Enrollment recorded',
    voltar: 'Back',
    avancar: 'Next',
    revisar: 'Review',
    enviar: 'Submit',
    baixar: 'Download',
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
  tiposEdital: {
    'tema-amplo': 'Broad theme',
    macrotema: 'Funder macro theme',
    'pauta-especifica': 'Specific topic',
    'edital-organizacao': 'Organization call',
  },
  rotulos: {
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
  rodape: {
    descricao:
      'Platform by INDICA and TILT. Funding for original projects and training for creators, and open technical materials for creators and organizations. Pilot in Brazil.',
    programa: 'Program',
    navegue: 'Browse',
  },
} as const;
