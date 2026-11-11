import { useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { routeHref, siteConfig } from '../config/site';

export function AccessButton({ className = 'button secondary', children = 'Acceder' }: { className?: string; children?: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return <><button type="button" className={className} onClick={() => dialog.current?.showModal()}>{children}<ArrowUpRight size={16} aria-hidden="true" /></button>
    <dialog ref={dialog} className="access-dialog" aria-labelledby={titleId} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button className="dialog-close icon-button" type="button" aria-label="Cerrar información de acceso" onClick={() => dialog.current?.close()}><X size={20} /></button>
      <img src={siteConfig.iconUrl} width="60" height="60" alt="" /><span className="eyebrow">ACCESO A STRYVEXA</span><h2 id={titleId}>Antes de continuar.</h2><p>Para conocer la disponibilidad de acceso a la aplicación, contacta al equipo de Stryvexa. Indica si quieres utilizarla como creador o como marca.</p><p>El acceso a la aplicación todavía no está publicado en esta web. Aquí puedes conocer el producto y consultar sus condiciones; no se solicitan credenciales ni se inicia la autorización de TikTok.</p><a className="button primary" href={routeHref('/contact')}>Consultar acceso<ArrowUpRight size={16} aria-hidden="true" /></a><a className="text-link current-access" href={`mailto:${siteConfig.contactEmail}?subject=Acceso%20a%20Stryvexa`}>{siteConfig.contactEmail}</a><div className="dialog-legal"><a href={routeHref('/privacy')}>Política de privacidad</a><a href={routeHref('/terms')}>Términos de servicio</a></div>
    </dialog></>;
}
