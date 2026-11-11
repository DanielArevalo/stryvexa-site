# Stryvexa · web pública

React + TypeScript + Vite, Tailwind CSS 4 y Lucide React. Web pública con diseño responsive, navegación, dashboard conceptual interactivo, perfiles y gráficos de demostración. Todas las cifras de los mockups son ficticias; no son capturas reales ni resultados de usuarios.

## Configuración

Contenido público completado: explicación de campañas por rol, recorrido de cinco pasos, FAQ y soporte por correo. Privacidad y términos permanecen íntegros en `src/assets/legal.json`, con acceso desde header, footer y diálogo de acceso. La aplicación autenticada todavía no tiene una URL pública facilitada; el acceso dirige a contacto. Metadatos Open Graph y Twitter por ruta. Revisión de fuentes únicamente, sin build, tests, lint ni comprobación del despliegue.

- `src/config/defaults.ts` conserva contacto y URLs actuales/futuras; `src/config/site.ts` aplica variables de entorno. `.env.example` contiene la configuración temporal de GitHub Pages.
- Recursos oficiales conservados en `src/assets/`, sin modificar imágenes. `src/config/brand.ts` centraliza las importaciones Vite: logo horizontal oficial para fondo oscuro en header/footer, símbolo para isotipos e icono de aplicación intacto. `index.html` usa los favicon ICO/PNG y Apple Touch Icon originales. El manifest fuente es `src/assets/manifest.webmanifest`; Vite publica `manifest.webmanifest` con los iconos PWA oficiales de 192 y 512 px y las URLs generadas para cada entorno. No se conservan copias de imágenes en `public/`.
- Rutas: `/`, `/platform`, `/creators`, `/brands`, `/how-it-works`, `/faq`, `/contact`, `/privacy` y `/terms`. `src/config/routes.ts` centraliza sus metadatos. Vite prepara una entrada HTML por ruta, con canonical y metadatos propios, además de robots, sitemap y página 404. Los enlaces siguen la base configurada para funcionar en GitHub Pages y Cloudflare Pages. Las consultas legales anteriores `?page=privacy` y `?page=terms` siguen mostrando el documento correspondiente.
- El contenido legal íntegro se conserva en `src/assets/legal.json`. Solo se anuncia TikTok como integración implementada, sujeta a permisos, revisión y disponibilidad. No se anuncia aprobación de TikTok, publicación de videos ni monitoreo automático de LIVE.
- El callback, la asociación Android y el archivo de verificación TikTok se trasladaron sin modificar a `public/`. Vite los copia a la misma ruta pública relativa. No se modificaron OAuth, Redirect URI ni backend.

## Preparación manual pendiente

1. Utilizar Node.js 22.12 o posterior. Se conserva el `package-lock.json` existente; si hay que restaurar dependencias, usar `npm ci` manualmente. No se instalaron ni añadieron dependencias durante este rediseño.
2. Cuando se autorice la validación, ejecutar `npm run build` y revisar manualmente navegación directa y recarga de todas las rutas, menú móvil, paneles de ejemplo, accesibilidad, documentos legales y callback. No se ejecutaron build, tests, lint ni servidores.
3. GitHub Pages usa GitHub Actions para publicar `dist`. Vite deriva la base `/stryvexa-site/` de la URL pública que define el workflow.
4. Cloudflare Pages compila `main` con `npm run build` y publica `dist`. Vite usa la base `/` y el dominio canónico `https://stryvexa.ormivexa.com/` en Cloudflare Pages.
5. El botón Acceder abre información de acceso y enlaces legales. `VITE_ACCESS_URL` conserva la dirección pública facilitada, no un endpoint de login. Configurar la URL y el acceso real a la aplicación en una tarea autorizada cuando estén disponibles. No se modifica autenticación ni se inicia OAuth desde esta web.

Ambos alojamientos deben servir `dist`. Las entradas de las rutas comerciales no duplican ni redirigen el callback de TikTok, que se conserva únicamente en `public/tiktok-callback/index.html`.
