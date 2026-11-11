import { ArrowLeft, ShieldCheck } from 'lucide-react';
import legalContent from '../assets/legal.json';
import { routeHref, siteConfig } from '../config/site';
import { Eyebrow } from '../components/Sections';

export function LegalPage({ document }: { document: 'privacy' | 'terms' }) {
  return <section className="container legal-layout"><aside className="legal-sidebar"><span className="feature-icon"><ShieldCheck size={24} /></span><Eyebrow>TRANSPARENCIA</Eyebrow><p>La información que necesitas, en un mismo lugar.</p><nav aria-label="Documentos legales"><a href={routeHref('/privacy')} aria-current={document === 'privacy' ? 'page' : undefined}>Política de privacidad</a><a href={routeHref('/terms')} aria-current={document === 'terms' ? 'page' : undefined}>Términos de servicio</a><a href={`${routeHref('/contact')}#datos`}>Solicitudes sobre datos</a></nav></aside><article className="legal-page">{legalContent[document].map((block, index) => {
    if (block.type === 'h1') return <h1 key={index}>{block.text}</h1>;
    if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>;
    return <p key={index}>{block.text}</p>;
  })}<div className="legal-contact"><strong>Contacto de Stryvexa</strong><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></div><a className="text-link" href={routeHref('/')}><ArrowLeft size={15} />Volver al inicio</a></article></section>;
}
