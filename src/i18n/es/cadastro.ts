/**
 * Strings da pagina de cadastro, em espanhol. Publico unico: criadores.
 *
 * Dois estados, decididos em `cadastroAberto()`: sem chamada com inscricoes
 * abertas e sem curso com turma aberta vale o bloco `fechado`, que nao pede
 * dado nenhum; com conteudo publicado valem as demais chaves.
 */
export const cadastro = {
  olho: 'Registro',

  /** Acao do cabecalho do site quando o cadastro esta aberto. */
  entrar: 'Registrarse',

  fechado: {
    titulo: 'El registro abre con la primera convocatoria',
    descricao:
      'Sirve para postularse a las convocatorias y para inscribirse en los cursos. Es gratuito y no exige un número mínimo de seguidores.',
  },

  titulo: 'Crear tu cuenta',
  descricao: 'Gratuito y sin exigencia de un número mínimo de seguidores.',

  formularioTitulo: 'Tus datos',
  campos: {
    nome: 'Nombre',
    email: 'Correo',
    cidade: 'Ciudad',
    uf: 'UF',
  },

  nichos: {
    titulo: 'Nichos en los que actúas',
    ajuda: 'Selecciona todos en los que publicas. El nicho no limita los temas que puedes proponer.',
    lista: [
      'Humor',
      'Belleza',
      'Videojuegos',
      'Deporte',
      'Música',
      'Moda',
      'Cocina',
      'Viajes',
      'Ciencia',
      'Salud',
      'Educación',
      'Política',
      'Economía',
      'Tecnología',
      'Medio ambiente',
      'Cultura',
      'Maternidad y familia',
      'Estilo de vida',
      'Derecho',
      'Carrera',
    ] as readonly string[],
  },

  redes: {
    titulo: 'Tus redes',
    ajuda: 'Dónde publicas y qué tamaño tiene la audiencia en cada una.',
    plataforma: 'Plataforma',
    escolhaPlataforma: 'Elige',
    perfil: 'Perfil',
    perfilExemplo: '@tuperfil',
    seguidores: 'Seguidores',
    seguidoresExemplo: 'Solo números',
    acrescentar: 'Agregar red',
    remover: 'Quitar',
    plataformas: [
      'Instagram',
      'TikTok',
      'YouTube',
      'Twitch',
      'Kwai',
      'X',
      'LinkedIn',
      'Podcast',
      'Newsletter',
      'Otra',
    ] as readonly string[],
  },
  acao: 'Crear cuenta',

  confirmacaoTitulo: 'Cuenta creada',
  confirmacaoTexto: 'Las postulaciones y las inscripciones en cursos pasan a aparecer en el panel.',

  jaCadastradoSelo: 'Cuenta activa',
  jaCadastradoTitulo: 'Ya tienes cuenta',
  jaCadastradoTexto: 'Este navegador ya guarda una cuenta.',
  nomeRotulo: 'Nombre ingresado',

  irAoPainel: 'Ir al panel',
  verOportunidades: 'Ver oportunidades',
  verBiblioteca: 'Ver la biblioteca',
};
