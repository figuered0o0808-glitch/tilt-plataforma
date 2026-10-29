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

As três carinhas originais aparecem juntas nos caminhos da abertura. O branco predomina; os degradês oficiais ficam em partes selecionadas: sobrancelha direita e boca em azul nas oportunidades, olho esquerdo e boca em verde no cadastro, e olho direito em verde/rosa na biblioteca. `CarinhaIndica` preserva os traços dos PNGs com máscaras de tinta, gradientes por parte e pivôs SVG nativos. Depois que as imagens carregam e a navegação entra na tela, cada personagem faz uma coreografia de entrada finita, com piscadas, aceno e mudança de olhar, terminando em repouso em até 3,4 s. Foco e ponteiro disparam gestos próprios de 1,8–2 s no personagem correspondente. As duas animações têm grupos independentes. Movimento reduzido desliga os grupos animados e preserva as translações estruturais. A navegação funciona diretamente e não depende da animação. Na confirmação de cadastro há um aceno finito. As artes e o vídeo de referência permanecem em `public/marca/`, sem carregamento do vídeo pela interface.
