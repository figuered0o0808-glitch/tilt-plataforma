/**
 * Strings da aba de oportunidades, em espanhol: lista de chamadas, pagina de
 * cada chamada e bloco de resultado publicado.
 */
export const editais = {
  termoEtapaResultado: 'resultado',
  posicaoSufixo: '.º',
  faixaSeparador: 'a',
  listaTitulo: 'Oportunidades',

  resumoTitulo: 'Situación del ciclo',
  resumoAbertas: 'Convocatorias con inscripciones abiertas',
  resumoRecursos: 'Recursos en las convocatorias abiertas',
  resumoApoiados: 'Proyectos apoyados en convocatorias cerradas',

  /* Estado da aba enquanto nenhuma chamada foi publicada. */
  semChamadaTitulo: 'Todavía no hay convocatoria abierta',
  semChamadaTexto:
    'La primera convocatoria trae el texto íntegro, los criterios de selección, el jurado y el plazo de inscripción.',
  prepararTitulo: 'Lo que puedes adelantar',
  prepararItens: [
    'Título y descripción del proyecto, con el enfoque y la cantidad de piezas',
    'Formato del contenido',
    'Monto solicitado y justificación de los costos',
    'Estimación de alcance y la base del cálculo',
    'Plan de distribución, con canales y periodicidad',
  ] as readonly string[],

  filtrosTitulo: 'Filtros',
  filtroStatus: 'Situación',
  filtroTipo: 'Tipo de convocatoria',
  todasSituacoes: 'Todas',
  todosTipos: 'Todos',
  limparFiltros: 'Limpiar filtros',
  contagemUma: 'convocatoria',
  contagemVarias: 'convocatorias',
  vazioTitulo: 'Ninguna convocatoria con estos filtros',

  proponente: 'Proponente',
  proponenteProprio: 'Recursos propios del programa',
  numerosTitulo: 'Números de la convocatoria',
  nestaPagina: 'En esta página',
  voltarLista: 'Ver todas las convocatorias',
  verResultado: 'Ver el resultado',

  /* Chamada com calendario ainda em aberto: nenhuma data e escrita. */
  prazoADefinir: 'Plazo por definir',
  semPrazo: 'Por definir',

  secoes: {
    apresentacao: 'Presentación',
    escopo: 'Lo que se apoya',
    naoApoiado: 'Lo que no se apoya',
    criterios: 'Criterios de selección',
    banca: 'Jurado',
    distribuicao: 'Distribución de los apoyos',
    cronograma: 'Cronograma',
    resultado: 'Resultado',
  },

  /* Chamada que ordena os criterios em vez de atribuir peso numerico. */
  criteriosOrdem: 'Los criterios están listados en orden de peso.',
  pesoRotulo: 'Peso',
  somaPesos: 'Suma de los pesos',
  perguntaRotulo: 'Pregunta',
  bancaSemComposicao:
    'El jurado reúne integrantes de INDICA, un representante del financiador y creadores invitados. La composición se publica antes del cierre de las inscripciones.',
  distribuicaoColunas: {
    faixa: 'Rango de apoyo',
    quantidade: 'Proyectos previstos',
    observacao: 'Observación',
  },

  publicadoEm: 'Publicado el',
  resultadoFundamentacao: 'Fundamentación de la decisión',
  resultadoTabelaTitulo: 'Proyectos seleccionados',
  resultadoColunas: {
    apoiado: 'Apoyado',
    projeto: 'Proyecto',
    formato: 'Formato',
    uf: 'UF',
  },
  inscricoesRecebidas: 'Inscripciones recibidas',
  projetosApoiados: 'Proyectos apoyados',
  resultadoPublicadoEm: 'Resultado publicado el',
  inscricoesEncerradasEm: 'Inscripciones cerradas el',
  resultadoPrevistoPara: 'Resultado previsto para',

  /* Compartilhamento: o endereco fica escrito na pagina, sem script de rede. */
  compartilharTitulo: 'Compartir la convocatoria',
  copiarEndereco: 'Copiar dirección',
  enderecoCopiado: 'Dirección copiada.',

  candidaturaTitulo: 'Postulación',
  encerradaAviso: 'Las inscripciones están cerradas.',
  emAvaliacaoAviso:
    'Las inscripciones están cerradas y las propuestas están en evaluación por el jurado.',
};
