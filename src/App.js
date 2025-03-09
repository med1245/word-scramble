import React, { useState, useEffect } from 'react';
import './App.css';
import GameHeader from './components/GameHeader';
import Instructions from './components/Instructions';
import GameContainer from './components/GameContainer';
import GameOverModal from './components/GameOverModal';

// Word lists by difficulty
const WORD_LISTS = {
  easy: [
    'cat', 'dog', 'sun', 'hat', 'run', 'box', 'cup', 'pen', 'toy', 'car',
    'ball', 'book', 'milk', 'fish', 'star', 'rain', 'cake', 'door', 'tree', 'bird',
    'map', 'card', 'desk', 'coin', 'lamp', 'shoe', 'sock', 'bear', 'lion', 'duck'
  ],
  medium: [
    'puzzle', 'guitar', 'dinner', 'camera', 'planet', 'rocket', 'animal', 'window',
    'basket', 'laptop', 'garden', 'island', 'summer', 'winter', 'forest', 'mountain',
    'journey', 'kitchen', 'comedy', 'rainbow', 'teacher', 'pencil', 'morning', 'dinner',
    'picture', 'memory', 'program', 'system', 'market', 'office'
  ],
  hard: [
    'elephant', 'universe', 'symphony', 'chocolate', 'adventure', 'beautiful', 'challenge',
    'developer', 'education', 'laboratory', 'philosophy', 'delicious', 'technology',
    'incredible', 'mysterious', 'experience', 'knowledge', 'dictionary', 'imagination',
    'environment', 'happiness', 'confidence', 'important', 'community', 'celebrate',
    'discovery', 'appreciate', 'restaurant', 'friendship', 'literature'
  ]
};

function App() {
  // Game state
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showGameOver, setShowGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [wordCount, setWordCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');
  const [usedWords, setUsedWords] = useState({
    easy: [],
    medium: [],
    hard: []
  });
  const [timer, setTimer] = useState(null);

  // Get total word count by difficulty
  const getTotalWordCount = () => {
    return {
      easy: WORD_LISTS.easy.length,
      medium: WORD_LISTS.medium.length,
      hard: WORD_LISTS.hard.length
    };
  };

  // Get a random word based on the difficulty level
  const getRandomWord = (diff) => {
    const wordList = WORD_LISTS[diff];
    const usedWordsList = usedWords[diff];
    
    // Reset used words if all words have been used
    if (usedWordsList.length >= wordList.length) {
      setUsedWords(prev => ({
        ...prev,
        [diff]: []
      }));
      return wordList[Math.floor(Math.random() * wordList.length)];
    }
    
    // Get a random word that hasn't been used yet
    let word;
    do {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      word = wordList[randomIndex];
    } while (usedWordsList.includes(word));
    
    // Add the word to the used words list
    setUsedWords(prev => ({
      ...prev,
      [diff]: [...prev[diff], word]
    }));
    
    return word;
  };

  // Scramble the letters of a word
  const scrambleWord = (word) => {
    const letters = word.split('');
    
    // Fisher-Yates shuffle algorithm
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    
    // Check if the scrambled word is the same as the original
    const scrambled = letters.join('');
    if (scrambled === word && word.length > 1) {
      // If it's the same, try again
      return scrambleWord(word);
    }
    
    return scrambled;
  };

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get time limit based on difficulty
  const getDifficultyTimeLimit = () => {
    return 120; // Same time limit for all difficulties in the original game
  };

  // Calculate points based on word length and difficulty
  const calculatePoints = () => {
    const basePoints = currentWord.length;
    switch (difficulty) {
      case 'easy': return basePoints;
      case 'medium': return basePoints * 2;
      case 'hard': return basePoints * 3;
      default: return basePoints;
    }
  };

  // Get a message based on the score and difficulty
  const getScoreMessage = () => {
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

  // Show feedback message
  const showFeedback = (message, type = 'success') => {
    setFeedback(message);
    setFeedbackType(type);
    
    // Clear feedback after 2 seconds
    setTimeout(() => {
      setFeedback('');
    }, 2000);
  };

  // Start game
  const startGame = () => {
    setScore(0);
    setTimeLeft(getDifficultyTimeLimit());
    setIsPlaying(true);
    setShowGameOver(false);
    setWordCount(0);
    setUsedWords({
      easy: [],
      medium: [],
      hard: []
    });
    
    // Clear any existing timer
    if (timer) {
      clearInterval(timer);
    }
    
    nextWord();
    startTimer();
  };
  
  // Next word
  const nextWord = () => {
    const word = getRandomWord(difficulty);
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserInput('');
    setWordCount(prev => prev + 1);
  };
  
  // Skip word
  const skipWord = () => {
    // Deduct some points for skipping
    const penaltyPoints = Math.min(5, score);
    if (score > 0) {
      setScore(prev => Math.max(0, prev - penaltyPoints));
      showFeedback(`Skipped! -${penaltyPoints} points`, 'error');
    } else {
      showFeedback('Skipped!', 'error');
    }
    
    nextWord();
  };
  
  // Check answer
  const checkAnswer = () => {
    if (!userInput.trim()) {
      showFeedback('Please enter an answer!', 'error');
      return;
    }
    
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      // Correct answer
      const points = calculatePoints();
      setScore(prev => prev + points);
      showFeedback(`Correct! +${points} points`);
      nextWord();
    } else {
      // Wrong answer
      showFeedback('Try again!', 'error');
      setUserInput('');
    }
  };
  
  // Change difficulty
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    if (isPlaying) {
      // Restart game if already playing
      startGame();
    }
  };
  
  // Start timer
  const startTimer = () => {
    // Clear any existing timer
    if (timer) {
      clearInterval(timer);
    }
    
    const newTimer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(newTimer);
          endGame();
          return 0;
        }
      });
    }, 1000);
    
    setTimer(newTimer);
  };
  
  // End game
  const endGame = () => {
    setIsPlaying(false);
    setShowGameOver(true);
    if (timer) {
      clearInterval(timer);
    }
  };

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return (
    <div className="app">
      <GameHeader 
        score={score} 
        timeLeft={timeLeft} 
        formatTime={formatTime} 
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
          wordCount={wordCount}
          totalWords={getTotalWordCount()[difficulty]}
          userInput={userInput}
          setUserInput={setUserInput}
          checkAnswer={checkAnswer}
          skipWord={skipWord}
          feedback={feedback}
          feedbackType={feedbackType}
        />
      )}
      
      {showGameOver && (
        <GameOverModal 
          score={score} 
          getScoreMessage={getScoreMessage} 
          wordCount={wordCount} 
          startGame={startGame} 
        />
      )}
    </div>
  );
}

export default App; 