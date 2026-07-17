import { AlertTriangle, Award, BookOpen, Brain, HelpCircle, Lightbulb, Sparkles } from 'lucide-react';

function parseSummary(summaryText) {
  const sections = [];
  const parts = summaryText.split(/###\s+/);
  
  if (parts[0] && parts[0].trim()) {
    // If there is text before the first ### header, treat it as Detailed Explanation
    sections.push({
      title: 'Detailed Explanation',
      content: parts[0].trim()
    });
  }
  
  for (let i = 1; i < parts.length; i++) {
    const lines = parts[i].split('\n');
    const title = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    if (title && content) {
      sections.push({ title, content });
    }
  }
  
  // If no sections were found (e.g. not in the ### format), fallback to putting the whole thing under Detailed Explanation
  if (sections.length === 0 && summaryText) {
    sections.push({
      title: 'Detailed Explanation',
      content: summaryText.trim()
    });
  }
  
  return sections;
}

function getIcon(title) {
  const t = title.toLowerCase();
  if (t.includes('explanation') || t.includes('summary')) return <Brain size={18} className="text-purple-400" />;
  if (t.includes('definition')) return <BookOpen size={18} className="text-blue-400" />;
  if (t.includes('mistake')) return <AlertTriangle size={18} className="text-rose-400" />;
  if (t.includes('tip')) return <Award size={18} className="text-amber-400" />;
  if (t.includes('mnemonic')) return <Sparkles size={18} className="text-violet-400" />;
  if (t.includes('example')) return <Lightbulb size={18} className="text-emerald-400" />;
  return <HelpCircle size={18} className="text-gray-400" />;
}

function renderContent(content) {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  const isList = lines.some(line => line.startsWith('-') || line.startsWith('*'));

  if (isList) {
    return (
      <ul className="summary-card-list">
        {lines.map((line, idx) => {
          const cleanLine = line.replace(/^[-*]\s*/, '');
          const boldMatch = cleanLine.match(/^\*\*(.*?)\*\*:\s*(.*)/);
          if (boldMatch) {
            return (
              <li key={idx} className="summary-list-item">
                <strong className="text-purple-300 font-semibold">{boldMatch[1]}</strong>: {boldMatch[2]}
              </li>
            );
          }
          const normalBoldMatch = cleanLine.split(/\*\*(.*?)\*\*/g);
          return (
            <li key={idx} className="summary-list-item">
              {normalBoldMatch.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-purple-300">{part}</strong> : part)}
            </li>
          );
        })}
      </ul>
    );
  }

  return content.split('\n\n').map((paragraph, idx) => {
    const pLines = paragraph.split('\n');
    return (
      <p key={idx} className="summary-paragraph text-slate-300 text-sm leading-relaxed mb-3">
        {pLines.map((line, lineIdx) => {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <span key={lineIdx}>
              {parts.map((part, partIdx) => partIdx % 2 === 1 ? <strong key={partIdx} className="font-semibold text-purple-300">{part}</strong> : part)}
              {lineIdx < pLines.length - 1 && <br />}
            </span>
          );
        })}
      </p>
    );
  });
}

export function Summary({ data }) {
  const sections = parseSummary(data.summary);
  
  return (
    <div className="summary-container">
      <section className="summary-main-section">
        <p className="kicker"><Lightbulb size={15}/> Study summary</p>
        <h2>{data.title}</h2>
        <p className="summary-subtitle">{data.description}</p>
        
        <div className="summary-cards-grid">
          {sections.map(({ title, content }) => (
            <article key={title} className={`summary-card card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="summary-card-header">
                <span className="summary-card-icon-wrapper">{getIcon(title)}</span>
                <h3>{title}</h3>
              </div>
              <div className="summary-card-body">
                {renderContent(content)}
              </div>
            </article>
          ))}
        </div>
      </section>

      {data.keyPoints && data.keyPoints.length > 0 && (
        <section className="key-points-section">
          <h3>Quick Revision Notes</h3>
          <div className="key-points-badges">
            {data.keyPoints.map((point, index) => (
              <span key={index} className="key-point-badge">
                <i className="badge-bullet">✦</i> {point}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

