import React from 'react';
import './Instructions.css';

function Instructions({ startGame }) {
  return (
    <div className="instructions-container container">
      <h2>How to Play</h2>
      
      <div className="instructions-content">
        <p>
          Word Scramble is a fun word game that tests your vocabulary and spelling skills.
        </p>
        
        <ol>
          <li>You will be shown a scrambled word.</li>
          <li>Try to figure out what the original word is.</li>
          <li>Type your answer in the input field.</li>
          <li>Press Enter or click Submit to check your answer.</li>
          <li>Use the "Skip Word" button if you're stuck.</li>
          <li>Earn points for each correct word you unscramble.</li>
          <li>Complete as many words as you can before time runs out!</li>
        </ol>
        
        <p className="hint">
          <strong>Tip:</strong> Choose your difficulty level before starting the game - 
          harder difficulty levels give more points but use longer words!
        </p>
      </div>
      
      <button className="start-button" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}

export default Instructions; 