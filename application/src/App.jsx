import { useEffect, useState } from "react";
import { INITIAL_LIFE, INITIAL_SCORE, PENALTY } from "./constants";
import { getRangeHint } from "./utils/range";

import StartScreen from "./components/StartScreen";
import Loader from "./components/Loader";
import Input from "./components/Input";
import GameStatus from "./components/GameStatus";
import HelpList from "./components/HelpList";
import GameOver from "./components/GameOver";

function App() {
  // Phrases
  const [difficultyMax, setDifficultyMax] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [gameActive, setGameActive] = useState(false);

  // Game states
  const [secret, setSecret] = useState(null);
  const [life, setLife] = useState(INITIAL_LIFE);
  const [score, setScore] = useState(INITIAL_SCORE);
  const [comparison, setComparison] = useState(null);
  const [isWinner, setIsWinner] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Help states
  const [hintEvenOdd, setHintEvenOdd] = useState("");
  const [hintDiv3, setHintDiv3] = useState("");
  const [hintRange, setHintRange] = useState("");

  // Choose difficulty
  const handleSelectDifficulty = (maxRange) => {
    setDifficultyMax(maxRange);
    const nextSecret = Math.floor(Math.random() * (maxRange + 1));
    setSecret(nextSecret);

    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setGameActive(true);
    }, 8500);
  };

  // Guessing
  const handleGuess = (num) => {
    if (!gameActive || isGameOver || isWinner) return;

    const willExhaustLife = life <= 1;
    const nextScore = score - PENALTY.ATTEMPT;

    setLife((prev) => prev - 1);
    setScore(nextScore);

    if (num === secret) {
      setIsWinner(true);
      setIsGameOver(true);
      setComparison(null);
      return;
    }

    setComparison(num < secret ? "bigger" : "smaller");

    if (willExhaustLife || nextScore <= 0) {
      setIsGameOver(true);
    }
  };

  // Help functions
  const revealEvenOdd = () => {
    if (hintEvenOdd || isGameOver || isWinner) return;
    setScore((prev) => prev - PENALTY.HELP_EVEN_ODD);
    setHintEvenOdd(secret % 2 === 0 ? "Even" : "Odd");
  };

  const revealDivBy3 = () => {
    if (hintDiv3 || isGameOver || isWinner) return;
    setScore((prev) => prev - PENALTY.HELP_DIV_3);
    setHintDiv3(secret % 3 === 0 ? "Yes" : "No");
  };

  const revealRange = () => {
    if (hintRange || isGameOver || isWinner) return;
    setScore((prev) => prev - PENALTY.HELP_RANGE);
    setHintRange(getRangeHint(secret, difficultyMax ?? 200));
  };

  // Game over: zero points
  useEffect(() => {
    if (gameActive && !isWinner && score <= 0) setIsGameOver(true);
  }, [score, gameActive, isWinner]);

  // Reset helper
  const resetGame = () => {
    setDifficultyMax(null);
    setShowLoader(false);
    setGameActive(false);

    setSecret(null);
    setLife(INITIAL_LIFE);
    setScore(INITIAL_SCORE);
    setComparison(null);
    setIsWinner(false);
    setIsGameOver(false);

    setHintEvenOdd("");
    setHintDiv3("");
    setHintRange("");
  };

  const handleRestart = () => resetGame();

  return (
    <>
      {!difficultyMax && (
        <StartScreen onSelectDifficulty={handleSelectDifficulty} />
      )}

      {showLoader && <Loader maxRange={difficultyMax} />}

      {gameActive && !isGameOver && !isWinner && (
        <>
          <Input onSubmit={handleGuess} />

          <HelpList
            hintEvenOdd={hintEvenOdd}
            hintDiv3={hintDiv3}
            hintRange={hintRange}
            revealEvenOdd={revealEvenOdd}
            revealDivBy3={revealDivBy3}
            revealRange={revealRange}
          />

          <GameStatus
            life={life}
            score={score}
            comparison={comparison}
            gameActive={gameActive}
            isGameOver={isGameOver}
            isWinner={isWinner}
          />
        </>
      )}

      <GameOver
        isWinner={isWinner}
        isGameOver={isGameOver}
        secret={secret}
        score={score}
        onRestart={handleRestart}
      />
    </>
  );
}

export default App;
