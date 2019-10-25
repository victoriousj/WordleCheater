import React from "react";
import "./App.css";
const dictionary = require("./dictionary.json");

const dict = dictionary.dictionary;
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function emptyFrequencies() {
  const emptyFrequency = {};

  for (let i = 0; i < alphabet.length; i++) {
    emptyFrequency[alphabet[i]] = 0;
  }

  return emptyFrequency;
}

function frequencies(str) {
  const freqs = emptyFrequencies();

  for (let i = 0; i < str.length; i++) {
    freqs[str[i]] += 1;
  }

  return freqs;
}

function match(word, dictWord) {
  const dictWordFreqencies = frequencies(dictWord);

  for (let i = 0; i < alphabet.length; i++) {
    if (dictWordFreqencies[alphabet[i]] > word[alphabet[i]]) {
      return false;
    }
  }

  return true;
}

function main(params) {
  const obj = {};
  const matches = [];
  const letterFrequencies = frequencies(params);
  const properLengthWords = dict.filter(word => word.length <= params.length);

  for (let i = 0; i < properLengthWords.length; i++) {
    if (match(letterFrequencies, properLengthWords[i])) {
      matches.push(properLengthWords[i]);
    }
  }

  for (let i = 1; i < params.length + 1; i++) {
    obj[`${i}`] = matches.filter(w => w.length === i);
  }

  return obj;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { letters: "", results: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ letters: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      results: main(this.state.letters)
    });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.letters}
              placeholder="Letters"
            />
          </label>
          <input type="submit" value="&#10005;" />
        </form>
        {this.state.results.length > 0 && (
          <div className="results">Results:</div>
        )}
        {Object.keys(this.state.results).map(key => {
          const results = this.state.results[key].join(", ");
          if (this.state.results[key].length !== 0)
            return (
              <p>
                {key}: {results}
              </p>
            );
        })}
      </div>
    );
  }
}

export default App;
