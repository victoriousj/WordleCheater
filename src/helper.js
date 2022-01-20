const dict = require("./dictionary.json");

export default function findResults(state) {
  const { letters, excludedLetters, unknownLetters } = state;
  let results = [...dict];

  // Match by letters, exact position (doesn't work on mobile for some reason...)
  if (letters.some((x) => x !== "")) {
    results = results.filter((word) => {
      for (let i = 0; i <= 4; i++) {
        if (letters[i] && letters[i] !== word[i]) {
          return false;
        }
      }
      return true;
    });
  }

  // Words must not contain any of these letters
  if (excludedLetters.length) {
    results = results.filter((word) => {
      for (let i = 0; i < excludedLetters.length; i++) {
        if (word.includes(excludedLetters[i])) {
          return false;
        }
      }
      return true;
    });
  }

  // Make sure words contain these letters but not at the specified locations
  for (const [letter, positions] of Object.entries(unknownLetters)) {
    if (positions.length > 0) {
      results = results.filter((word) => {
        if (!word.includes(letter)) {
          return false;
        }
        for (let i = 0; i <= positions.length; i++) {
          if (word[positions[i]] === letter) {
            return false;
          }
        }
        return true;
      });
    }
  }

  if (results.length === dict.length) {
    return [];
  }

  return results;
}
