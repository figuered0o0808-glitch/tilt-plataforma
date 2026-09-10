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

  numeros: {
    recursos: 'In open calls',
    chamadas: 'Calls open for applications',
    cursos: 'Courses in the catalog',
    materiais: 'Materials published',
  },

  chamadasTitulo: 'Open now',
  chamadasTituloSemAbertas: 'Program calls',

  chamadasAcao: 'See all calls',
  prazoADefinir: 'To be defined',
  rotuloProponente: 'Funder',

  recursosTitulo: 'Library',
  recursosTexto:
    'The second area brings together training and reference material, in two tracks: one for creators and one for organizations working on these topics. Reading is open; enrolling in a course requires an account.',
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
