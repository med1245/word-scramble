import React from 'react';
import './GameOverModal.css';

function GameOverModal({ score, getScoreMessage, wordCount, startGame }) {
  return (
    <div className="game-over-modal container">
      <h2>Game Over!</h2>
      
      <div className="final-score">
        <span className="score-label">Your Score:</span>
        <span className="score-value">{score}</span>
      </div>
      
      <p className="score-message">{getScoreMessage()}</p>
      
      <div className="word-count">
        Words completed: {wordCount - 1}
      </div>
      
      <button className="restart-button" onClick={startGame}>
        Play Again
      </button>
    </div>
  );
}

export default GameOverModal; 