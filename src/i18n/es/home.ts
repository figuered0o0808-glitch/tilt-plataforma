/**
 * Strings da home, em espanhol. Duas areas apenas: oportunidades e biblioteca.
 *
 * A home tem dois estados. Antes da primeira publicacao, valem as chaves de
 * "inicio". Quando houver chamada, curso ou material publicado, voltam a
 * valer as chaves de entrada, colunas, numeros, chamadas e biblioteca.
 */
export const home = {
  frase: 'Un laboratorio de creadores para el interés público.',
  apresentacao:
    'El programa financia proyectos de creadores de contenido sobre ciencia, clima, medio ambiente, salud pública y democracia. La propuesta es del creador, y la decisión editorial también.',

  /* Caminho de entrada quando já existe conteúdo publicado. */
  entrarPrincipal: 'Crear cuenta',
  entrarPainel: 'Ir al panel',
  entrarSecundario: 'Ver convocatorias abiertas',

  /* Caminho de entrada enquanto nada foi publicado. */
  inicioAcao: 'Ver oportunidades',
  inicioAcaoAreas: 'Ver la biblioteca',
  inicioNota: 'Ninguna convocatoria abierta.',

  /* La home nueva: el enjambre es la puerta, las columnas son la casa. */
  ponte: 'Abierta ahora · Registro · Biblioteca',
  coluna: {
    apoio: 'Apoyo por proyecto',
    proponente: 'Proponente',
    vagas: 'Plazas',
    vagasFaixa: 'De {min} a {max} proyectos apoyados.',
    vagasSelecionados: '{n} seleccionados, {r} plazas abiertas.',
    vagasApoiados: '{n} proyectos apoyados.',
    verChamada: 'Ver la convocatoria',
    semChamada: 'Ninguna convocatoria abierta por ahora.',
    verOportunidades: 'Ver oportunidades',
    cadastroOlho: 'Registro',
    cadastroTitulo: '¿Creas contenido?',
    cadastroTexto: 'Gratis, sin mínimo de seguidores.',
    cadastroCampos: ['Nombre', 'Correo', 'Teléfono', 'País', 'Dónde publicas'],
    cadastroAcao: 'Crear cuenta',
    semMaterial: 'Ningún material publicado todavía.',
    anterior: 'Anterior',
    proximo: 'Siguiente',
    posicao: '{n} de {total}',
    pausar: 'Pausar',
    continuar: 'Continuar',
    carrossel: 'carrusel',
  },

  numeros: {
    recursos: 'En convocatorias abiertas',
    chamadas: 'Convocatorias con inscripción abierta',
    cursos: 'Cursos en el catálogo',
    materiais: 'Materiales publicados',
  },

  chamadasTitulo: 'Abierto ahora',

  recursosTitulo: 'Biblioteca',
  recursosAcao: 'Abrir la biblioteca',
  cursoModulos: 'módulos',
  materiaisAcao: 'Ver materiales',
} as const;
