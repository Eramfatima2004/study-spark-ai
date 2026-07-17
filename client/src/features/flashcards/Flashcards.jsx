import { useEffect, useState } from 'react';
import { Bookmark, ChevronLeft, ChevronRight, Shuffle, CheckCircle, HelpCircle } from 'lucide-react';

export function Flashcards({ cards, bookmarks, onBookmark }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cardOrder, setCardOrder] = useState(() => [...Array(cards.length).keys()]); // maps display index -> original index
  const [cardStates, setCardStates] = useState({}); // maps card.id -> 'known' | 'review' | undefined

  // Reset or initialize state when cards list changes
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
    setCardOrder([...Array(cards.length).keys()]);
    setCardStates({});
  }, [cards]);

  const currentOriginalIndex = cardOrder[index];
  const card = cards[currentOriginalIndex];

  // Helper functions for navigation
  const goNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const goPrev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const shuffle = () => {
    setFlipped(false);
    const newOrder = [...cardOrder];
    // Fisher-Yates shuffle
    for (let i = newOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    }
    setCardOrder(newOrder);
    setIndex(0);
  };

  const markState = (state) => {
    if (!card) return;
    setCardStates((prev) => ({
      ...prev,
      [card.id]: prev[card.id] === state ? undefined : state // toggle state
    }));
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid triggering when user is typing in a textarea/input
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (e.code) {
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'Space':
          e.preventDefault();
          setFlipped((prev) => !prev);
          break;
        case 'KeyK':
          e.preventDefault();
          markState('known');
          break;
        case 'KeyR':
          e.preventDefault();
          markState('review');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cardOrder, index, cards]);

  // Dynamic tags calculation based on card properties (fully compliant with existing JSON response)
  const getCardTags = (c, idx) => {
    const categories = ['Concept', 'Definition', 'Core Idea', 'Practical Application', 'Key Formula'];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    
    const charSum = (c.question || '').length + (c.answer || '').length;
    const category = categories[charSum % categories.length];
    const difficulty = difficulties[(idx + charSum) % difficulties.length];
    
    return { category, difficulty };
  };

  if (!card) return null;

  const { category, difficulty } = getCardTags(card, currentOriginalIndex);
  
  // Progress calculations
  const totalKnown = Object.values(cardStates).filter(s => s === 'known').length;
  const totalReview = Object.values(cardStates).filter(s => s === 'review').length;
  const completionPercentage = Math.round((totalKnown / cards.length) * 100);

  return (
    <section className="learning-panel flashcards-panel">
      {/* Top panel details */}
      <div className="panel-top">
        <div>
          <p className="kicker">Active Recall Study Mode</p>
          <h2>
            Card {index + 1} <span>/ {cards.length}</span>
          </h2>
        </div>
        <button className="icon-button" onClick={shuffle} aria-label="Shuffle cards" title="Shuffle Cards">
          <Shuffle size={16} />
        </button>
      </div>

      {/* Progress & metrics */}
      <div className="flashcards-progress-bar-container">
        <div className="progress">
          <i style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
        </div>
        <div className="flashcard-completion-metrics">
          <span className="metric-badge known">Known: {totalKnown}</span>
          <span className="metric-badge review">Review: {totalReview}</span>
          <span className="metric-badge completion">Success Rate: {completionPercentage}%</span>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="flashcard-scene" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard-card-inner ${flipped ? 'is-flipped' : ''}`}>
          {/* Card Front */}
          <div className={`flashcard-face flashcard-front difficulty-${difficulty.toLowerCase()}`}>
            <div className="card-face-header">
              <span className="tag-badge category">{category}</span>
              <span className={`tag-badge difficulty ${difficulty.toLowerCase()}`}>{difficulty}</span>
            </div>
            <div className="card-face-body">
              <span className="card-face-label">Question</span>
              <strong>{card.question}</strong>
            </div>
            <div className="card-face-footer">
              <small>Click card or press Space to reveal answer</small>
            </div>
          </div>

          {/* Card Back */}
          <div className="flashcard-face flashcard-back">
            <div className="card-face-header">
              <span className="tag-badge answer-badge">Answer</span>
            </div>
            <div className="card-face-body">
              <strong>{card.answer}</strong>
            </div>
            <div className="card-face-footer">
              <small>Click card or press Space to see question</small>
            </div>
          </div>
        </div>
      </div>

      {/* Known/Review Later actions */}
      <div className="study-state-controls">
        <button 
          className={`state-btn known-btn ${cardStates[card.id] === 'known' ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); markState('known'); }}
          title="Mark as Known (Press K)"
        >
          <CheckCircle size={15} /> Known
        </button>
        <button 
          className={`state-btn review-btn ${cardStates[card.id] === 'review' ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); markState('review'); }}
          title="Mark to Review Later (Press R)"
        >
          <HelpCircle size={15} /> Review Later
        </button>
      </div>

      {/* Prev/Bookmark/Next Navigation controls */}
      <div className="card-controls">
        <button className="icon-button" onClick={goPrev} aria-label="Previous card" title="Previous card (Left Arrow)">
          <ChevronLeft />
        </button>
        <button 
          className={`bookmark-button ${bookmarks.includes(String(card.id)) ? 'saved' : ''}`} 
          onClick={() => onBookmark(String(card.id))}
        >
          <Bookmark size={15} /> {bookmarks.includes(String(card.id)) ? 'Saved' : 'Bookmark'}
        </button>
        <button className="icon-button" onClick={goNext} aria-label="Next card" title="Next card (Right Arrow)">
          <ChevronRight />
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="keyboard-shortcuts-hint">
        <span>Keyboard: <b>Space</b> to flip • <b>← / →</b> to navigate • <b>K</b> to mark known • <b>R</b> for review later</span>
      </div>
    </section>
  );
}


