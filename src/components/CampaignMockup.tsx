import { ArrowUpRight, FileVideo, Users } from 'lucide-react';
import { DemoLabel } from './Sections';

export function CampaignMockup() {
  return <figure className="campaign-figure"><figcaption><DemoLabel /></figcaption>
    <div className="campaign-panel">
      <div className="campaign-panel-heading"><span className="micro-label">CONTEXTO DE UNA COLABORACIÓN</span><span className="campaign-status">EJEMPLO FICTICIO</span></div>
      <h3>Campaña de ejemplo<span>01</span></h3>
      <p className="campaign-description">Una vista ilustrativa de campaña, contenido y participación.</p>
      <div className="campaign-flow" aria-label="Recorrido ilustrativo de una campaña"><span>Campaña</span><i aria-hidden="true" /><span>Participación</span><i aria-hidden="true" /><span>Contenido</span></div>
      <div className="campaign-detail"><FileVideo size={18} aria-hidden="true" /><div><strong>Requisito de ejemplo</strong><span>Video publicado · información ficticia</span></div><span className="campaign-count">01</span></div>
      <div className="campaign-detail"><Users size={18} aria-hidden="true" /><div><strong>Creador de ejemplo</strong><span>Invitación aceptada · estado ficticio</span></div><span className="campaign-avatar" aria-hidden="true">CE</span></div>
      <div className="campaign-source"><span>INFORMACIÓN ORGANIZADA POR CAMPAÑA</span><ArrowUpRight size={17} aria-hidden="true" /></div>
    </div>
    <p className="demo-caption">Composición conceptual con información ficticia. No representa una campaña ni resultados reales.</p>
  </figure>;
}
