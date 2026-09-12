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
  inicioAcao: 'Ver oportunidades',
  inicioAcaoAreas: 'Ver a biblioteca',
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

  /* A home nova: o enxame e a porta, as colunas sao a casa. */
  ponte: 'Aberto agora · Cadastro · Biblioteca',
  coluna: {
    apoio: 'Apoio por projeto',
    proponente: 'Proponente',
    vagas: 'Vagas',
    vagasFaixa: 'De {min} a {max} projetos apoiados.',
    vagasSelecionados: '{n} selecionados, {r} vagas abertas.',
    verChamada: 'Ver a chamada',
    semChamada: 'Nenhuma chamada aberta no momento.',
    verOportunidades: 'Ver oportunidades',
    cadastroOlho: 'Cadastro',
    cadastroTitulo: 'Você cria conteúdo?',
    cadastroTexto: 'Gratuito, sem número mínimo de seguidores.',
    cadastroCampos: ['Nome', 'E-mail', 'País', 'Onde você publica'],
    cadastroAcao: 'Entrar para a rede',
    semMaterial: 'Nenhum material publicado ainda.',
  },

  numeros: {
    recursos: 'Em chamadas abertas',
    chamadas: 'Chamadas com inscrição aberta',
    cursos: 'Cursos no catálogo',
    materiais: 'Materiais publicados',
  },

  chamadasTitulo: 'Aberto agora',
  chamadasTituloSemAbertas: 'Chamadas do programa',

  chamadasAcao: 'Ver todas as chamadas',

  recursosTitulo: 'Biblioteca',
  recursosTexto:
    'Duas trilhas: uma para criadores e uma para organizações que trabalham com essas pautas. A leitura é livre; a inscrição no curso pede cadastro.',
  recursosAcao: 'Abrir a biblioteca',
  cursoOlho: 'Curso inaugural',
  cursoDuracao: 'Duração',
  cursoTurma: 'Próxima turma',
  cursoModuloUm: 'módulo',
  cursoModulos: 'módulos',
  materiaisOlho: 'Materiais de consulta',
  materialContagemUm: 'material publicado',
  materiaisContagem: 'materiais publicados',
  materiaisTexto:
    'Guias e notas técnicas curtas. Para criadores, declaração de apoio e checagem antes de publicar. Para organizações, briefing que respeita a autonomia e medição de resultado.',
  materiaisLicenca: 'Licença',
  materiaisAcao: 'Ver materiais',
} as const;
