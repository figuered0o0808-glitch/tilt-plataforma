/** Strings da Biblioteca, em espanhol: pagina indice, cursos e materiais. */
export const aprendizado = {
  indice: {
    olho: 'Biblioteca',
    titulo: 'Formación y materiales',
    /* So na etiqueta <meta>: a pagina nao repete o titulo em subtitulo. */
    descricao: 'Materiales técnicos para creadores y organizaciones, y cursos para creadores.',
    materiaisTitulo: 'Materiales técnicos',
    materiaisAcao: 'Ver los materiales',
    cursosTitulo: 'Cursos',
    cursosVazio: 'Ningún curso publicado.',
    /* Sem turma publicada, o que a pagina de cursos tem sao as condicoes. */
    cursosAcaoVazio: 'Condiciones de inscripción',
    cursosAcao: 'Ver los cursos',
    abertura: [
      {
        rotulo: 'Acceso',
        texto: 'Lectura libre, sin cuenta. La cuenta solo se pide para entrar en un grupo.',
      },
      {
        rotulo: 'Costo',
        texto: 'Sin cuota de inscripción.',
      },
    ] as readonly Record<string, string>[],
  },
  cursos: {
    olho: 'Formación',
    titulo: 'Cursos',
    descricao: 'Formación gratuita para creadores pequeños.',
    condicoesTitulo: 'Condiciones que valen para cualquier grupo',
    condicoes: [
      {
        rotulo: 'Inscripción',
        texto: 'Se hace en la página del grupo, por quien tiene cuenta en la plataforma.',
      },
      {
        rotulo: 'Lo que el grupo publica',
        texto:
          'Programa por módulos, duración, formato, número de cupos y plazo, antes de abrir las inscripciones.',
      },
    ] as readonly Record<string, string>[],
    modulos: 'Módulos',
    modulosTitulo: 'Programa del curso',
    duracao: 'Duración',
    formato: 'Formato',
    paraQuem: 'Para quién',
    proximaTurma: 'Próximo grupo',
    inscricaoTitulo: 'Inscripción',
    inscricaoCadastro: 'La inscripción exige cuenta en la plataforma.',
    inscricaoAcaoCadastro: 'Crear cuenta',
    inscricaoNota: 'La inscripción es gratuita.',
    inscricaoConfirmada: 'Inscripción registrada.',
    irAoPainel: 'Ver en el panel',
    voltarCatalogo: 'Ver los cursos',
    vazioTitulo: 'Ningún curso publicado',
    vazioAcao: 'Conocer el programa',
  },
  materiais: {
    olho: 'Biblioteca',
    titulo: 'Materiales técnicos',
    /* So na etiqueta <meta>. */
    descricao: 'Materiales técnicos para creadores y organizaciones.',
    trilha: 'Ruta',
    trilhaCriadores: 'Para creadores',
    trilhaOrganizacoes: 'Para organizaciones',
    trilhaCriadoresNota:
      'Producción, señalización del apoyo en la publicación y preparación de propuestas para las convocatorias.',
    trilhaOrganizacoesNota:
      'Describir una demanda sin interferir en la edición, contratar con reglas claras y evaluar el resultado.',
    autoria: 'Autoría',
    organizacao: 'Organización',
    tema: 'Tema',
    palavrasChave: 'Palabras clave',
    formato: 'Formato',
    tempoLeitura: 'Lectura',
    atualizadoEm: 'Actualizado el',
    sumario: 'En esta publicación',
    arquivosTitulo: 'Texto completo',
    arquivoTipo: 'PDF',
    /* O idioma sai do proprio arquivo publicado, ja escrito no idioma da pagina. */
    arquivoBaixarEm: 'Descargar en {idioma}',
    paginas: 'páginas',
    /* Selo e nota so aparecem quando o material declara licenca. */
    licencaNota: 'Uso y adaptación permitidos con atribución.',
    voltarTrilha: 'Volver a la ruta',
    leiaTambem: 'Lee también',
    maisDaOrganizacao: 'Más de',
    mesmoTema: 'Mismo tema',
    vazioTitulo: 'Ningún material publicado',
    vazioAcao: 'Conocer el programa',
    /* Modelos de data: o acervo mostra a data em cada cartão e na ficha. */
    meses: [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ],
    dataModelo: '{dia} de {mes} de {ano}',
    dataCurtaModelo: '{dia}/{mes}/{ano}',
    /* Busca, filtros e ordenação do acervo. */
    acervo: {
      busca: 'Búsqueda',
      buscaDica: 'Título, autoría, organización, tema o palabra clave',
      ordem: 'Orden',
      ordemAtualizacao: 'Actualización',
      ordemTitulo: 'Título',
      filtroTrilha: 'Ruta',
      filtroTema: 'Tema',
      filtroOrganizacao: 'Organización',
      filtroFormato: 'Formato',
      tudo: 'Todo',
      contagemUm: 'material',
      contagemVarios: 'materiales',
      de: 'de',
      limpar: 'Limpiar',
    },
  },
};
