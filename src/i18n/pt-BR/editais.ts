/**
 * Strings da aba de oportunidades: lista de chamadas, pagina de cada chamada
 * e bloco de resultado publicado.
 */
export const editais = {
  listaOlho: 'Financiamento a projetos autorais',
  listaTitulo: 'Oportunidades',
  listaDescricao:
    'Chamadas públicas para projetos propostos e conduzidos por criadores. Cada chamada publica os critérios de seleção, a composição da banca e, ao fim, a relação integral de apoiados e valores.',
  tiposExplicacao:
    'Do tema amplo à pauta encomendada por uma organização, todas as chamadas seguem as mesmas regras de seleção e de publicidade do resultado.',

  resumoTitulo: 'Situação do ciclo',
  resumoAbertas: 'Chamadas com inscrições abertas',
  resumoRecursos: 'Recursos nas chamadas abertas',
  resumoApoiados: 'Projetos apoiados em chamadas encerradas',

  /* Estado da aba enquanto nenhuma chamada foi publicada. */
  semChamadaOlho: 'Situação do programa',
  semChamadaTitulo: 'Ainda não há chamada aberta',
  semChamadaTexto:
    'A primeira chamada do programa ainda não foi publicada. Quando for, ela aparece nesta página com o texto integral, os critérios de seleção e o prazo de inscrição.',
  chamadaTrazTitulo: 'O que uma chamada traz quando é publicada',
  chamadaTraz: [
    {
      rotulo: 'Escopo',
      texto: 'O que a chamada apoia, o que ela não apoia e os formatos aceitos.',
    },
    {
      rotulo: 'Critérios e pesos',
      texto:
        'Os critérios de seleção com o peso de cada um. Os critérios são publicados antes da abertura das inscrições e não mudam durante a chamada.',
    },
    {
      rotulo: 'Banca',
      texto:
        'Nome, afiliação e minibio de cada integrante da banca que avalia as propostas, publicados antes do início das inscrições.',
    },
    {
      rotulo: 'Cronograma',
      texto:
        'As datas de cada etapa: abertura e encerramento das inscrições, avaliação e divulgação do resultado.',
    },
    {
      rotulo: 'Distribuição dos apoios',
      texto:
        'O total de recursos da chamada, a faixa de valor por projeto e quantos projetos o programa pretende apoiar em cada faixa.',
    },
    {
      rotulo: 'Resultado',
      texto:
        'A relação integral dos apoiados, com nome, projeto e valor recebido, e a fundamentação da decisão da banca.',
    },
  ],
  autonomiaValeTitulo: 'O que já vale desde agora',
  autonomiaValeTexto:
    'As condições de autonomia editorial abaixo valem para qualquer chamada do programa e não mudam de uma chamada para outra.',
  prepararTitulo: 'O que você pode adiantar',
  prepararTexto:
    'Uma proposta é escrita em torno dos itens abaixo. Eles podem ser preparados antes de qualquer chamada abrir.',
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
  vazioDescricao: 'Limpe os filtros para ver a lista completa.',

  proponente: 'Proponente',
  proponenteProprio: 'Recursos próprios do programa',
  numerosTitulo: 'Números da chamada',
  nestaPagina: 'Nesta página',
  voltarLista: 'Ver todas as chamadas',
  verResultado: 'Ver o resultado',

  secoes: {
    apresentacao: 'Apresentação',
    escopo: 'O que é apoiado',
    naoApoiado: 'O que não é apoiado',
    criterios: 'Critérios de seleção',
    banca: 'Composição da banca',
    distribuicao: 'Distribuição prevista dos apoios',
    cronograma: 'Cronograma',
    faq: 'Perguntas frequentes',
    resultado: 'Resultado',
  },

  criteriosNota:
    'Os critérios e seus pesos são publicados antes da abertura das inscrições e não mudam durante a chamada.',
  pesoRotulo: 'Peso',
  somaPesos: 'Soma dos pesos',
  perguntaRotulo: 'Pergunta',
  bancaNota:
    'A banca é publicada com nome, afiliação e minibio de cada integrante antes do início das inscrições.',
  distribuicaoNota:
    'Parâmetro indicativo. A distribuição final depende das propostas recebidas e da decisão da banca.',
  distribuicaoColunas: {
    faixa: 'Faixa de apoio',
    quantidade: 'Projetos previstos',
    observacao: 'Observação',
  },

  resultadoOlho: 'Chamada encerrada',
  resultadoFundamentacao: 'Fundamentação da decisão',
  resultadoTabelaTitulo: 'Relação integral de apoiados',
  resultadoNota:
    'A relação de apoiados fica publicada depois do fim do ciclo, junto com os critérios que valeram na chamada.',
  resultadoColunas: {
    apoiado: 'Apoiado',
    projeto: 'Projeto',
    formato: 'Formato',
    uf: 'UF',
    valor: 'Valor',
  },
  totalApoiado: 'Total apoiado',
  inscricoesRecebidas: 'Inscrições recebidas',
  projetosApoiados: 'Projetos apoiados',
  resultadoPublicadoEm: 'Resultado publicado em',
  inscricoesEncerradasEm: 'Inscrições encerradas em',
  resultadoPrevistoPara: 'Resultado previsto para',

  candidaturaTitulo: 'Candidatura',
  encerradaAviso: 'Esta chamada está encerrada. As inscrições não estão mais disponíveis.',
  emAvaliacaoAviso:
    'As inscrições estão encerradas e as propostas estão em avaliação pela banca.',
} as const;
