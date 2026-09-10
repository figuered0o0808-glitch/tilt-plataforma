/**
 * Strings da aba de oportunidades, em ingles: lista de chamadas, pagina de
 * cada chamada e bloco de resultado publicado.
 */
export const editais = {
  listaOlho: 'Funding for original projects',
  listaTitulo: 'Opportunities',

  resumoTitulo: 'Cycle status',
  resumoAbertas: 'Calls open for applications',
  resumoRecursos: 'Funding in the open calls',
  resumoApoiados: 'Projects supported in closed calls',

  /* Estado da aba enquanto nenhuma chamada foi publicada. */
  semChamadaTitulo: 'No call is open yet',
  semChamadaTexto:
    'The first call will be published on this page, with the full text, the selection criteria, the panel and the application deadline. The result stays published on the call page, with the list of recipients and the amounts.',
  prepararTitulo: 'What you can prepare ahead',
  prepararItens: [
    'Project title and description, with the approach and the number of pieces',
    'Content format',
    'Amount requested and justification of the costs',
    'Reach estimate and the basis for the calculation',
    'Distribution plan, with channels and frequency',
  ],

  filtrosTitulo: 'Filters',
  filtroStatus: 'Status',
  filtroTipo: 'Call type',
  todasSituacoes: 'All',
  todosTipos: 'All',
  limparFiltros: 'Clear filters',
  contagemUma: 'call',
  contagemVarias: 'calls',
  vazioTitulo: 'No call matches these filters',

  proponente: 'Funder',
  proponenteProprio: 'Program funds',
  numerosTitulo: 'Call figures',
  nestaPagina: 'On this page',
  voltarLista: 'See all calls',
  verResultado: 'See the result',

  /* Chamada com calendario ainda em aberto: nenhuma data e escrita. */
  prazoADefinir: 'Deadline to be defined',
  semPrazo: 'To be defined',

  secoes: {
    apresentacao: 'Overview',
    escopo: 'What is supported',
    naoApoiado: 'What is not supported',
    criterios: 'Selection criteria',
    banca: 'Panel',
    distribuicao: 'Distribution of the support',
    cronograma: 'Schedule',
    resultado: 'Result',
  },

  /* Chamada que ordena os criterios em vez de atribuir peso numerico. */
  criteriosOrdem: 'The criteria are listed in order of weight.',
  pesoRotulo: 'Weight',
  somaPesos: 'Sum of the weights',
  perguntaRotulo: 'Question',
  bancaSemComposicao:
    'The panel brings together members of INDICA, a representative of the funder and invited creators. Its composition is published before applications close.',
  distribuicaoColunas: {
    faixa: 'Support range',
    quantidade: 'Projects expected',
    observacao: 'Note',
  },

  publicadoEm: 'Published on',
  resultadoFundamentacao: 'Grounds for the decision',
  resultadoTabelaTitulo: 'Full list of recipients',
  resultadoColunas: {
    apoiado: 'Recipient',
    projeto: 'Project',
    formato: 'Format',
    uf: 'State',
    valor: 'Amount',
  },
  totalApoiado: 'Total support',
  inscricoesRecebidas: 'Applications received',
  projetosApoiados: 'Projects supported',
  resultadoPublicadoEm: 'Result published on',
  inscricoesEncerradasEm: 'Applications closed on',
  resultadoPrevistoPara: 'Result expected for',

  candidaturaTitulo: 'Application',
  encerradaAviso: 'Applications are closed.',
  emAvaliacaoAviso:
    'Applications are closed and the proposals are under review by the panel.',
} as const;
