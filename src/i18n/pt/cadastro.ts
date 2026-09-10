/**
 * Strings da pagina de cadastro. Publico unico: criadores de conteudo.
 *
 * Dois estados, decididos em `cadastroAberto()`: sem chamada com inscricoes
 * abertas e sem curso com turma aberta vale o bloco `fechado`, que nao pede
 * dado nenhum; com conteudo publicado valem as demais chaves.
 */
export const cadastro = {
  olho: 'Cadastro',

  /** Acao do cabecalho do site quando o cadastro esta aberto. */
  entrar: 'Cadastrar',

  fechado: {
    titulo: 'O cadastro abre com a primeira chamada',
    descricao:
      'Ele serve para se candidatar às chamadas e para se inscrever nos cursos. É gratuito e não exige número mínimo de seguidores.',
  },

  titulo: 'Criar seu cadastro',
  descricao: 'Gratuito e sem exigência de número mínimo de seguidores.',

  formularioTitulo: 'Seus dados',
  campos: {
    nome: 'Nome',
    email: 'E-mail',
    cidade: 'Cidade',
    uf: 'UF',
  },

  nichos: {
    titulo: 'Nichos de atuação',
    ajuda: 'Selecione todos em que você publica. O nicho não limita as pautas que você pode propor.',
    lista: [
      'Humor',
      'Beleza',
      'Games',
      'Esporte',
      'Música',
      'Moda',
      'Culinária',
      'Viagem',
      'Ciência',
      'Saúde',
      'Educação',
      'Política',
      'Economia',
      'Tecnologia',
      'Meio ambiente',
      'Cultura',
      'Maternidade e família',
      'Estilo de vida',
      'Direito',
      'Carreira',
    ],
  },

  redes: {
    titulo: 'Suas redes',
    ajuda: 'Onde você publica e qual o tamanho da audiência em cada uma.',
    plataforma: 'Plataforma',
    escolhaPlataforma: 'Escolha',
    perfil: 'Perfil',
    perfilExemplo: '@seuperfil',
    seguidores: 'Seguidores',
    seguidoresExemplo: 'Somente números',
    acrescentar: 'Acrescentar rede',
    remover: 'Remover',
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
      'Outra',
    ],
  },
  acao: 'Criar cadastro',

  confirmacaoTitulo: 'Cadastro criado',
  confirmacaoTexto: 'As candidaturas e as inscrições em cursos passam a aparecer no painel.',

  jaCadastradoSelo: 'Cadastro ativo',
  jaCadastradoTitulo: 'Você já tem cadastro',
  jaCadastradoTexto: 'Este navegador já guarda um cadastro.',
  nomeRotulo: 'Nome informado',

  irAoPainel: 'Ir para o painel',
  verOportunidades: 'Ver oportunidades',
  verBiblioteca: 'Ver a biblioteca',
} as const;
