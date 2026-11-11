import { ArrowLeft } from 'lucide-react';
import { PageIntro } from '../components/Sections';
import { routeHref } from '../config/site';
export function NotFoundPage() {
  return <><PageIntro label="ERROR 404" title="Esta página no está aquí." accent="La perspectiva sigue adelante."><p>Puedes regresar al inicio para descubrir Stryvexa.</p><a className="button primary" href={routeHref('/')}><ArrowLeft size={16} />Volver al inicio</a></PageIntro></>;
}
