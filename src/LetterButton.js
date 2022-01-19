import React from "react";

function LetterButton(props) {
  const { letter, active } = props;
  const [isActive, setIsActive] = React.useState(active);

  function setActive() {
    setIsActive(!isActive);
    props.toggleLetter(letter);
  }

  return (
    <span>
      <button
        className={`letter ${isActive ? "active" : ""}`}
        onClick={setActive}
      >
        {letter}
      </button>
    </span>
  );
}

export default LetterButton;
