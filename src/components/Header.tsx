import React from 'react';
import { HeaderProps, Difficulty } from '../types';
import './Header.css';

const Header: React.FC<HeaderProps> = ({ 
  score, 
  timeLeft, 
  difficulty, 
  changeDifficulty, 
  isPlaying 
}) => {
  // Format the time to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeDifficulty(e.target.value as Difficulty);
  };
  
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
            onChange={handleDifficultyChange}
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
};

export default Header; 