/**
 * Strings da home. Duas areas apenas: oportunidades e biblioteca.
 *
 * A home tem dois estados. Antes da primeira publicacao, valem as chaves de
 * "inicio", "areas" e "estado". Quando houver chamada, curso ou material
 * publicado, voltam a valer as chaves de numeros, chamadas e biblioteca.
 */
export const home = {
  frase: 'Um laboratório de criadores para o interesse público.',
  apresentacao:
    'O programa financia projetos de criadores de conteúdo sobre ciência, clima, meio ambiente, saúde pública e democracia. A proposta é do criador, e a decisão editorial também.',

  /* Caminho de entrada quando já existe conteúdo publicado. */
  entrarPrincipal: 'Criar cadastro',
  entrarPainel: 'Ir para o painel',
  entrarSecundario: 'Ver chamadas abertas',
  entrarNota: 'O cadastro é gratuito e não exige número mínimo de seguidores.',

  /* Caminho de entrada enquanto nada foi publicado. */
  inicioAcao: 'Como o programa funciona',
  inicioAcaoAreas: 'Ver as duas áreas',
  inicioNota: 'Nenhuma chamada aberta.',

  areasTitulo: 'Duas áreas',
  areas: [
    {
      titulo: 'Oportunidades',
      href: '/oportunidades',
      desenho: 'edital',
      texto:
        'Chamadas de financiamento. Cada uma traz critérios, banca, cronograma e valores.',
      acao: 'Abrir oportunidades',
    },
    {
      titulo: 'Biblioteca',
      href: '/biblioteca',
      desenho: 'material',
      texto:
        'Cursos gratuitos e material técnico em licença aberta, em duas trilhas: criadores e organizações.',
      acao: 'Abrir a biblioteca',
    },
  ],

  numeros: {
    recursos: 'Em chamadas abertas',
    chamadas: 'Chamadas com inscrição aberta',
    cursos: 'Cursos no catálogo',
    materiais: 'Materiais publicados',
  },

  chamadasTitulo: 'Aberto agora',
  chamadasTituloSemAbertas: 'Chamadas do programa',
  chamadasTexto:
    'Cada chamada publica critérios de seleção, composição da banca e cronograma antes de receber inscrições.',
  chamadasAcao: 'Ver todas as chamadas',
  rotuloProponente: 'Proponente',

  desenhoTitulo: 'O desenho do programa',
  desenhoTexto: 'Valem para toda chamada, e vão escritas por extenso em cada uma.',
  desenho: [
    {
      rotulo: 'Autonomia editorial',
      texto:
        'Não há aprovação prévia de roteiro, corte ou publicação. A titularidade da propriedade intelectual permanece com quem cria.',
    },
    {
      rotulo: 'Critérios e banca',
      texto:
        'Os critérios de seleção, os pesos de cada um e os nomes de quem avalia são publicados antes da abertura das inscrições.',
    },
    {
      rotulo: 'Resultado público',
      texto:
        'A chamada encerrada publica a relação integral de projetos apoiados, com nomes e valores, e a fundamentação da banca.',
    },
  ],
  desenhoLinkChamada: 'Ver uma chamada por dentro',
  desenhoLinkResultado: 'Ver um resultado publicado',

  recursosTitulo: 'Biblioteca',
  recursosTexto:
    'A segunda área reúne formação e material de consulta, em duas trilhas: uma para criadores e uma para organizações que trabalham com essas pautas. A leitura é livre; a inscrição no curso pede cadastro.',
  recursosAcao: 'Abrir a biblioteca',
  cursoOlho: 'Curso inaugural',
  cursoDuracao: 'Duração',
  cursoTurma: 'Próxima turma',
  cursoModulos: 'módulos',
  materiaisOlho: 'Materiais de consulta',
  materiaisContagem: 'materiais publicados',
  materiaisTexto:
    'Guias e notas técnicas curtas. Para criadores, declaração de apoio e checagem antes de publicar. Para organizações, briefing que respeita a autonomia e medição de resultado.',
  materiaisLicenca: 'Licença',
  materiaisAcao: 'Ver materiais',
} as const;
