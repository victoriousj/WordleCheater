import React from "react";

import LetterButton from "./LetterButton";
import main from "./helper";

import "./App.css";
import UnknownLetter from "./UnknownLetter";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: ["", "", "", "", ""],
      excludedLetters: [],
      results: [],
      unknownLetters: alphabet
        .split("")
        .reduce((a, b) => ({ ...a, [b]: [] }), {}),
    };
  }

  addGuess = () => {
    var results = main(this.state);
    this.setState({ ...this.state, results });
  };

  keyUp = (event) => {
    if (
      event.key === "Delete" ||
      event.key === "Backspace" ||
      event.key === "ArrowLeft"
    ) {
      if (event.target.previousSibling !== null) {
        event.target.previousSibling.focus();
      }
    } else if (
      event.target.nextSibling !== null &&
      ((event.keyCode >= 65 && event.keyCode <= 90) ||
        event.key === "ArrowRight")
    ) {
      event.target.nextSibling.focus();
    }

    if (event.key === "Enter") {
      this.addGuess();
    }
  };

  keyDown = (index, event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      if (event.target.value) {
        event.target.value = event.nativeEvent.key;
      }

      var letters = this.state.letters;
      letters[index] = event.nativeEvent.key;
      this.setState({ ...this.state, letters });
      console.log(this.state.letters);
    } else if (event.key === "Delete" || event.key === "Backspace") {
      var letters = this.state.letters;
      letters[index] = "";
      this.setState({ ...this.state, letters });
    }
  };

  toggleLetter = (x) => {
    var excludedLetters = this.state.excludedLetters;
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

  showCheatText = (e) => {
    e.target.innerText = "Cheat";
  };

  hideCheatText = (e) => {
    e.target.innerText = "Help!";
  };

  setUnknownLetters = (letter, positions) => {
    let { unknownLetters } = this.state;
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

    return (
      <div style={{ marginBottom: "50px" }}>
        <p className="title">Wordle "Helper"</p>
        <a href="https://github.com/victoriousj/">
          <code>by victor d johnson</code>
        </a>
        <div style={{ marginTop: "20px" }}>
          <button
            className="submit"
            onClick={this.addGuess}
            onMouseOver={this.showCheatText}
            onMouseLeave={this.hideCheatText}
          >
            Help!
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            letters you know their placement
          </div>
          <input
            onKeyUp={this.keyUp}
            onKeyDown={(e) => this.keyDown(0, e)}
            type="text"
            maxLength={1}
            pattern="[A-Za-z]"
          />
          <input
            onKeyUp={this.keyUp}
            onKeyDown={(e) => this.keyDown(1, e)}
            type="text"
            maxLength={1}
          />
          <input
            onKeyUp={this.keyUp}
            onKeyDown={(e) => this.keyDown(2, e)}
            type="text"
            maxLength={1}
          />
          <input
            onKeyUp={this.keyUp}
            onKeyDown={(e) => this.keyDown(3, e)}
            type="text"
            maxLength={1}
          />
          <input
            onKeyUp={this.keyUp}
            onKeyDown={(e) => this.keyDown(4, e)}
            type="text"
            maxLength={1}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            letters that are not included
          </div>

          {letterButtons}
        </div>
        <div style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            letters with unknown positions - check where letters are NOT located
          </div>
          {unknownLetters}
        </div>

        {this.state.results.length > 0 && (
          <div
            style={{
              border: "1px solid white",
              padding: "10px 20px",
              marginTop: "20px",
              borderRadius: "5px",
            }}
          >
            <div style={{ fontSize: "2em" }}>Results</div>
            <div
              style={{ marginTop: "20px" }}
              className={`${
                this.state.results.length === 1 ? "answer" : ""
              } results`}
            >
              {this.state.results.join(", ")}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
