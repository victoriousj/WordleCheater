import React from "react";
import Results from "./Results";
import main from "./helper";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: "",
      results: {}
    };
  }

  handleChange = event =>
    this.setState({
      letters: event.target.value,
      results: main(event.target.value)
    });

  render() {
    const results = this.state.results;

    return (
      <div>
        <p className="title">Words With Javascript</p>
        <code>by victor d johnson</code>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              maxLength={11}
              autoComplete={"off"}
              value={this.state.letters}
              onChange={this.handleChange}
              placeholder="enter up to 11 letters"
            />
          </label>
        </form>
        {Object.keys(results).map(key => (
          <Results
            key={`${key}a`}
            letterCount={key}
            results={results[key].join(", ")}
          />
        ))}
      </div>
    );
  }
}

export default App;
