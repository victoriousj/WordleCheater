import React from "react";

function UnknownLetter(props) {
  const { letter } = props;
  const [activePositions, setActivePositions] = React.useState([]);

  function setActive(index) {
    var positions = activePositions;
    if (positions.indexOf(index) >= 0) {
      positions = positions.filter((x) => x !== index);
    } else {
      positions = [...positions, index];
    }
    setActivePositions(positions);
    props.setUnknownLetters(letter, positions);
  }

  return (
    <div style={{ marginBottom: "1px", marginLeft: "-30px" }}>
      <span
        style={{
          marginRight: "10px",
          textTransform: "uppercase",
          width: "30px",
          display: "inline-block",
        }}
      >
        {letter}
      </span>
      <button
        className={`unkown-letter letter ${
          activePositions.indexOf(0) >= 0 ? "active" : ""
        }`}
        onClick={() => setActive(0)}
      >
        {1}
      </button>
      <button
        className={`unkown-letter letter ${
          activePositions.indexOf(1) >= 0 ? "active" : ""
        }`}
        onClick={() => setActive(1)}
      >
        {2}
      </button>
      <button
        className={`unkown-letter letter ${
          activePositions.indexOf(2) >= 0 ? "active" : ""
        }`}
        onClick={() => setActive(2)}
      >
        {3}
      </button>
      <button
        className={`unkown-letter letter ${
          activePositions.indexOf(3) >= 0 ? "active" : ""
        }`}
        onClick={() => setActive(3)}
      >
        {4}
      </button>
      <button
        className={`unkown-letter letter ${
          activePositions.indexOf(4) >= 0 ? "active" : ""
        }`}
        onClick={() => setActive(4)}
      >
        {5}
      </button>
    </div>
  );
}

export default UnknownLetter;
