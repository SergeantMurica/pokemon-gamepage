import React, { useState, useEffect } from "react";

const GuessPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [points, setPoints] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);

  /**
   * Fetches a random Gen 1 Pokémon from the PokeAPI.
   */
  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();

      // If there is no sprite, immediately try another Pokémon
      if (!data.sprites.front_default) {
        fetchRandomPokemon();
        return;
      }

      setPokemon(data);
      setLoading(false);
      setFeedback("");
      setAnswer("");
      setAttempts(0);
      setHintUsed(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setLoading(false);
      setFeedback("Error fetching Pokémon. Please try again.");
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  /**
   * Handles the player's guess.
   */
  const handleGuess = () => {
    if (!pokemon) return;

    setAttempts((prev) => prev + 1);

    if (answer.toLowerCase() === pokemon.name.toLowerCase()) {
      setFeedback(`Correct! It's ${pokemon.name}!`);
      setPoints((prev) => prev + 1);
    } else {
      setFeedback("Nope! Try again or click Hint!");
    }
  };

  /**
   * Reveals one of the Pokémon's types (if not already revealed).
   */
  const handleHint = () => {
    if (!pokemon) return;

    // Only allow a hint if at least one incorrect guess has been made
    if (!hintUsed && attempts > 0) {
      const types = pokemon.types.map((t) => t.type.name).join(", ");
      setFeedback(`Hint: It's ${types} type!`);
      setHintUsed(true);
    } else if (!hintUsed) {
      setFeedback("Make at least one incorrect guess before using a hint!");
    } else {
      setFeedback("You already used your hint for this Pokémon!");
    }
  };

  /**
   * Skips the current Pokémon (no points awarded).
   */
  const handleSkip = () => {
    setFeedback(`Skipped! The Pokémon was ${pokemon.name}.`);
    // Use a short timeout so the user can see the answer, then load new Pokémon
    setTimeout(() => fetchRandomPokemon(), 1500);
  };

  const spriteUrl = pokemon?.sprites?.front_default || "";

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Who's That Pokémon?</h1>
      <p>Points: {points}</p>

      {loading && <p>Loading...</p>}

      {!loading && pokemon && (
        <>
          {/* Dark silhouette by setting brightness to 0 */}
          <img
            src={spriteUrl}
            alt={pokemon.name}
            style={{ filter: "brightness(0)", width: 150, height: 150 }}
          />

          <div className="content-inputs" style={{ marginTop: "1rem" }}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter Pokémon name..."
              style={{ marginRight: "0.5rem" }}
            />
            <button onClick={handleGuess} style={{ marginRight: "0.5rem" }}>
              Guess
            </button>
            <button onClick={handleHint} style={{ marginRight: "0.5rem" }}>
              Hint
            </button>
            <button onClick={handleSkip}>Skip</button>
          </div>

          {feedback && (
            <p style={{ marginTop: "1rem", fontStyle: "italic" }}>{feedback}</p>
          )}

          {/* If correct, show "Next" button */}
          {feedback.startsWith("Correct") && (
            <button onClick={fetchRandomPokemon} style={{ marginTop: "1rem" }}>
              Next
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default GuessPokemon;
