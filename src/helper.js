const dictionary = require("./dictionary.json");
const dict = dictionary.dictionary;

function main(state) {
  const { letters, excludedLetters, unknownLetters } = state;

  let results = dict;

  if (excludedLetters.length) {
    results = results.filter((word) => {
      var wordArr = word.split("");
      for (let i = 0; i < excludedLetters.length; i++) {
        if (wordArr.includes(excludedLetters[i])) {
          return false;
        }
      }
      return true;
    });
  }

  if (letters.some((x) => x !== "")) {
    results = results.filter((word) => {
      for (let i = 0; i <= 4; i++) {
        if (letters[i] !== "") {
          if (letters[i] !== word[i]) {
            return false;
          }
        }
      }
      return true;
    });
  }

  for (const [key, value] of Object.entries(unknownLetters)) {
    if (value.length > 0) {
      results = results.filter((word) => {
        if (!word.split("").includes(key)) {
          return false;
        }
        for (let i = 0; i <= value.length; i++) {
          if (word[value[i]] === key) {
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

export default main;
