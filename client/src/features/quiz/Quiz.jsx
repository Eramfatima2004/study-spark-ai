import { useEffect, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export function Quiz({ questions }) {
  const [questionOrder, setQuestionOrder] = useState([]);
  const [index, setIndex] = useState(0);
  const [userChoices, setUserChoices] = useState([]); // array mapping display index -> choice string
  const [complete, setComplete] = useState(false);
  const [showReviewOnly, setShowReviewOnly] = useState(false);

  // Initialize and randomize quiz questions
  useEffect(() => {
    initQuiz();
  }, [questions]);

  const initQuiz = () => {
    const indices = [...Array(questions.length).keys()];
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setQuestionOrder(indices);
    setIndex(0);
    setUserChoices(Array(questions.length).fill(null));
    setComplete(false);
    setShowReviewOnly(false);
  };

  if (questionOrder.length === 0) return null;

  const currentOriginalIndex = questionOrder[index];
  const q = questions[currentOriginalIndex];
  
  const choice = userChoices[index];
  const isAnswered = choice !== null;
  const isCorrect = choice === q.correctAnswer;

  const selectChoice = (option) => {
    if (isAnswered) return;
    setUserChoices((prev) => {
      const copy = [...prev];
      copy[index] = option;
      return copy;
    });
  };

  const goNext = () => {
    if (index === questions.length - 1) {
      setComplete(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  };

  // Score calculation
  const score = userChoices.reduce((acc, currentChoice, idx) => {
    const originalIdx = questionOrder[idx];
    const item = questions[originalIdx];
    return acc + (currentChoice === item.correctAnswer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  // Dynamic tags calculations
  const getDifficulty = (originalIdx) => {
    const difficulties = ['Easy', 'Medium', 'Hard'];
    return difficulties[originalIdx % difficulties.length];
  };

  const difficulty = getDifficulty(currentOriginalIndex);

  // Review incorrect answers data
  const incorrectQuestions = questionOrder
    .map((originalIdx, orderIdx) => ({
      originalIdx,
      orderIdx,
      q: questions[originalIdx],
      userChoice: userChoices[orderIdx]
    }))
    .filter((item) => item.userChoice !== item.q.correctAnswer);

  if (complete) {
    if (showReviewOnly) {
      return (
        <section className="learning-panel quiz-review-panel">
          <div className="panel-top">
            <div>
              <p className="kicker">Review Mistakes</p>
              <h2>Incorrect Answers <span>({incorrectQuestions.length})</span></h2>
            </div>
            <button className="secondary-button" onClick={() => setShowReviewOnly(false)}>
              Back to Summary
            </button>
          </div>

          <div className="incorrect-answers-list">
            {incorrectQuestions.length === 0 ? (
              <p className="clean-score-message">Perfect score! No incorrect answers to review.</p>
            ) : (
              incorrectQuestions.map((item, idx) => (
                <article key={idx} className="incorrect-question-item">
                  <div className="incorrect-question-header">
                    <span className="question-num">Question {item.orderIdx + 1}</span>
                    <span className="tag-badge difficulty hard">Incorrect</span>
                  </div>
                  <h4 className="incorrect-question-title">{item.q.question}</h4>
                  
                  <div className="incorrect-options-status">
                    <div className="option-status-row wrong">
                      <XCircle size={15} /> <span>Your answer: <b className="font-medium">{item.userChoice || 'Unanswered'}</b></span>
                    </div>
                    <div className="option-status-row correct">
                      <CheckCircle2 size={15} /> <span>Correct answer: <b className="font-medium">{item.q.correctAnswer}</b></span>
                    </div>
                  </div>

                  <div className="incorrect-explanation-box">
                    <strong>Explanation:</strong>
                    <p>{item.q.explanation}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      );
    }

    return (
      <section className="learning-panel completion quiz-completion-panel">
        <div className="gauge-outer">
          <div 
            className="gauge-progress" 
            style={{ background: `conic-gradient(from 180deg, #a78bfa ${percentage}%, #232230 ${percentage}% 100%)` }}
          >
            <div className="gauge-inner">
              <span className="gauge-percent">{percentage}%</span>
              <span className="gauge-score">{score} / {questions.length}</span>
            </div>
          </div>
        </div>

        <p className="kicker">Quiz complete</p>
        <h2>{score === questions.length ? 'Perfect Score!' : score >= questions.length * 0.7 ? 'Great effort!' : 'Keep practicing!'}</h2>
        <p className="completion-summary-text">
          {score === questions.length 
            ? 'You have mastered this study set. Exceptional job!' 
            : `You scored ${score} out of ${questions.length}. Re-testing helps build stronger memory paths.`}
        </p>

        <div className="completion-actions">
          {incorrectQuestions.length > 0 && (
            <button className="secondary-button" onClick={() => setShowReviewOnly(true)}>
              <AlertCircle size={15} /> Review Mistakes
            </button>
          )}
          <button className="primary-button restart-btn" onClick={initQuiz}>
            <RotateCcw size={15} /> Restart Quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="learning-panel quiz-panel">
      {/* Top panel */}
      <div className="panel-top">
        <div>
          <p className="kicker">Quick Quiz Mode</p>
          <h2>
            Question {index + 1} <span>/ {questions.length}</span>
          </h2>
        </div>
        <span className={`tag-badge difficulty ${difficulty.toLowerCase()}`}>{difficulty}</span>
      </div>

      {/* Progress bar */}
      <div className="progress">
        <i style={{ width: `${((index) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <h3 className="quiz-question">{q.question}</h3>

      {/* Options list */}
      <div className="options">
        {q.options.map((option) => {
          const isSelected = choice === option;
          const isCurrentCorrect = option === q.correctAnswer;
          
          let btnClass = '';
          if (isAnswered) {
            if (isCurrentCorrect) {
              btnClass = 'correct';
            } else if (isSelected) {
              btnClass = 'wrong';
            } else {
              btnClass = 'disabled';
            }
          }

          return (
            <button
              key={option}
              disabled={isAnswered}
              onClick={() => selectChoice(option)}
              className={btnClass}
            >
              {isAnswered && isCurrentCorrect && <CheckCircle2 size={16} />}
              {isAnswered && isSelected && !isCorrect && <XCircle size={16} />}
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback section */}
      {isAnswered && (
        <div className={`feedback ${isCorrect ? 'good' : 'bad'}`}>
          <strong>{isCorrect ? 'Exactly right.' : 'Not quite.'}</strong>
          <p>{q.explanation}</p>
          
          <div className="quiz-navigation-controls">
            <button className="icon-button prev-btn" onClick={goPrev} disabled={index === 0} aria-label="Previous question">
              <ChevronLeft size={16} />
            </button>
            <button className="primary-button next-btn" onClick={goNext}>
              {index === questions.length - 1 ? 'See results' : 'Next question'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Pre-answer back control */}
      {!isAnswered && index > 0 && (
        <div className="quiz-back-hint">
          <button className="secondary-button" onClick={goPrev}>
            <ChevronLeft size={14} /> Previous Question
          </button>
        </div>
      )}
    </section>
  );
}

