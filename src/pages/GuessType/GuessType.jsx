import React, { useState, useEffect } from "react";

const GuessType = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [points, setPoints] = useState(0);
  const [error, setError] = useState("");

  const fetchRandomPokemon = async () => {
    setLoading(true);
    setError("");

    try {
      let pokemonData = null;

      for (let attempt = 0; attempt < 6; attempt++) {
        const randomId = Math.floor(Math.random() * 151) + 1;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`,
        );

        if (!response.ok) {
          continue;
        }

        const data = await response.json();

        if (data?.sprites?.front_default) {
          pokemonData = data;
          break;
        }
      }

      if (!pokemonData) {
        throw new Error("Unable to load a Pokémon right now.");
      }

      setPokemon(pokemonData);
      setFeedback("");
      setAnswer("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const handleGuess = () => {
    if (!pokemon) {
      return;
    }

    const normalizedAnswer = answer.trim().toLowerCase();

    if (!normalizedAnswer) {
      setFeedback("Type a Pokémon type first!");
      return;
    }

    if (
      pokemon.types.some(
        (type) => type.type.name.toLowerCase() === normalizedAnswer,
      )
    ) {
      setFeedback(
        `Correct! ${pokemon.name}'s type includes ${normalizedAnswer}!`,
      );
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setFeedback("Nope! Try again!");
    }
  };

  return (
    <div className="game-shell">
      <h1>Guess The Pokémon's Type!</h1>
      <p className="game-score">Points: {points}</p>
      {loading && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      {!loading && !error && pokemon && (
        <>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="game-image"
          />
          <div className="content-inputs">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleGuess();
                }
              }}
              placeholder="Enter Pokémon type..."
            />
            <div className="buttons-container">
              <button onClick={handleGuess}>Guess</button>
              {feedback.startsWith("Correct") && (
                <button onClick={fetchRandomPokemon}>Next</button>
              )}
            </div>
          </div>
          {feedback && <p>{feedback}</p>}
        </>
      )}
    </div>
  );
};

export default GuessType;
