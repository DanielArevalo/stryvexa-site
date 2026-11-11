import { defineConfig, loadEnv, type UserConfig } from 'vite';
import { readFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { siteDefaults } from './src/config/defaults';
import { routes } from './src/config/routes';

export default defineConfig(({ mode, command }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const publicUrl = new URL(env.VITE_PUBLIC_URL || siteDefaults.publicUrl);
  if (!publicUrl.pathname.endsWith('/')) publicUrl.pathname += '/';
  const siteUrl = publicUrl.href;
  const configuredBase = env.VITE_BASE_PATH || publicUrl.pathname;
  const base = configuredBase.startsWith('/') ? configuredBase.replace(/\/?$/, '/') : publicUrl.pathname;
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  const canonicalFor = (path: string) => new URL(path === '/' ? './' : path.slice(1) + '/', siteUrl).href;
  const manifest = JSON.parse(readFileSync(new URL('./src/assets/manifest.webmanifest', import.meta.url), 'utf8')) as {
    icons: { src: string; sizes: string; type: string; purpose: string }[];
    [key: string]: unknown;
  };
  const pwaReferences = new Map<string, string>();
  function metadataHtml(html: string, title: string, description: string, url: string) {
    return html.replace(/<title>.*?<\/title>/, `<title>${escape(title)} | Stryvexa</title>`)
      .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${escape(description)}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${escape(title)} | Stryvexa$2`)
      .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${escape(description)}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${escape(title)} | Stryvexa$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${escape(description)}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${escape(url)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${escape(url)}$2`);
  }
  return {
    base,
    plugins: [react(), tailwindcss(), {
      name: 'stryvexa-public-pages',
      enforce: 'post',
      buildStart() {
        if (command !== 'build') return;
        for (const icon of manifest.icons) {
          const reference = this.emitFile({ type: 'asset', name: icon.src.split('/').pop(), source: readFileSync(new URL(`./src/assets/${icon.src}`, import.meta.url)) });
          pwaReferences.set(icon.src, reference);
        }
      },
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const pathname = request.url?.split('?')[0];
          if (pathname !== `${base}manifest.webmanifest` && pathname !== '/manifest.webmanifest') return next();
          response.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
          response.end(JSON.stringify({ ...manifest, start_url: base, scope: base, icons: manifest.icons.map(icon => ({ ...icon, src: `${base}src/assets/${icon.src}` })) }));
        });
      },
      transformIndexHtml: {
        order: 'post',
        handler(html, context) {
          const iconUrl = context.server ? `${base}src/assets/icons/stryvexa-app-icon-1024.png` : '__SITE_ICON__';
          return metadataHtml(html.replaceAll('__MANIFEST_URL__', `${base}manifest.webmanifest`).replaceAll('__SITE_URL__', escape(siteUrl)).replaceAll('__SITE_ICON__', escape(iconUrl)), routes[0].title, routes[0].description, siteUrl);
        },
      },
      generateBundle(_options, bundle) {
        const entry = bundle['index.html'];
        if (!entry || entry.type !== 'asset') this.error('No se encontró la entrada HTML de Vite.');
        const appIcon = Object.values(bundle).find(asset => asset.type === 'asset' && asset.names.includes('stryvexa-app-icon-1024.png'));
        if (!appIcon) this.error('No se encontró el icono oficial de Stryvexa en los recursos de Vite.');
        const html = String(entry.source).replaceAll('__SITE_ICON__', escape(new URL(appIcon.fileName, siteUrl).href));
        entry.source = html;
        this.emitFile({ type: 'asset', fileName: 'manifest.webmanifest', source: JSON.stringify({ ...manifest, icons: manifest.icons.map(icon => ({ ...icon, src: `./${this.getFileName(pwaReferences.get(icon.src)!)}` })) }, null, 2) });
        for (const route of routes.filter(item => item.path !== '/')) {
          this.emitFile({ type: 'asset', fileName: `${route.path.slice(1)}/index.html`, source: metadataHtml(html, route.title, route.description, canonicalFor(route.path)) });
        }
        this.emitFile({ type: 'asset', fileName: '404.html', source: metadataHtml(html, 'Página no encontrada', 'La página solicitada no está disponible.', siteUrl).replace('</head>', '<meta name="robots" content="noindex" /></head>') });
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n` });
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${escape(canonicalFor(route.path))}</loc></url>`).join('\n')}\n</urlset>\n` });
      },
    }],
    build: { outDir: 'dist', assetsInlineLimit: 0 },
  };
});
