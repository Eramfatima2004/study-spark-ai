import { AlertTriangle, BookOpen, LayoutDashboard, Sparkles, Trash2, Menu, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../app/AppProvider';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { StudyInput } from '../features/generator/StudyInput';
import { Flashcards } from '../features/flashcards/Flashcards';
import { Quiz } from '../features/quiz/Quiz';
import { Summary } from '../features/summary/Summary';
import { useGeneration } from '../hooks/useGeneration';


export function WorkspacePage() {
  const [notes, setNotes] = useState('');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('summary');
  const [bookmarks, setBookmarks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState('study');

  const { sessions, setSessions } = useContext(AppContext);
  const { generate, status, error } = useGeneration();

  const activeView = searchParams.get('view') || 'workspace';

  const learningModes = [
    { id: 'study', label: '📚 Study Mode', desc: 'Comprehensive learning with detailed explanations.' },
    { id: 'interview', label: '💼 Interview Mode', desc: 'Prepare for technical interviews and placements.' },
    { id: 'revision', label: '⚡ Quick Revision', desc: 'Fast revision before exams.' }
  ];

  const setView = (v) => {
    setSidebarOpen(false);
    if (v === 'workspace') {
      setSearchParams({});
    } else {
      setSearchParams({ view: v });
    }
  };

  const submit = async () => {
    const result = await generate(notes, mode);
    if (result) {
      setData(result);
      setTab('summary');
      
      // Prevent duplicates: filter out any existing session with the same title
      const cleanSessions = sessions.filter(s => s.title.toLowerCase() !== result.title.toLowerCase());
      
      const newSession = {
        id: crypto.randomUUID(),
        title: result.title,
        createdAt: Date.now(),
        data: result
      };
      
      setSessions([newSession, ...cleanSessions]);
      setView('workspace');
      setTimeout(() => {
        document.querySelector('.results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };


  const restore = s => {
    setSidebarOpen(false);
    setData(s.data);
    setTab('summary');
    setView('workspace');

    // Move to top of recent sessions (newest first, no duplicates)
    const cleanSessions = sessions.filter(x => x.id !== s.id);
    setSessions([s, ...cleanSessions]);
    setTimeout(() => {
      document.querySelector('.results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  const deleteSession = (id, e) => {
    e.stopPropagation();
    const sessionToDelete = sessions.find(s => s.id === id);
    setSessions(prev => prev.filter(s => s.id !== id));
    if (data && sessionToDelete && data.title === sessionToDelete.data.title) {
      setData(null);
    }
  };

  // Filter library list by search query
  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (s.data.description && s.data.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="workspace">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      
      <aside className={`workspace-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="sidebar-header">
          <a href="/" className="side-brand">
            <Sparkles size={18}/> StudySpark
          </a>
          <button className="mobile-menu-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        
        <nav>
          <button className={activeView === 'workspace' ? 'active' : ''} onClick={() => setView('workspace')}>
            <LayoutDashboard size={17}/> Workspace
          </button>
          <button className={activeView === 'library' ? 'active' : ''} onClick={() => setView('library')}>
            <BookOpen size={17}/> My library
          </button>
        </nav>
        
        <div className="recent">
          <p>Recent sessions</p>
          {sessions.length ? (
            <div className="recent-list">
              {sessions.slice(0, 5).map(s => (
                <div key={s.id} className="recent-session-item">
                  <button className="recent-session-link" onClick={() => restore(s)} title={s.title}>
                    {s.title}
                  </button>
                  <button className="recent-delete-btn" onClick={(e) => deleteSession(s.id, e)} title="Delete session" aria-label="Delete session">
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span>Your saved sessions will appear here.</span>
          )}
        </div>
        <ThemeToggle />
      </aside>

      <main className="workspace-main">
        <div className="mobile-top-bar">
          <button className="mobile-menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <span className="mobile-brand">
            <Sparkles size={16} className="text-purple-400" /> StudySpark
          </span>
          <ThemeToggle />
        </div>

        {activeView === 'library' ? (
          <section className="library-view">
            <div className="library-header-row">
              <div>
                <p className="kicker">My Collection</p>
                <h2>My Library</h2>
              </div>
              <input 
                type="search" 
                className="search-input" 
                placeholder="Search study sets..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {filteredSessions.length === 0 ? (
              <div className="library-empty-state">
                <BookOpen size={48} className="text-slate-600 mb-4" />
                <p>{searchQuery ? 'No matching study sets found.' : 'Your library is empty. Generate a study set in the Workspace to start.'}</p>
                {!searchQuery && (
                  <button className="primary-button mt-4" onClick={() => setView('workspace')}>
                    Go to Workspace
                  </button>
                )}
              </div>
            ) : (
              <div className="library-grid">
                {filteredSessions.map(s => (
                  <article key={s.id} className="library-card" onClick={() => restore(s)}>
                    <div className="library-card-top">
                      <span className="library-card-date">
                        {new Date(s.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <button className="library-delete-btn" onClick={(e) => deleteSession(s.id, e)} title="Delete from Library" aria-label="Delete from library">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.data.description || 'No description available.'}</p>
                    <div className="library-card-footer">
                      <span className="library-badge">{s.data.flashcards.length} cards</span>
                      <span className="library-badge">{s.data.quiz.length} questions</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <header className="workspace-header">
              <div>
                <p className="kicker">Workspace</p>
                <h1>Make your next revision count.</h1>
              </div>
              <div className="desktop-theme-toggle">
                <ThemeToggle />
              </div>
            </header>

            <div className="mode-selector-container">
              <span className="mode-selector-label">Choose Learning Mode</span>
              <div className="mode-selector-grid">
                {learningModes.map(m => (
                  <button 
                    key={m.id} 
                    type="button" 
                    className={`mode-card ${mode === m.id ? 'active' : ''}`}
                    onClick={() => setMode(m.id)}
                  >
                    <span className="mode-title">{m.label}</span>
                    <span className="mode-desc">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <StudyInput notes={notes} onNotesChange={setNotes} onGenerate={submit} loading={status === 'loading'} />
            {status === 'loading' && <LoadingState />}
            {error && (
              <div className="error-state">
                <AlertTriangle/>
                <div>
                  <strong>{error.title || "That didn’t work this time."}</strong>
                  <p>{error.message || error}</p>
                </div>
                <button className="secondary-button" onClick={submit}>Try again</button>
              </div>
            )}
            {data && status !== 'loading' && (
              <StudyResults 
                data={data} 
                tab={tab} 
                setTab={setTab} 
                bookmarks={bookmarks} 
                setBookmarks={setBookmarks}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}



function LoadingState() {
  return (
    <section className="loading-state">
      <Sparkles size={22}/>
      <h2>Finding the signal in your notes…</h2>
      <p>Creating clear explanations, active-recall cards, and a focused quiz.</p>
      <div className="skeleton-row">
        <i/>
        <i/>
        <i/>
      </div>
    </section>
  );
}

function StudyResults({ data, tab, setTab, bookmarks, setBookmarks }) {
  const toggle = id => setBookmarks(items => items.includes(id) ? items.filter(x => x !== id) : [...items, id]);
  return (
    <section className="results">
      <div className="result-heading">
        <div>
          <p className="kicker">Ready to study</p>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
        <span className="set-count">{data.flashcards.length} cards · {data.quiz.length} questions</span>
      </div>
      <div className="tabs" role="tablist">
        {['summary','flashcards','quiz'].map(name => (
          <button 
            key={name} 
            className={tab === name ? 'active' : ''} 
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </div>
      {tab === 'summary' && <Summary data={data}/>}
      {tab === 'flashcards' && <Flashcards cards={data.flashcards} bookmarks={bookmarks} onBookmark={toggle}/>}
      {tab === 'quiz' && <Quiz questions={data.quiz}/>}
    </section>
  );
}
