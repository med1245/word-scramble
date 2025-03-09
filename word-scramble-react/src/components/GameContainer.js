import React, { useEffect, useRef } from 'react';
import './GameContainer.css';

function GameContainer({ 
  scrambledWord, 
  wordCount, 
  totalWords, 
  userInput, 
  setUserInput, 
  checkAnswer, 
  skipWord, 
  feedback, 
  feedbackType 
}) {
  const inputRef = useRef(null);

  // Focus the input field when component mounts or scrambledWord changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [scrambledWord]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
  };

  return (
    <div className="game-container container">
      <div className="current-word">Word {wordCount}</div>
      <div className="word-display">
        {scrambledWord.split('').map((letter, index) => (
          <span key={index} className="letter">{letter}</span>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your answer here..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        <div className={`feedback ${feedback ? 'show' : ''} ${feedbackType === 'error' ? 'error' : ''}`}>
          {feedback}
        </div>
        
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" className="skip-button" onClick={skipWord}>
            Skip Word
          </button>
        </div>
      </form>
      
      <div className="word-count">
        {wordCount} of {totalWords} words
      </div>
    </div>
  );
}

export default GameContainer; 