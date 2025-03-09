import React from 'react';
import './GameHeader.css';

function GameHeader({ score, timeLeft, formatTime, difficulty, changeDifficulty, isPlaying }) {
  return (
    <header className="header">
      <div className="logo">
        <h1>Word Scramble</h1>
      </div>
      
      <div className="game-info">
        <div className="timer">
          <span className="label">Time:</span>
          <span className="value">{formatTime(timeLeft)}</span>
        </div>
        
        <div className="score">
          <span className="label">Score:</span>
          <span className="value">{score}</span>
        </div>
        
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty" 
            value={difficulty} 
            onChange={(e) => changeDifficulty(e.target.value)}
            disabled={isPlaying}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default GameHeader; 