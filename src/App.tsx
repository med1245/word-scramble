import React, { useState, useEffect } from 'react';
import './App.css';
import GameContainer from './components/GameContainer';
import Header from './components/Header';
import Instructions from './components/Instructions';
import GameOverModal from './components/GameOverModal';
import { getRandomWord, scrambleWord } from './utils/wordUtils';
import { Difficulty } from './types';

const App: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [scrambledWord, setScrambledWord] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  
  // Setup a new game
  const startGame = () => {
    setScore(0);
    setTimeLeft(getDifficultyTimeLimit());
    setIsPlaying(true);
    setShowGameOver(false);
    nextWord();
  };
  
  // Get time limit based on difficulty
  const getDifficultyTimeLimit = (): number => {
    switch (difficulty) {
      case 'easy': return 90;
      case 'medium': return 60;
      case 'hard': return 30;
      default: return 60;
    }
  };
  
  // Generate a new word puzzle
  const nextWord = () => {
    const word = getRandomWord(difficulty);
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserInput('');
  };
  
  // Check user's answer
  const checkAnswer = () => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      // Correct answer
      const points = calculatePoints();
      setScore(prevScore => prevScore + points);
      nextWord();
    }
  };
  
  // Calculate points based on word length and difficulty
  const calculatePoints = (): number => {
    const basePoints = currentWord.length;
    switch (difficulty) {
      case 'easy': return basePoints;
      case 'medium': return basePoints * 2;
      case 'hard': return basePoints * 3;
      default: return basePoints;
    }
  };
  
  // Change difficulty level
  const changeDifficulty = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    if (isPlaying) {
      // Restart game if already playing
      startGame();
    }
  };
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setShowGameOver(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, isPlaying]);
  
  // Handle user input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkAnswer();
  };
  
  return (
    <div className="app">
      <Header 
        score={score} 
        timeLeft={timeLeft} 
        difficulty={difficulty} 
        changeDifficulty={changeDifficulty} 
        isPlaying={isPlaying}
      />
      
      {!isPlaying && !showGameOver && (
        <Instructions startGame={startGame} />
      )}
      
      {isPlaying && (
        <GameContainer 
          scrambledWord={scrambledWord} 
          userInput={userInput} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit}
        />
      )}
      
      {showGameOver && (
        <GameOverModal 
          score={score} 
          difficulty={difficulty} 
          startNewGame={startGame} 
        />
      )}
    </div>
  );
};

export default App; 