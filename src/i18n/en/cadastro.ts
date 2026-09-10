/**
 * Strings da pagina de cadastro, em ingles. Publico unico: criadores de
 * conteudo.
 *
 * Dois estados, decididos em `cadastroAberto()`: sem chamada com inscricoes
 * abertas e sem curso com turma aberta vale o bloco `fechado`, que nao pede
 * dado nenhum; com conteudo publicado valem as demais chaves.
 */
export const cadastro = {
  olho: 'Account',

  /** Acao do cabecalho do site quando o cadastro esta aberto. */
  entrar: 'Sign up',

  fechado: {
    titulo: 'Sign-up opens with the first call',
    descricao:
      'It is what you use to apply to the calls and to enroll in the courses. It is free and requires no minimum follower count.',
  },

  titulo: 'Create your account',
  descricao: 'Free and with no minimum follower count required.',

  formularioTitulo: 'Your details',
  campos: {
    nome: 'Name',
    email: 'Email',
    cidade: 'City',
    uf: 'State',
    nicho: 'Main niche',
  },
  acao: 'Create account',

  confirmacaoTitulo: 'Account created',
  confirmacaoTexto: 'Applications and course enrollments now appear in the dashboard.',

  jaCadastradoSelo: 'Account active',
  jaCadastradoTitulo: 'You already have an account',
  jaCadastradoTexto: 'This browser already holds an account.',
  nomeRotulo: 'Name provided',

  irAoPainel: 'Go to the dashboard',
  verOportunidades: 'See opportunities',
  verBiblioteca: 'See the library',
} as const;
