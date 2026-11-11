import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, ArrowUp, Mail, Menu, X } from 'lucide-react';
import { currentRoute, navigation, routeHref, siteConfig } from '../config/site';
import { routes } from '../config/routes';
import { AccessButton } from './AccessButton';

function Brand() {
  return <a className="brand" href={routeHref('/')} aria-label="Stryvexa, inicio"><img className="brand-logo" src={siteConfig.logoUrl} alt="Stryvexa" /></a>;
}

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const route = currentRoute();
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header"><div className="container header-row"><Brand /><nav id="main-navigation" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Principal" onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); document.getElementById('menu-toggle')?.focus(); } }}>{navigation.map(item => <a key={item.path} href={routeHref(item.path)} aria-current={route === item.path ? 'page' : undefined}>{item.label}</a>)}<a className="mobile-only" href={routeHref('/faq')}>Preguntas frecuentes</a><a className="mobile-only" href={routeHref('/contact')}>Contacto</a><div className="mobile-legal"><a href={routeHref('/privacy')}>Privacidad</a><a href={routeHref('/terms')}>Términos</a></div></nav><div className="header-actions"><a className="header-contact" href={routeHref('/contact')}>Hablemos</a><AccessButton className="button header-access" /><button id="menu-toggle" className="menu-toggle icon-button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div></div><nav className="container header-information" aria-label="Información y documentos legales"><a href={routeHref('/faq')}>Preguntas frecuentes</a><a href={routeHref('/contact')}>Contacto</a><a href={routeHref('/privacy')}>Privacidad</a><a href={routeHref('/terms')}>Términos de servicio</a></nav></header>
    <main id="contenido" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><Brand /><p>Tu talento tiene contexto.<br />Tus datos, una nueva perspectiva.</p><a className="parent-link" href="https://ormivexa.com">Un producto de Ormivexa<ArrowUpRight size={12} aria-hidden="true" /></a></div><div><h2>EXPLORA STRYVEXA</h2>{routes.filter(item => ['/platform', '/creators', '/brands', '/how-it-works'].includes(item.path)).map(item => <a key={item.path} href={routeHref(item.path)}>{item.label}</a>)}</div><div><h2>ESTAMOS CERCA</h2><a href={routeHref('/faq')}>Preguntas frecuentes</a><a href={routeHref('/contact')}>Contacto y soporte</a><a href={`mailto:${siteConfig.contactEmail}`}><Mail size={13} aria-hidden="true" />{siteConfig.contactEmail}</a></div><div><h2>TRANSPARENCIA</h2><a href={routeHref('/privacy')}>Política de privacidad</a><a href={routeHref('/terms')}>Términos de servicio</a><a href={`${routeHref('/contact')}#datos`}>Solicitudes sobre datos</a></div></div><div className="footer-disclosure">Los paneles de esta web son demostraciones con datos ficticios. La conexión con TikTok depende de autorización, permisos y disponibilidad; no se anuncia aprobación ni aval de TikTok.</div><div className="footer-bottom"><span>© {new Date().getFullYear()} Stryvexa.</span><span>CREADO CON INTENCIÓN. DISEÑADO PARA CONECTAR.</span><a href="#contenido">Volver arriba<ArrowUp size={13} aria-hidden="true" /></a></div></div></footer></>;
}
