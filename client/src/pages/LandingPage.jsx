import { ArrowRight, BrainCircuit, Layers3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Layers3, title: 'Active recall', text: 'Turn dense materials into practical, memorable cards.' },
  { icon: BrainCircuit, title: 'Adaptive practice', text: 'Test your understanding one focused question at a time.' },
  { icon: Sparkles, title: 'Clearer revision', text: 'Distill the ideas that deserve your attention.' },
];

export function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <p className="eyebrow"><Sparkles size={14} /> Your notes, made memorable</p>
        <h1>Study less.<br /><span>Remember more.</span></h1>
        <p className="hero-copy">Transform any study material into interactive flashcards, focused quizzes, and concise revision notes.</p>
        <Link className="primary-button" to="/workspace">Start studying <ArrowRight size={17} /></Link>
      </section>
      <section className="feature-grid" aria-label="StudySpark features">
        {features.map(({ icon: Icon, title, text }) => (
          <article className="feature-card" key={title}>
            <Icon size={20} />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
