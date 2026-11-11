import { Plus } from 'lucide-react';
import { faqs } from '../config/faq';
export function FAQList({ limit }: { limit?: number }) {
  return <div className="faq-list">{faqs.slice(0, limit).map(item => <details key={item.question}><summary>{item.question}<Plus size={17} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>;
}
