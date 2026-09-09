/** Strings da Biblioteca: pagina indice, cursos e materiais tecnicos. */
export const aprendizado = {
  indice: {
    olho: 'Biblioteca',
    titulo: 'Formação e materiais',
    descricao: 'Cursos gratuitos para criadores e materiais técnicos em licença aberta.',
    /* Sai da pagina assim que o primeiro curso ou material for publicado. */
    estado: 'Nenhum curso ou material publicado até agora.',
    areas: [
      {
        titulo: 'Cursos',
        href: '/biblioteca/cursos',
        texto: 'Formação em turmas, com data de início.',
        acao: 'Ver os cursos',
        marca: 'var(--menta)',
      },
      {
        titulo: 'Materiais técnicos',
        href: '/biblioteca/materiais',
        texto: 'Textos curtos para consulta, em duas trilhas.',
        acao: 'Ver os materiais',
        marca: 'var(--azul)',
      },
    ],
    abertura: [
      {
        rotulo: 'Acesso',
        texto: 'Leitura livre, sem cadastro. O cadastro só é pedido para entrar em uma turma.',
      },
      {
        rotulo: 'Custo',
        texto: 'Sem taxa de inscrição e sem custo de material.',
      },
      {
        rotulo: 'Para quem',
        texto: 'Criadores de pequeno porte, sem número mínimo de seguidores.',
      },
    ],
  },
  cursos: {
    olho: 'Formação',
    titulo: 'Cursos',
    descricao: 'Formação gratuita para criadores de pequeno porte.',
    condicoesTitulo: 'Condições que valem para qualquer turma',
    condicoes: [
      {
        rotulo: 'Inscrição',
        texto: 'Feita na página da turma, por quem tem cadastro na plataforma.',
      },
      {
        rotulo: 'O que a turma publica',
        texto:
          'Programa por módulos, duração, formato, número de vagas e prazo, antes de abrir as inscrições.',
      },
    ],
    modulos: 'Módulos',
    modulosTitulo: 'Programa do curso',
    duracao: 'Duração',
    formato: 'Formato',
    paraQuem: 'Para quem',
    proximaTurma: 'Próxima turma',
    inscricaoTitulo: 'Inscrição',
    inscricaoCadastro: 'A inscrição exige cadastro na plataforma.',
    inscricaoAcaoCadastro: 'Fazer cadastro',
    inscricaoNota: 'A inscrição é gratuita.',
    inscricaoConfirmada: 'Inscrição registrada.',
    irAoPainel: 'Ver no painel',
    voltarCatalogo: 'Ver os cursos',
    vazioTitulo: 'Nenhum curso publicado',
    vazioAcao: 'Conhecer o programa',
  },
  materiais: {
    olho: 'Biblioteca',
    titulo: 'Materiais técnicos',
    descricao: 'Guias e notas técnicas em licença aberta.',
    trilha: 'Trilha',
    trilhaCriadores: 'Para criadores',
    trilhaOrganizacoes: 'Para organizações',
    trilhaCriadoresNota:
      'Produção, sinalização do apoio na publicação e preparo de propostas para as chamadas.',
    trilhaOrganizacoesNota:
      'Descrever uma demanda sem interferir na edição, contratar com regras claras e avaliar o resultado.',
    notaOrganizacoes: 'Organizações não fazem cadastro e não têm área na plataforma.',
    formato: 'Formato',
    tempoLeitura: 'Leitura',
    atualizadoEm: 'Atualizado em',
    licencaSelo: 'Licença aberta',
    licencaTitulo: 'Uso dos materiais',
    licencaNota: 'Uso e adaptação permitidos com atribuição.',
    licencaTexto:
      'Você pode copiar, adaptar e usar os textos em oficina, aula ou publicação própria, desde que cite a origem.',
    resumoTitulo: 'Resumo',
    voltarTrilha: 'Voltar para a trilha',
    leiaTambem: 'Leia também',
    vazioTitulo: 'Nenhum material publicado',
    vazioAcao: 'Conhecer o programa',
  },
} as const;
