/**
 * O site e exportado como HTML estatico e publicado no GitHub Pages, a partir
 * da pasta docs/ do branch main.
 *
 * Sem dominio proprio, o Pages serve em usuario.github.io/tilt-plataforma, e
 * por isso o caminho base. Ao apontar um dominio proprio, basta rodar o build
 * com BASE_PATH vazio:  BASE_PATH= npm run build
 */
const basePath = process.env.BASE_PATH ?? '/tilt-plataforma';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
