function GameStatus({
  life,
  score,
  comparison,
  gameActive,
  isGameOver,
  isWinner,
}) {
  if (!gameActive || isGameOver || isWinner) return null;

  return (
    <div>
      <p>Score: {score}</p>
      {comparison === "bigger" && <p>The number is bigger than your guess.</p>}
      {comparison === "smaller" && (
        <p>The number is smaller than your guess.</p>
      )}
      <p>You have {life} attempts left.</p>
    </div>
  );
}

export default GameStatus;
