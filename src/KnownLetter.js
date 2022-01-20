import React from "react";

function KnownLetter(props) {
  const { index, setLetter } = props;

  return (
    <input
      onInput={(e) => setLetter(index, e)}
      type="text"
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      maxLength={1}
      placeholder={index + 1}
    />
  );
}

export default KnownLetter;
