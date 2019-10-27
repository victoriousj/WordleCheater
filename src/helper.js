const dictionary = require("./dictionary.json");
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const dict = dictionary.dictionary;

// Create an object that has a property
// for each letter, with a value of 0.
function emptyFrequencies() {
  const emptyFrequency = {};

  [...alphabet].forEach(c => (emptyFrequency[c] = 0));

  return emptyFrequency;
}

// Iterate through a word and increment
// a value for each encounter of a letter.
function frequencies(str) {
  const freqs = emptyFrequencies();

  [...str].forEach(c => (freqs[c] += 1));

  return freqs;
}

// Determine if a given word has letters outside
// the ones entered in the search params
function match(params, dictWord) {
  const dictWordFreqencies = frequencies(dictWord);

  return [...alphabet].every(i => params[i] >= dictWordFreqencies[i]);
}

function main(params) {
  const results = {};
  const matches = [];
  const letterFrequencies = frequencies(params);
  const properLengthWords = dict.filter(word => word.length <= params.length);

  for (let i = 0; i < properLengthWords.length; i++) {
    if (match(letterFrequencies, properLengthWords[i])) {
      matches.push(properLengthWords[i]);
    }
  }

  for (let i = 1; i < params.length + 1; i++) {
    results[i] = matches.filter(w => w.length === i);
  }

  Object.keys(results).forEach(
    key => results[key].length === 0 && delete results[key]
  );

  return results;
}

export default main;
