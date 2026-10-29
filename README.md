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

A entrada usa a animação original da marca em uma versão H.264 de7segundos,960×540,sem áudio, em `public/marca/indica-motion.mp4`. Ela toca uma vez, respeita movimento reduzido e permite pausar/repetir. A carinha estática permite trocar expressão por clique. As3artes originais ficam em `public/marca/rostos/`; também aparecem em buscas sem resultados e confirmação de cadastro. O tratamento preto/branco é feito em CSS; os arquivos de marca são preservados.
