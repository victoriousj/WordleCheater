import React from "react";

function Result(props) {
  return (
    <div className="result">
      <span className="letter-count">{props.letterCount} Letters:</span>
      <p>{props.results}</p>
    </div>
  );
}

export default Result;
