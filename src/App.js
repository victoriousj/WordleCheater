import React from "react";

import LetterButton from "./LetterButton";
import UnknownLetter from "./UnknownLetter";
import KnownLetter from "./KnownLetter";

import findResults from "./helper";
import external from "./external.png";
import "./App.css";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      excludedLetters: [],
      letters: ["", "", "", "", ""],
      results: "",
      unknownLetters: alphabet
        .split("")
        .reduce((a, b) => ({ ...a, [b]: [] }), {}),
    };
  }

  addGuess = () => {
    const results = findResults(this.state);
    this.setState({ ...this.state, results });
  };

  setLetter = (index, event) => {
    const { value, nextSibling, previousSibling } = event.target;

    if (value && nextSibling) {
      nextSibling.focus();
    } else if (!value && previousSibling) {
      previousSibling.focus();
    }

    const letters = this.state.letters;
    letters[index] = value.toLowerCase();
    this.setState({ ...this.state, letters });
  };

  toggleLetter = (x) => {
    const excludedLetters = this.state.excludedLetters;

    if (excludedLetters.includes(x)) {
      excludedLetters.splice(excludedLetters.indexOf(x), 1);
    } else {
      excludedLetters.push(x);
    }

    this.setState({
      ...this.state,
      excludedLetters,
    });
  };

  setUnknownLetters = (letter, positions) => {
    const { unknownLetters } = this.state;
    unknownLetters[letter] = positions;

    this.setState({
      ...this.state,
      unknownLetters,
    });
  };

  render() {
    const letterButtons = alphabet
      .split("")
      .map((x) => (
        <LetterButton
          letter={x}
          active={false}
          toggleLetter={this.toggleLetter}
          key={`LetterButton-${x}`}
        ></LetterButton>
      ));

    const unknownLetters = alphabet
      .split("")
      .map((x) => (
        <UnknownLetter
          letter={x}
          active={false}
          toggleLetter={this.toggleLetter}
          key={`LetterButton-${x}`}
          setUnknownLetters={this.setUnknownLetters}
        ></UnknownLetter>
      ));

    const knownLetters = [0, 1, 2, 3, 4].map((index) => (
      <KnownLetter index={index} setLetter={this.setLetter} />
    ));

    return (
      <div className="container">
        <p className="title">Wordle Helper</p>
        <a href="https://github.com/victoriousj/" target="_blank">
          <code className="link">
            by victor d johnson <img src={external} alt="Github Link"></img>
          </code>
        </a>
        {this.state.results !== "" && (
          <div className="results">
            <div style={{ fontSize: "2em" }}>RESULTS</div>
            <div
              style={{ margin: "20px" }}
              className={`${this.state.results.length === 1 ? "answer" : ""}`}
            >
              {this.state.results.length > 0
                ? this.state.results.join(", ")
                : "NO RESULTS"}
            </div>
          </div>
        )}
        <div style={{ margin: "20px" }}>
          <button className="submit" onClick={this.addGuess}>
            SUBMIT
          </button>
        </div>
        <div style={{ margin: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            letters you know their placement
          </div>
          {knownLetters}
        </div>
        <div style={{ margin: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            letters that are not included
          </div>

          {letterButtons}
        </div>
        <div style={{ margin: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            letters with unknown positions - check where letters are NOT located
          </div>
          {unknownLetters}
        </div>
      </div>
    );
  }
}

export default App;
