# TILT

Site da plataforma TILT (The influencers lab for tomorrow), programa de engajamento de
criadores de conteúdo de interesse público operado pela INDICA e pela TILT, com piloto no
Brasil.

Site estático, sem backend: não há autenticação, envio de e-mail, upload de arquivo,
pagamento nem analytics. O conteúdo vem dos arquivos JSON em `/data`, que estão vazios
enquanto o programa não publica o primeiro ciclo. As telas se adaptam sozinhas quando os
arquivos forem preenchidos.

## Rodar

```
npm install
npm run dev
```

Abre em http://localhost:3000

Requer Node 18.18 ou superior (o projeto foi construído com o Node 22, fixado em `.nvmrc`).
Se o comando `node` não for encontrado neste computador, o Node está instalado em `~/.local/node`:

```
export PATH="$HOME/.local/node/bin:$PATH"
```

## Build estático

```
npm run build
```

Gera o site estático em `out/`. Para conferir o resultado do build localmente:

```
npm start
```

## Deploy

O site está no **GitHub Pages**, servido da pasta `docs/` do branch `main`.

Para publicar uma alteração:

```
npm run publicar
git add -A && git commit -m "..." && git push
```

O comando `publicar` gera o site estático e o coloca em `docs/`, com o arquivo `.nojekyll`
que o Pages exige para servir a pasta `_next`.

**Domínio próprio.** Sem domínio, o Pages serve em um subcaminho, e por isso o
`next.config.mjs` usa `basePath`. Ao apontar um domínio para o repositório, gere o site sem
caminho base e adicione o arquivo `CNAME`:

```
BASE_PATH= npm run publicar && echo seudominio.com > docs/CNAME
```

**Alternativas.** Como a exportação é estática, o repositório também funciona sem
configuração na Vercel e na Netlify (o `netlify.toml` já está pronto).

## Onde mexer

| O que | Onde |
| --- | --- |
| **Nome do programa** | `src/config/program.ts`, constantes `PROGRAM_NAME` e `PROGRAM_TAGLINE`. Trocar ali renomeia a plataforma inteira. |
| Textos da interface | `src/i18n/strings.ts`, que reúne os arquivos de `src/i18n/pt-BR/`. Para uma versão em inglês, duplique a pasta, traduza e troque as importações. |
| Conteúdo publicado | `/data`: `calls.json`, `courses.json`, `articles.json`, `panel-data.json`. Os tipos estão em `src/lib/types.ts`. |
| Identidade visual | `src/app/globals.css`, no bloco `:root`. |
| Ilustrações | `src/components/Ilustracao.tsx`, traço preto com matriz de pontos. Sem fotos. |
| Faixas de cor | `src/components/Faixas.tsx`, o sistema visual do manual. |

## Identidade visual

Vem do Brand Manual oficial da TILT (2023). Paleta: Sky Blue `#c8e1fa`, Golden Sunbeam
`#fffacf`, Aqua Mist `#bee6d7`, Cold Sand `#f0ebe1`, Midnight Black `#000000` e Pure Snow
White `#ffffff`, mais um rosa `#ffd9e9` que aparece na landing page da marca. O fundo da
plataforma é o Cold Sand, não branco.

A fonte corporativa é a Tiempos, que é licenciada e não pode ser embutida. No lugar dela está
a **Times**, que é a alternativa de sistema prescrita pelo próprio manual. Não há nenhuma
fonte externa: o site roda sem internet e sem carregar nada. Para usar a Tiempos numa
versão futura, basta adicioná-la em `src/app/globals.css`, na variável `--serif`.

O sistema visual do manual é feito de faixas de cor da paleta em larguras diferentes, no lugar
de repetir o logotipo. Está no componente `src/components/Faixas.tsx`, usado no cabeçalho e no
rodapé. O logotipo é o wordmark de pontos, em `src/components/LogoTilt.tsx`.

Botões, campos, chips e selos são pílulas com borda preta fina, como no material da marca.
Tokens em `src/app/globals.css`, bloco `:root`. Nenhuma cor deve ser escrita direto nas páginas.

## Publicar o primeiro conteúdo

O site lê tudo de `/data`. Enquanto os arquivos estão vazios, cada página mostra o estado
"ainda não publicado" e o build gera só as páginas de lista. Ao preencher os JSON, as telas
com conteúdo voltam sozinhas (números na home, cartões de chamada, catálogo).

Uma exceção precisa de uma ação manual. A exportação estática do Next não aceita uma rota
dinâmica sem nenhum item, então as páginas de detalhe estão fora do roteador, guardadas em
pastas com prefixo `_`. Ao publicar o primeiro item de uma área, renomeie a pasta
correspondente de volta:

| Ao publicar | Renomeie |
| --- | --- |
| a primeira chamada em `calls.json` | `src/app/oportunidades/_slug` para `src/app/oportunidades/[slug]` |
| o primeiro curso em `courses.json` | `src/app/biblioteca/cursos/_slug` para `.../cursos/[slug]` |
| o primeiro material em `articles.json` | `src/app/biblioteca/materiais/_slug` para `.../materiais/[slug]` |

O código dessas páginas está pronto e passa na checagem de tipos: só o roteamento está
desligado enquanto não há o que mostrar.

## Navegação e acesso

Duas abas: **Oportunidades** (chamadas de financiamento, com resultados publicados) e
**Recursos** (cursos e materiais de apoio). Não há divisão entre criador e organização: quem
entra é sempre um criador de conteúdo.

O conteúdo é aberto a qualquer visitante. O cadastro, gratuito e sem exigência de porte,
desbloqueia a área de trabalho: candidatura às chamadas, painel com o andamento das propostas
e inscrição nos cursos.

## Estado

Cadastro, candidaturas enviadas e inscrições em curso ficam
em memória (React state) e são salvos em `localStorage` quando o navegador permite. Nada
quebra sem `localStorage`: sem ele o site funciona igual, apenas não sobrevive a um
recarregamento da página.

## Estrutura

```
data/                     conteúdo publicado, em JSON
src/config/program.ts     nome do programa e avisos globais
src/i18n/                 strings da interface
src/lib/                  tipos, acesso aos dados, formatadores
src/state/AppState.tsx    cadastro, candidaturas e inscrições no navegador
src/components/           componentes compartilhados
src/app/                  rotas (App Router, exportação estática)
  /oportunidades          chamadas, página da chamada e fluxo de candidatura
  /recursos               cursos e materiais de apoio
  /cadastro               cadastro de criador
  /painel                 candidaturas e cursos de quem se cadastrou
```
