/**
 * Strings da aba de oportunidades: lista de chamadas, pagina de cada chamada
 * e bloco de resultado publicado.
 */
export const editais = {
  listaTitulo: 'Oportunidades',

  resumoTitulo: 'Situação do ciclo',
  resumoAbertas: 'Chamadas com inscrições abertas',
  resumoRecursos: 'Recursos nas chamadas abertas',
  resumoApoiados: 'Projetos apoiados em chamadas encerradas',

  /* Estado da aba enquanto nenhuma chamada foi publicada. */
  semChamadaTitulo: 'Ainda não há chamada aberta',
  semChamadaTexto:
    'A primeira chamada será publicada nesta página, com o texto integral, os critérios de seleção, a banca e o prazo de inscrição.',
  prepararTitulo: 'O que você pode adiantar',
  prepararItens: [
    'Título e descrição do projeto, com a abordagem e a quantidade de peças',
    'Formato do conteúdo',
    'Valor solicitado e justificativa dos custos',
    'Estimativa de alcance e a base do cálculo',
    'Plano de distribuição, com canais e periodicidade',
  ],

  filtrosTitulo: 'Filtros',
  filtroStatus: 'Situação',
  filtroTipo: 'Tipo de chamada',
  todasSituacoes: 'Todas',
  todosTipos: 'Todos',
  limparFiltros: 'Limpar filtros',
  contagemUma: 'chamada',
  contagemVarias: 'chamadas',
  vazioTitulo: 'Nenhuma chamada com esses filtros',

  proponente: 'Proponente',
  proponenteProprio: 'Recursos próprios do programa',
  numerosTitulo: 'Números da chamada',
  nestaPagina: 'Nesta página',
  voltarLista: 'Ver todas as chamadas',
  verResultado: 'Ver o resultado',

  /* Chamada com calendario ainda em aberto: nenhuma data e escrita. */
  prazoADefinir: 'Prazo a definir',
  semPrazo: 'A definir',

  /* Liga os dois extremos de uma faixa de valor: 5.000 a 20.000. */
  faixaSeparador: 'a',

  secoes: {
    apresentacao: 'Apresentação',
    escopo: 'O que é apoiado',
    naoApoiado: 'O que não é apoiado',
    criterios: 'Critérios de seleção',
    banca: 'Banca',
    distribuicao: 'Distribuição dos apoios',
    cronograma: 'Cronograma',
    resultado: 'Resultado',
  },

  /* Chamada que ordena os criterios em vez de atribuir peso numerico. */
  criteriosOrdem: 'Os critérios estão listados em ordem de peso.',
  pesoRotulo: 'Peso',
  /* Vem depois do numero da posicao do criterio: 1º, 2º, 3º. */
  posicaoSufixo: 'º',
  somaPesos: 'Soma dos pesos',
  perguntaRotulo: 'Pergunta',
  bancaSemComposicao:
    'A banca reúne integrantes da INDICA, um representante do financiador e criadores convidados. A composição é publicada antes do fim das inscrições.',
  distribuicaoColunas: {
    faixa: 'Faixa de apoio',
    quantidade: 'Projetos previstos',
    observacao: 'Observação',
  },

  publicadoEm: 'Publicado em',
  resultadoFundamentacao: 'Fundamentação da decisão',
  resultadoTabelaTitulo: 'Projetos selecionados',
  resultadoColunas: {
    apoiado: 'Apoiado',
    projeto: 'Projeto',
    formato: 'Formato',
    uf: 'UF',
  },
  inscricoesRecebidas: 'Inscrições recebidas',
  projetosApoiados: 'Projetos apoiados',
  resultadoPublicadoEm: 'Resultado publicado em',
  inscricoesEncerradasEm: 'Inscrições encerradas em',
  resultadoPrevistoPara: 'Resultado previsto para',
  /*
   * Nao aparece na tela: e o termo procurado no nome das etapas do cronograma
   * para achar a divulgacao do resultado. Em minusculas, no idioma dos dados.
   */
  termoEtapaResultado: 'resultado',

  candidaturaTitulo: 'Candidatura',
  encerradaAviso: 'As inscrições estão encerradas.',
  emAvaliacaoAviso:
    'As inscrições estão encerradas e as propostas estão em avaliação pela banca.',
} as const;
