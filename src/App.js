import React from "react";

import LetterButton from "./LetterButton";
import UnknownLetter from "./UnknownLetter";
import KnownLetter from "./KnownLetter";

import findResults from "./helper";
import external from "./external.png";
import "./App.css";

const answers = require("./answers.json");

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
      todaysAnswer: "",
      answerText: "Todays's Answer",
    };
  }

  componentDidMount() {
    const releaseDate = new Date(2021, 5, 19).valueOf();
    const today = new Date().valueOf();

    let numberOfDays = (today - releaseDate) / 1000 / 86400;
    numberOfDays = Math.round(numberOfDays - 0.5);
    const todaysAnswer = answers[numberOfDays];

    this.setState({ ...this.state, todaysAnswer });
  }

  addGuess = () => {
    const results = findResults(this.state);
    this.setState({ ...this.state, results });
  };

  setLetter = (index, event) => {
    const { nextSibling, previousSibling } = event.target;
    let key = event.key.toLowerCase();

    if (key === "unidentified") {
      key = document.querySelectorAll("input[type=text]")[index].value;
    }

    if (
      (key === "backspace" || key === "arrowleft" || key === "") &&
      previousSibling
    ) {
      previousSibling.focus();
      key = "";
    } else if (key && nextSibling) {
      nextSibling.focus();
    }

    const letters = this.state.letters;
    letters[index] = key.toLowerCase();
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

  showAnswer = () => {
    this.setState({ ...this.state, answerText: this.state.todaysAnswer });

    setTimeout(() => {
      this.setState({ ...this.state, answerText: "Today's Answer" });
    }, 2000);
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
      <KnownLetter index={index} setLetter={this.setLetter} key={`${index}`} />
    ));

    return (
      <div className="container">
        <div className="banner-container">
          <div className="banner" onClick={this.showAnswer}>
            {this.state.answerText}
          </div>
        </div>

        <p className="title">Wordle Helper</p>
        <a
          href="https://github.com/victoriousj/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <code className="link">
            by victor d johnson <img src={external} alt="Github Link"></img>
          </code>
        </a>
        {this.state.results !== "" && (
          <div className="results">
            <div style={{ fontSize: "1.25em", padding: "10px" }}>RESULTS:</div>
            <div
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
