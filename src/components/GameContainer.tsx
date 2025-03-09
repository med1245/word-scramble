import React, { useRef, useEffect } from 'react';
import { GameContainerProps } from '../types';
import './GameContainer.css';

const GameContainer: React.FC<GameContainerProps> = ({
  scrambledWord,
  userInput,
  handleInputChange,
  handleSubmit
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [scrambledWord]);
  
  return (
    <div className="game-container container">
      <div className="word-display">
        {scrambledWord.split('').map((letter, index) => (
          <span key={index} className="letter">{letter}</span>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
          ref={inputRef}
          autoComplete="off"
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GameContainer; 