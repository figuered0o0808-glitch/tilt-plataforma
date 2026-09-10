/** Strings da Biblioteca, em ingles: pagina indice, cursos e materiais tecnicos. */
export const aprendizado = {
  indice: {
    olho: 'Library',
    titulo: 'Training and materials',
    /* So na etiqueta <meta>: a pagina nao repete o titulo em subtitulo. */
    descricao: 'Technical materials for creators and organizations, and courses for creators.',
    materiaisTitulo: 'Technical materials',
    materiaisAcao: 'See the materials',
    cursosTitulo: 'Courses',
    cursosVazio: 'No course published.',
    /* Sem turma publicada, o que a pagina de cursos tem sao as condicoes. */
    cursosAcaoVazio: 'Enrollment terms',
    cursosAcao: 'See the courses',
    abertura: [
      {
        rotulo: 'Access',
        texto: 'Open reading, no account. An account is only required to join a class.',
      },
      {
        rotulo: 'Cost',
        texto: 'No enrollment fee.',
      },
    ],
  },
  cursos: {
    olho: 'Training',
    titulo: 'Courses',
    descricao: 'Free training for small creators.',
    condicoesTitulo: 'Terms that apply to any class',
    condicoes: [
      {
        rotulo: 'Enrollment',
        texto: 'Done on the class page, by those who have an account on the platform.',
      },
      {
        rotulo: 'What the class publishes',
        texto:
          'Program by modules, duration, format, number of places and deadline, before enrollment opens.',
      },
    ],
    modulos: 'Modules',
    modulosTitulo: 'Course program',
    duracao: 'Duration',
    formato: 'Format',
    paraQuem: 'Who it is for',
    proximaTurma: 'Next class',
    inscricaoTitulo: 'Enrollment',
    inscricaoCadastro: 'Enrollment requires an account on the platform.',
    inscricaoAcaoCadastro: 'Create account',
    inscricaoNota: 'Enrollment is free.',
    inscricaoConfirmada: 'Enrollment recorded.',
    irAoPainel: 'See in the dashboard',
    voltarCatalogo: 'See the courses',
    vazioTitulo: 'No course published',
    vazioAcao: 'See the program',
  },
  materiais: {
    olho: 'Library',
    titulo: 'Technical materials',
    /* So na etiqueta <meta>. */
    descricao: 'Technical materials for creators and organizations.',
    trilha: 'Track',
    trilhaCriadores: 'For creators',
    trilhaOrganizacoes: 'For organizations',
    trilhaCriadoresNota:
      'Production, disclosure of the support in the post and preparing proposals for the calls.',
    trilhaOrganizacoesNota:
      'Describing a need without interfering in the editing, contracting with clear rules and assessing the result.',
    autoria: 'Author',
    organizacao: 'Organization',
    tema: 'Topic',
    palavrasChave: 'Keywords',
    formato: 'Format',
    tempoLeitura: 'Read time',
    atualizadoEm: 'Updated on',
    arquivosTitulo: 'Full text',
    arquivoTipo: 'PDF',
    /* Selo e nota so aparecem quando o material declara licenca. */
    licencaNota: 'Use and adaptation allowed with attribution.',
    voltarTrilha: 'Back to the track',
    leiaTambem: 'See also',
    vazioTitulo: 'No material published',
    vazioAcao: 'See the program',
  },
} as const;
