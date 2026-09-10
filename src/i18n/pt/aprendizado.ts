/** Strings da Biblioteca: pagina indice, cursos e materiais tecnicos. */
export const aprendizado = {
  indice: {
    olho: 'Biblioteca',
    titulo: 'Formação e materiais',
    /* So na etiqueta <meta>: a pagina nao repete o titulo em subtitulo. */
    descricao: 'Materiais técnicos para criadores e organizações, e cursos para criadores.',
    materiaisTitulo: 'Materiais técnicos',
    materiaisAcao: 'Ver os materiais',
    cursosTitulo: 'Cursos',
    cursosVazio: 'Nenhum curso publicado.',
    /* Sem turma publicada, o que a pagina de cursos tem sao as condicoes. */
    cursosAcaoVazio: 'Condições de inscrição',
    cursosAcao: 'Ver os cursos',
    abertura: [
      {
        rotulo: 'Acesso',
        texto: 'Leitura livre, sem cadastro. O cadastro só é pedido para entrar em uma turma.',
      },
      {
        rotulo: 'Custo',
        texto: 'Sem taxa de inscrição.',
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
    /* So na etiqueta <meta>. */
    descricao: 'Materiais técnicos para criadores e organizações.',
    trilha: 'Trilha',
    trilhaCriadores: 'Para criadores',
    trilhaOrganizacoes: 'Para organizações',
    trilhaCriadoresNota:
      'Produção, sinalização do apoio na publicação e preparo de propostas para as chamadas.',
    trilhaOrganizacoesNota:
      'Descrever uma demanda sem interferir na edição, contratar com regras claras e avaliar o resultado.',
    autoria: 'Autoria',
    organizacao: 'Organização',
    tema: 'Tema',
    palavrasChave: 'Palavras-chave',
    formato: 'Formato',
    tempoLeitura: 'Leitura',
    atualizadoEm: 'Atualizado em',
    sumario: 'Nesta publicação',
    arquivosTitulo: 'Texto completo',
    arquivoTipo: 'PDF',
    /* O idioma sai do proprio arquivo publicado, ja escrito no idioma da pagina. */
    arquivoBaixarEm: 'Baixar em {idioma}',
    paginas: 'páginas',
    /* Selo e nota so aparecem quando o material declara licenca. */
    licencaNota: 'Uso e adaptação permitidos com atribuição.',
    voltarTrilha: 'Voltar para a trilha',
    leiaTambem: 'Leia também',
    maisDaOrganizacao: 'Mais de',
    mesmoTema: 'Mesmo tema',
    vazioTitulo: 'Nenhum material publicado',
    vazioAcao: 'Conhecer o programa',
    /* Modelos de data: o acervo mostra a data em cada cartão e na ficha. */
    meses: [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
    ],
    dataModelo: '{dia} de {mes} de {ano}',
    dataCurtaModelo: '{dia}/{mes}/{ano}',
    /* Busca, filtros e ordenação do acervo. */
    acervo: {
      busca: 'Busca',
      buscaDica: 'Título, autoria, organização, tema ou palavra-chave',
      ordem: 'Ordem',
      ordemAtualizacao: 'Atualização',
      ordemTitulo: 'Título',
      filtroTrilha: 'Trilha',
      filtroTema: 'Tema',
      filtroOrganizacao: 'Organização',
      filtroFormato: 'Formato',
      tudo: 'Tudo',
      contagemUm: 'material',
      contagemVarios: 'materiais',
      de: 'de',
      limpar: 'Limpar',
    },
  },
} as const;
