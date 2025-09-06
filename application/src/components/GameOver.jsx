function GameOver({ isWinner, isGameOver, secret, score, onRestart }) {
  if (!isGameOver && !isWinner) return null;

  return (
    <div>
      {isWinner && <p>You guessed the number! You win!</p>}
      {isGameOver && !isWinner && (
        <>
          <p>You lost!</p>
          <p>The number was: {secret}</p>
        </>
      )}
      <p>Your score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}

export default GameOver;
