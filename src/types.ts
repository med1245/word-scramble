import React from 'react';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface HeaderProps {
  score: number;
  timeLeft: number;
  difficulty: Difficulty;
  changeDifficulty: (difficulty: Difficulty) => void;
  isPlaying: boolean;
}

export interface GameContainerProps {
  scrambledWord: string;
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface InstructionsProps {
  startGame: () => void;
}

export interface GameOverModalProps {
  score: number;
  difficulty: Difficulty;
  startNewGame: () => void;
} 