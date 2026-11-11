import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { currentRoute, siteConfig } from './config/site';
import { routes } from './config/routes';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { CreatorsPage } from './pages/CreatorsPage';
import { BrandsPage } from './pages/BrandsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

const pages = {
  '/': <HomePage />, '/platform': <PlatformPage />, '/creators': <CreatorsPage />,
  '/brands': <BrandsPage />, '/how-it-works': <HowItWorksPage />, '/faq': <FAQPage />,
  '/contact': <ContactPage />, '/privacy': <LegalPage document="privacy" />, '/terms': <LegalPage document="terms" />,
};

export default function App() {
  const path = currentRoute();
  const metadata = routes.find(route => route.path === path);
  useEffect(() => {
    const title = `${metadata?.title || 'Página no encontrada'} | Stryvexa`;
    document.title = title;
    const url = new URL(path === '/' ? './' : path.slice(1) + '/', siteConfig.publicUrl).href;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
    for (const [selector, content] of [
      ['meta[property="og:url"]', url], ['meta[property="og:title"]', title],
      ['meta[name="twitter:title"]', title],
      ['meta[name="twitter:description"]', metadata?.description || 'Página no encontrada en Stryvexa.'],
      ['meta[name="description"]', metadata?.description || 'Página no encontrada en Stryvexa.'],
      ['meta[property="og:description"]', metadata?.description || 'Página no encontrada en Stryvexa.'],
    ]) {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    }
  }, [path, metadata]);
  return <Layout>{Object.hasOwn(pages, path) ? pages[path as keyof typeof pages] : <NotFoundPage />}</Layout>;
}
