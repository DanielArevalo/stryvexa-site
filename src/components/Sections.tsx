import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, Fingerprint, Link2, ShieldCheck } from 'lucide-react';
import { routeHref } from '../config/site';
import { AccessButton } from './AccessButton';

export function Eyebrow({ children, number }: { children: ReactNode; number?: string }) {
  return <span className="eyebrow">{number ? <span className="section-number">{number}</span> : <span className="eyebrow-dot" />}{children}</span>;
}
export function PageIntro({ label, title, accent, children }: { label: string; title: string; accent: string; children: ReactNode }) {
  return <section className="page-intro container"><Eyebrow>{label}</Eyebrow><h1>{title}<br /><span className="gradient-text">{accent}</span></h1><div className="intro-description">{children}</div></section>;
}
export function DemoLabel() { return <span className="demo-label"><span /> DEMOSTRACIÓN · DATOS FICTICIOS</span>; }
export function IntegrationNotice() {
  return <aside className="integration-notice"><ShieldCheck size={20} aria-hidden="true" /><div><strong>Autorización, antes que información.</strong><p>La conexión con TikTok está implementada en el producto. Su uso depende de los permisos autorizados, la revisión de TikTok y la disponibilidad del servicio. No se afirma que esos permisos estén aprobados.</p></div></aside>;
}
export function IntegrationSection() {
  return <section className="section container" id="integraciones"><div className="section-heading"><div><Eyebrow>INTEGRACIÓN CON PROPÓSITO</Eyebrow><h2>Tu cuenta.<br /><span>Tu autorización.</span></h2></div><p>Una conexión voluntaria para consultar información de perfil y contenido. Solo anunciamos la integración presente en el producto.</p></div><div className="integration-panel"><div className="integration-platform"><div className="platform-symbol" aria-hidden="true">♪</div><div><h3>TikTok</h3><span className="integration-status">Implementada · sujeta a permisos</span></div></div><div className="connection-line" aria-hidden="true"><i /><Link2 size={19} /><i /></div><div className="authorization-points"><span><Check size={15} />Perfil autorizado</span><span><Check size={15} />Videos publicados</span><span><Check size={15} />Métricas disponibles</span></div></div><IntegrationNotice /></section>;
}
export function SecuritySection() {
  return <section className="security-section"><div className="container security-grid"><div><Eyebrow>SEGURIDAD Y PRIVACIDAD</Eyebrow><h2>La confianza empieza<br /><span>por tu consentimiento.</span></h2><p>Los creadores pueden conectar sus cuentas sociales de forma voluntaria para permitir que Stryvexa consulte métricas y contenido relacionado con sus campañas.</p><a className="text-link" href={routeHref('/privacy')}>Conoce el tratamiento de tus datos<ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="privacy-items"><article><span className="feature-icon"><Fingerprint size={21} /></span><div><h3>Decides qué autorizas</h3><p>Revisa los permisos en la plataforma externa antes de conceder acceso. Esta web no solicita tu contraseña de TikTok.</p></div></article><article><span className="feature-icon blue"><ShieldCheck size={21} /></span><div><h3>Información con contexto</h3><p>Las marcas acceden a la información necesaria de las campañas en las que tienen una relación válida con el creador.</p></div></article><a className="privacy-link" href={routeHref('/terms')}>Consulta las condiciones del servicio<ArrowRight size={16} aria-hidden="true" /></a></div></div></section>;
}
export function ContactCTA() {
  return <section className="container cta-section"><div className="contact-cta"><div className="cta-orbit" aria-hidden="true" /><div><Eyebrow>EL SIGUIENTE PASO</Eyebrow><h2>Tu potencial merece<br /><span>una nueva perspectiva.</span></h2><p>Conoce Stryvexa y conversemos sobre tu próximo paso.</p></div><div className="cta-actions"><a className="button primary" href={routeHref('/contact')}>Hablemos<ArrowUpRight size={17} aria-hidden="true" /></a><AccessButton /></div></div></section>;
}
