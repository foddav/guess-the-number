import { useState, useEffect } from "react";

function Loader({ maxRange }) {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecond(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader">
      <p>I am thinking of a number...</p>
      {showSecond && <p>Got it! You have to guess between 0 and {maxRange}!</p>}
    </div>
  );
}

export default Loader;
