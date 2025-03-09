import { Difficulty } from '../types';

// Word lists by difficulty
const easyWords = [
  'cat', 'dog', 'sun', 'hat', 'run', 'box', 'cup', 'pen', 'toy', 'car',
  'ball', 'book', 'milk', 'fish', 'star', 'rain', 'cake', 'door', 'tree', 'bird'
];

const mediumWords = [
  'puzzle', 'guitar', 'dinner', 'camera', 'planet', 'rocket', 'animal', 'window',
  'basket', 'laptop', 'garden', 'island', 'summer', 'winter', 'forest', 'mountain',
  'journey', 'kitchen', 'comedy', 'rainbow'
];

const hardWords = [
  'elephant', 'universe', 'symphony', 'chocolate', 'adventure', 'beautiful', 'challenge',
  'developer', 'education', 'laboratory', 'philosophy', 'delicious', 'technology',
  'incredible', 'mysterious', 'experience', 'knowledge', 'dictionary', 'imagination',
  'environment'
];

/**
 * Get a random word based on the difficulty level
 */
export const getRandomWord = (difficulty: Difficulty): string => {
  let wordList: string[];
  
  switch (difficulty) {
    case 'easy':
      wordList = easyWords;
      break;
    case 'medium':
      wordList = mediumWords;
      break;
    case 'hard':
      wordList = hardWords;
      break;
    default:
      wordList = mediumWords;
  }
  
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};

/**
 * Scramble the letters of a word
 */
export const scrambleWord = (word: string): string => {
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