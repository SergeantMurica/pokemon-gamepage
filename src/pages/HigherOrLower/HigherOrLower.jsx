import React, { useState, useEffect } from "react";

const HigherOrLower = () => {
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [attribute, setAttribute] = useState("base_experience");
  const [points, setPoints] = useState(0);
  const [error, setError] = useState("");

  const fetchRandomPokemon = async () => {
    for (let attempt = 0; attempt < 8; attempt++) {
      const randomId = Math.floor(Math.random() * 151) + 1;

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`,
        );

        if (!response.ok) {
          continue;
        }

        const data = await response.json();

        if (data?.sprites?.front_default) {
          return data;
        }
      } catch (fetchError) {
        console.error("Error fetching Pokémon:", fetchError);
      }
    }

    return null;
  };

  const fetchNewPokemon = async (excludedName) => {
    let newPokemon;
    let attempts = 0;

    do {
      newPokemon = await fetchRandomPokemon();
      attempts += 1;
    } while (newPokemon && newPokemon.name === excludedName && attempts < 10);

    return newPokemon;
  };

  const initializeGame = async () => {
    setLoading(true);
    setError("");
    setGameOver(false);
    setFeedback("");
    setPoints(0);

    const firstPokemon = await fetchRandomPokemon();

    if (!firstPokemon) {
      setError("Unable to start the game right now. Please try again.");
      setLoading(false);
      return;
    }

    const secondPokemon = await fetchNewPokemon(firstPokemon.name);

    if (!secondPokemon) {
      setError("Unable to load enough Pokémon to continue.");
      setLoading(false);
      return;
    }

    const thirdPokemon = await fetchNewPokemon(secondPokemon.name);

    if (!thirdPokemon) {
      setError("Unable to load enough Pokémon to continue.");
      setLoading(false);
      return;
    }

    setPreviousPokemon(firstPokemon);
    setCurrentPokemon(secondPokemon);
    setNextPokemon(thirdPokemon);
    setLoading(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleRestart = async () => {
    await initializeGame();
  };

  const handleGuess = async (type) => {
    if (!currentPokemon || !previousPokemon || !nextPokemon || loading) {
      return;
    }

    const isCorrect =
      (type === "higher" &&
        currentPokemon[attribute] > previousPokemon[attribute]) ||
      (type === "lower" &&
        currentPokemon[attribute] < previousPokemon[attribute]);

    if (isCorrect) {
      setFeedback("Correct!");
      setPoints((prevPoints) => prevPoints + 1);
      setLoading(true);

      setPreviousPokemon(currentPokemon);
      setCurrentPokemon(nextPokemon);

      const newPokemon = await fetchNewPokemon(nextPokemon.name);

      if (!newPokemon) {
        setError("Could not load the next Pokémon. Restart to continue.");
        setGameOver(true);
        setLoading(false);
        return;
      }

      setNextPokemon(newPokemon);
      setLoading(false);
    } else {
      setFeedback("Wrong! Game Over.");
      setGameOver(true);
    }
  };

  const getAttributeLabel = (value) => {
    if (value === "base_experience") {
      return "Experience";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="game-shell">
      <div className="content-inputs">
        <h1>Higher or Lower Game</h1>
        <p className="game-score">Points: {points}</p>
        <label>Select Attribute: </label>
        <select
          onChange={(e) => setAttribute(e.target.value)}
          value={attribute}
        >
          <option value="base_experience">Experience</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
        </select>
      </div>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && previousPokemon && currentPokemon && !gameOver && !error && (
        <>
          <div className="game-container">
            <div className="content-game">
              <h2>Previous Pokémon: {previousPokemon.name}</h2>
              <p>
                {getAttributeLabel(attribute)}: {previousPokemon[attribute]}
              </p>
              <img
                src={previousPokemon.sprites.front_default}
                alt={previousPokemon.name}
              />
            </div>
            <div className="vs-container">
              <h2>VS</h2>
            </div>
            <div className="content-game">
              <h2>Current Pokémon: {currentPokemon.name}</h2>
              <img
                src={currentPokemon.sprites.front_default}
                alt={currentPokemon.name}
              />
            </div>
          </div>
          <div className="content-inputs buttons-container">
            <button disabled={loading} onClick={() => handleGuess("higher")}>
              Higher
            </button>
            <button disabled={loading} onClick={() => handleGuess("lower")}>
              Lower
            </button>
          </div>
          {feedback && <p>{feedback}</p>}
        </>
      )}
      {gameOver && (
        <div className="content-game">
          <h2>Game Over!</h2>
          <p>{feedback}</p>
          <button onClick={handleRestart}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default HigherOrLower;
