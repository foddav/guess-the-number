import Button from "./Button";

function StartScreen({ onSelectDifficulty }) {
  return (
    <div>
      <h1>Guess the Number</h1>
      <div id="difficultyDiv">
        <Button
          content="Easy (0–100)"
          onClick={() => onSelectDifficulty(100)}
        />
        <Button
          content="Medium (0–300)"
          onClick={() => onSelectDifficulty(300)}
        />
        <Button
          content="Hard (0–500)"
          onClick={() => onSelectDifficulty(500)}
        />
      </div>
    </div>
  );
}

export default StartScreen;
