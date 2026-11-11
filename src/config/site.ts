import { siteDefaults } from './defaults';
import { brandAssets } from './brand';

export const siteConfig = {
  ...siteDefaults,
  publicUrl: import.meta.env.VITE_PUBLIC_URL || siteDefaults.publicUrl,
  accessUrl: import.meta.env.VITE_ACCESS_URL || siteDefaults.accessUrl,
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || siteDefaults.contactEmail,
  iconUrl: brandAssets.appIconUrl,
  logoUrl: brandAssets.horizontalLogoUrl,
  symbolUrl: brandAssets.symbolUrl,
};

export function routeHref(path: string) {
  return `${import.meta.env.BASE_URL}${path === '/' ? '' : path.replace(/^\//, '') + '/'}`;
}

export function currentRoute() {
  const legacyPage = new URLSearchParams(window.location.search).get('page');
  if (legacyPage === 'privacy' || legacyPage === 'terms') return `/${legacyPage}`;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname = window.location.pathname;
  const relative = base && (pathname === base || pathname.startsWith(`${base}/`)) ? pathname.slice(base.length) : pathname;
  return relative === '/index.html' ? '/' : relative.replace(/\/$/, '') || '/';
}

export const navigation = [
  { path: '/platform', label: 'Plataforma' },
  { path: '/creators', label: 'Creadores' },
  { path: '/brands', label: 'Marcas y agencias' },
  { path: '/how-it-works', label: 'Cómo funciona' },
] as const;
