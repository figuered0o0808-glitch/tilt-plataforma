/**
 * Strings da pagina de cadastro. Publico unico: criadores de conteudo.
 *
 * A pagina tem dois estados, decididos em `cadastroAberto()`:
 *
 * 1. FECHADO (estado de hoje): nao ha chamada com inscricoes abertas nem
 *    curso com turma aberta, entao o cadastro nao desbloqueia nada e a
 *    pagina explica isso sem pedir dado nenhum. Usa o bloco `fechado`.
 * 2. ABERTO: existe conteudo publicado, o formulario volta e valem as
 *    demais chaves deste arquivo.
 */
export const cadastro = {
  olho: 'Cadastro',

  /** Acao do cabecalho do site quando o cadastro esta aberto. */
  entrar: 'Cadastrar',
  /** Acao sugerida para o cabecalho enquanto o cadastro esta fechado. */
  comoParticipar: 'Como participar',

  fechado: {
    titulo: 'O cadastro abre com a primeira chamada',
    descricao:
      'Ainda não há chamada com inscrições abertas nem curso com turma aberta. Enquanto não houver, o cadastro fica fechado e nenhum dado seu é pedido.',

    comoTitulo: 'Como o cadastro vai funcionar',
    itens: [
      {
        rotulo: 'Quando abre',
        texto:
          'O formulário volta a esta página assim que houver uma chamada com inscrições abertas ou um curso com turma aberta.',
      },
      {
        rotulo: 'Quanto custa',
        texto:
          'Nada. O cadastro é gratuito e não exige número mínimo de seguidores.',
      },
      {
        rotulo: 'Quais dados pede',
        texto:
          'Nome, e-mail, cidade e o assunto sobre o qual você publica. Nada disso é pedido antes de o cadastro abrir.',
      },
    ],

    acessoRotulo: 'O que dá acesso',
    acesso: [
      'Candidatura às chamadas abertas',
      'Acompanhamento das propostas que você enviou',
      'Inscrição nos cursos',
    ],

    enquantoRotulo: 'Enquanto isso',
    enquantoTexto:
      'As chamadas são publicadas em Oportunidades. Os cursos e os materiais ficam na Biblioteca.',

    situacaoTitulo: 'Situação hoje',
    situacaoTexto:
      'O primeiro ciclo do programa ainda não começou. Nenhuma chamada está com inscrições abertas.',
  },

  titulo: 'Criar seu cadastro',
  descricao:
    'As chamadas, os resultados, os cursos e os materiais ficam abertos a qualquer visitante. O cadastro desbloqueia a sua área de trabalho.',

  formularioTitulo: 'Seus dados',
  formularioTexto: 'Cinco campos, todos obrigatórios.',
  campos: {
    nome: 'Nome',
    email: 'E-mail',
    cidade: 'Cidade',
    uf: 'UF',
    nicho: 'Nicho principal',
    nichoAjuda: 'O nicho não limita as pautas que você pode propor.',
  },
  acao: 'Criar cadastro',

  desbloqueiaTitulo: 'O que o cadastro desbloqueia',
  desbloqueia: [
    'Candidatura às chamadas abertas',
    'Painel com o andamento das propostas',
    'Inscrição nos cursos',
  ],
  aberto:
    'O cadastro é aberto, gratuito e sem exigência de número mínimo de seguidores.',

  confirmacaoTitulo: 'Cadastro criado',
  confirmacaoTexto:
    'Sua área de trabalho está liberada. As candidaturas e as inscrições em cursos passam a aparecer no painel.',

  jaCadastradoSelo: 'Cadastro ativo',
  jaCadastradoTitulo: 'Você já tem cadastro',
  jaCadastradoTexto:
    'Este navegador já guarda um cadastro. Não é preciso preencher de novo.',
  nomeRotulo: 'Nome informado',

  irAoPainel: 'Ir para o painel',
  verOportunidades: 'Ver oportunidades',
  verBiblioteca: 'Ver a biblioteca',
} as const;
