/**
 * Strings do painel. Existe um painel so: a area de trabalho de quem tem
 * cadastro, com as candidaturas enviadas e os cursos.
 *
 * Enquanto o cadastro estiver fechado (sem chamada aberta e sem curso com
 * turma aberta), a pagina inteira usa o bloco `fechado`: nao ha tabela,
 * nem indicador, nem convite para criar um cadastro que ainda nao existe.
 *
 * Sem travessao, sem emoji, sem exclamacao. Tratamento por "voce".
 */
export const paineis = {
  olho: 'Painel',
  titulo: 'Meu painel',
  descricao:
    'Acompanhe aqui as candidaturas enviadas e os cursos em que você se inscreveu.',
  verOportunidades: 'Ver oportunidades',
  verBiblioteca: 'Ver a biblioteca',
  verCadastro: 'Ver como participar',

  fechado: {
    titulo: 'A área de acompanhamento abre junto com o cadastro',
    descricao:
      'Aqui fica o que é seu: as candidaturas enviadas e os cursos em que você se inscreveu. Como ainda não há chamada aberta nem curso com turma aberta, não há o que acompanhar.',
    itens: [
      {
        rotulo: 'Candidaturas',
        texto:
          'Cada proposta enviada aparece com a chamada, o valor solicitado, a data de envio e a situação da avaliação.',
      },
      {
        rotulo: 'Cursos',
        texto:
          'Os cursos em que você se inscrever aparecem com o andamento de cada um.',
      },
      {
        rotulo: 'Quando abre',
        texto: 'Junto com o cadastro, que abre com a primeira chamada.',
      },
    ],
  },

  resumo: {
    enviadas: 'Candidaturas enviadas',
    emAvaliacao: 'Em avaliação',
    aprovadas: 'Aprovadas',
    cursos: 'Cursos registrados',
  },
  candidaturasTitulo: 'Minhas candidaturas',
  candidaturasDescricao:
    'Cada linha leva à chamada correspondente, com critérios, banca e cronograma.',
  candidaturasVazio: 'Nenhuma candidatura enviada.',
  candidaturasVazioTexto:
    'As chamadas abertas ficam em Oportunidades. A candidatura é feita no formulário da própria chamada.',
  totalSolicitado: 'Total solicitado',
  colunas: {
    edital: 'Chamada',
    projeto: 'Projeto',
    valor: 'Valor solicitado',
    enviada: 'Enviada em',
    situacao: 'Situação',
  },
  cursosTitulo: 'Meus cursos',
  cursosDescricao:
    'Formação gratuita para quem participa do programa. O andamento é registrado por curso.',
  cursosVazio: 'Nenhum curso registrado.',
  cursosVazioTexto:
    'Os cursos abertos e os materiais ficam na Biblioteca. A inscrição é gratuita.',
  cursoProgresso: 'Andamento',
  cursoModulos: 'módulos',
  cursoInscricaoLocal: 'Inscrição registrada neste navegador.',
  convite: {
    titulo: 'Este painel é de quem tem cadastro',
    texto:
      'O painel acompanha as candidaturas enviadas e os cursos de quem tem cadastro. As chamadas, os resultados, os cursos e os materiais continuam abertos a qualquer visitante.',
    acao: 'Criar cadastro',
  },
} as const;
