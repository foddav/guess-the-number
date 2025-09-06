import { useState } from "react";

function Input({ onSubmit }) {
  const [guess, setGuess] = useState("");

  const submit = () => {
    if (guess.trim() === "") return;
    const num = Number(guess);
    if (Number.isNaN(num)) return;
    onSubmit(num);
    setGuess("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") submit();
  };

  return (
    <div>
      <label htmlFor="guess-input">What is your guess?</label>
      <br />
      <input
        id="guess-input"
        placeholder="Type your guess..."
        type="number"
        value={guess}
        onChange={(event) => setGuess(event.target.value)}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
      />
      <button id="submitButton" onClick={submit}>
        Submit
      </button>
    </div>
  );
}

export default Input;
