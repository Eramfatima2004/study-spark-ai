import { Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="StudySpark AI home">
          <span className="brand-mark"><Sparkles size={17} aria-hidden="true" /></span>
          <span>StudySpark <em>AI</em></span>
        </a>
        <span className="header-status"><i /> AI study companion</span><ThemeToggle />
      </header>
      <main><Outlet /></main>
    </div>
  );
}
