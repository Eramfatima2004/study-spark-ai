import { Lightbulb } from 'lucide-react';
export function Summary({ data }) { return <section className="summary"><p className="kicker"><Lightbulb size={15}/> Study summary</p><h2>{data.title}</h2><p className="summary-copy">{data.summary}</p><h3>Key ideas to retain</h3><ul>{data.keyPoints.map(point => <li key={point}>{point}</li>)}</ul></section>; }
