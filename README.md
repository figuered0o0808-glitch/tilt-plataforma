# INDICA · Plataforma de criadores

Plataforma pública da INDICA para oportunidades, formação e materiais de apoio a criadores de conteúdo de interesse público. Interface em português, inglês e espanhol.

## Identidade

Logotipo oficial em `public/marca/indica.png`, ícones e imagem de compartilhamento na mesma pasta. Fontes locais Jost e Inter em `public/fonts/`. Visual predominantemente preto e branco, sem faixa em degradê no topo. As cores ficam reservadas à assinatura de três bolinhas, com os mesmos degradês e ordem azul, verde e rosa de agenciaindica.com. Tokens e estilos em `src/app/globals.css`.

## Desenvolvimento e publicação

`npm ci`, `npm run dev`, `npm run typecheck` e `npm run publicar`.
O GitHub Pages publica a pasta `docs/` da branch `main`.
O caminho de hospedagem atual permanece configurado em `next.config.mjs` até a decisão de domínio. Para domínio próprio, configure `BASE_PATH` vazio e ajuste a origem em `src/lib/seo.ts`; para uma subpasta, use o prefixo correspondente.

## Conteúdo e estado

Conteúdo em `data/`, textos em `src/i18n/` e nome em `src/config/program.ts`. Cadastros e candidaturas continuam no navegador; registros locais anteriores são lidos por compatibilidade. A API opcional é configurada por `NEXT_PUBLIC_INDICA_API`; o contrato de rotas anterior foi preservado.

## Motion e carinhas

As três carinhas originais aparecem juntas nos caminhos da abertura: `rosto-03` em azul nas oportunidades, `rosto-01` em verde no cadastro/painel e `rosto-02` em rosa na biblioteca. `CarinhaIndica` separa os traços de cada arte em grupos SVG, sem redesenhar as letras; um filtro transforma a tinta original em cor com fundo transparente. As cores são as oficiais da INDICA (`#2f9bff`, `#8ace2b`, `#ff2e9a`). Foco e ponteiro nos links movimentam apenas a carinha correspondente; a navegação funciona diretamente e não depende da animação. Sem vídeo, reprodução automática ou controle de expressão. Na confirmação de cadastro, a carinha verde faz um aceno único de 540 ms. Movimento reduzido mantém as artes estáticas. As artes e o vídeo de referência permanecem em `public/marca/`, sem carregamento do vídeo pela interface.
