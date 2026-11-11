import { FAQList } from '../components/FAQList';
import { ContactCTA, PageIntro } from '../components/Sections';
export function FAQPage() {
  return <><PageIntro label="PREGUNTAS FRECUENTES" title="Lo que necesitas saber." accent="Respuestas claras."><p>Respuestas sobre el producto, la autorización de TikTok, el alcance de las métricas y el uso de tu información.</p></PageIntro><section className="container faq-page"><FAQList /></section><ContactCTA /></>;
}
