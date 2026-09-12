/**
 * Strings da home, em ingles. Duas areas apenas: oportunidades e biblioteca.
 *
 * A home tem dois estados. Antes da primeira publicacao, valem as chaves de
 * "inicio", "areas" e "estado". Quando houver chamada, curso ou material
 * publicado, voltam a valer as chaves de numeros, chamadas e biblioteca.
 */
export const home = {
  frase: 'A creator lab for the public interest.',
  apresentacao:
    'The program funds content creator projects on science, climate, environment, public health and democracy. The proposal belongs to the creator, and so does the editorial decision.',

  /* Caminho de entrada quando ja existe conteudo publicado. */
  entrarPrincipal: 'Create account',
  entrarPainel: 'Go to the dashboard',
  entrarSecundario: 'See open calls',
  entrarNota: 'The account is free and requires no minimum follower count.',

  /* Caminho de entrada enquanto nada foi publicado. */
  inicioAcao: 'See opportunities',
  inicioAcaoAreas: 'See the library',
  inicioNota: 'No open calls.',

  areasTitulo: 'Two areas',
  areas: [
    {
      titulo: 'Opportunities',
      href: '/oportunidades',
      desenho: 'edital',
      texto:
        'Funding calls. Each one sets out criteria, panel, schedule and amounts.',
      acao: 'Open opportunities',
    },
    {
      titulo: 'Library',
      href: '/biblioteca',
      desenho: 'material',
      texto:
        'Free courses and technical material under an open license, in two tracks: creators and organizations.',
      acao: 'Open the library',
    },
  ],

  /* The new home: the swarm is the door, the columns are the house. */
  ponte: 'Open now · Sign up · Library',
  coluna: {
    apoio: 'Support per project',
    proponente: 'Proposed by',
    vagas: 'Places',
    vagasFaixa: '{min} to {max} projects supported.',
    vagasSelecionados: '{n} selected, {r} places open.',
    verChamada: 'See the call',
    semChamada: 'No call open at the moment.',
    verOportunidades: 'See opportunities',
    cadastroOlho: 'Sign up',
    cadastroTitulo: 'Do you create content?',
    cadastroTexto: 'Free, with no minimum follower count.',
    cadastroCampos: ['Name', 'Email', 'Country', 'Where you publish'],
    cadastroAcao: 'Join the network',
    semMaterial: 'No material published yet.',
  },

  numeros: {
    recursos: 'In open calls',
    chamadas: 'Calls open for applications',
    cursos: 'Courses in the catalog',
    materiais: 'Materials published',
  },

  chamadasTitulo: 'Open now',
  chamadasTituloSemAbertas: 'Program calls',

  chamadasAcao: 'See all calls',

  recursosTitulo: 'Library',
  recursosTexto:
    'Two tracks: one for creators and one for organizations working on these topics. Reading is open; enrolling in a course requires an account.',
  recursosAcao: 'Open the library',
  cursoOlho: 'Inaugural course',
  cursoDuracao: 'Duration',
  cursoTurma: 'Next class',
  cursoModuloUm: 'module',
  cursoModulos: 'modules',
  materiaisOlho: 'Reference materials',
  materialContagemUm: 'material published',
  materiaisContagem: 'materials published',
  materiaisTexto:
    'Guides and short technical notes. For creators, disclosure of support and checking before publishing. For organizations, briefing that respects autonomy and measuring results.',
  materiaisLicenca: 'License',
  materiaisAcao: 'See materials',
} as const;
