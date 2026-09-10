/**
 * Strings da home, em espanhol. Duas areas apenas: oportunidades e biblioteca.
 *
 * A home tem dois estados. Antes da primeira publicacao, valem as chaves de
 * "inicio", "areas" e "estado". Quando houver chamada, curso ou material
 * publicado, voltam a valer as chaves de numeros, chamadas e biblioteca.
 */
export const home = {
  frase: 'Un laboratorio de creadores para el interés público.',
  apresentacao:
    'El programa financia proyectos de creadores de contenido sobre ciencia, clima, medio ambiente, salud pública y democracia. La propuesta es del creador, y la decisión editorial también.',

  /* Caminho de entrada quando já existe conteúdo publicado. */
  entrarPrincipal: 'Crear cuenta',
  entrarPainel: 'Ir al panel',
  entrarSecundario: 'Ver convocatorias abiertas',
  entrarNota: 'El registro es gratuito y no exige un número mínimo de seguidores.',

  /* Caminho de entrada enquanto nada foi publicado. */
  inicioAcao: 'Ver oportunidades',
  inicioAcaoAreas: 'Ver la biblioteca',
  inicioNota: 'Ninguna convocatoria abierta.',

  areasTitulo: 'Dos áreas',
  areas: [
    {
      titulo: 'Oportunidades',
      href: '/oportunidades',
      desenho: 'edital',
      texto:
        'Convocatorias de financiamiento. Cada una trae criterios, jurado, cronograma y montos.',
      acao: 'Abrir oportunidades',
    },
    {
      titulo: 'Biblioteca',
      href: '/biblioteca',
      desenho: 'material',
      texto:
        'Cursos gratuitos y material técnico con licencia abierta, en dos rutas: creadores y organizaciones.',
      acao: 'Abrir la biblioteca',
    },
  ] as readonly Record<string, string>[],

  numeros: {
    recursos: 'En convocatorias abiertas',
    chamadas: 'Convocatorias con inscripción abierta',
    cursos: 'Cursos en el catálogo',
    materiais: 'Materiales publicados',
  },

  chamadasTitulo: 'Abierto ahora',
  chamadasTituloSemAbertas: 'Convocatorias del programa',

  chamadasAcao: 'Ver todas las convocatorias',
  prazoADefinir: 'Por definir',
  rotuloProponente: 'Proponente',

  recursosTitulo: 'Biblioteca',
  recursosTexto:
    'La segunda área reúne formación y material de consulta, en dos rutas: una para creadores y otra para organizaciones que trabajan con estos temas. La lectura es libre; la inscripción al curso requiere cuenta.',
  recursosAcao: 'Abrir la biblioteca',
  cursoOlho: 'Curso inaugural',
  cursoDuracao: 'Duración',
  cursoTurma: 'Próximo grupo',
  cursoModulos: 'módulos',
  materiaisOlho: 'Materiales de consulta',
  materiaisContagem: 'materiales publicados',
  materiaisTexto:
    'Guías y notas técnicas breves. Para creadores, declaración de apoyo y verificación antes de publicar. Para organizaciones, briefing que respeta la autonomía y medición de resultados.',
  materiaisLicenca: 'Licencia',
  materiaisAcao: 'Ver materiales',
};
