import React from 'react';
import { GameOverModalProps } from '../types';
import './GameOverModal.css';

const GameOverModal: React.FC<GameOverModalProps> = ({ score, difficulty, startNewGame }) => {
  // Get a message based on the score and difficulty
  const getScoreMessage = (): string => {
    let threshold;
    
    switch (difficulty) {
      case 'easy': threshold = 30; break;
      case 'medium': threshold = 50; break;
      case 'hard': threshold = 80; break;
      default: threshold = 50;
    }
    
    if (score >= threshold * 2) {
      return "Amazing! You're a word master!";
    } else if (score >= threshold) {
      return "Great job! You have excellent word skills!";
    } else if (score >= threshold / 2) {
      return "Good effort! Keep practicing!";
    } else {
      return "Nice try! You'll do better next time!";
    }
  };
  
  return (
    <div className="game-over-modal container">
      <h2>Game Over!</h2>
      
      <div className="final-score">
        <span className="score-label">Your Score:</span>
        <span className="score-value">{score}</span>
      </div>
      
      <p className="score-message">{getScoreMessage()}</p>
      
      <button className="restart-button" onClick={startNewGame}>
        Play Again
      </button>
    </div>
  );
};

export default GameOverModal; 