import React, { useState, useEffect } from "react";

const GuessType = () => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [points, setPoints] = useState(0);

    const fetchRandomPokemon = async () => {
        const randomId = Math.floor(Math.random() * 151) + 1;
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${randomId}`,
            );
            const data = await response.json();
            setPokemon(data);
            setLoading(false);
            setFeedback("");
            setAnswer("");
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    const handleGuess = () => {
        if (pokemon.types.some(
            (type) => type.type.name.toLowerCase() === answer.toLowerCase(),
        )) {
            setFeedback(`Correct! ${pokemon.name}'s type includes ${answer}!`);
            setPoints(points + 1);
        } else {
            setFeedback("Nope! Try again!");
        }
    };

    const spriteUrl = pokemon ? pokemon.sprites.front_default : "";
    const isImageAvailable = spriteUrl !== null;

    if (isImageAvailable === false){
        fetchRandomPokemon();
    };

    return (
        <div>
            <h1>Guess The Pokémon's Type!</h1>
            <p>Points: {points}</p>
            {loading && <p>Loading...</p>}
            {!loading && pokemon && (
                <>
                    <img src={spriteUrl} alt={pokemon.name} />
                    <div className="content-inputs">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter Pokémon type..."
                        />
                        <button onClick={handleGuess}>Guess</button>
                    </div>
                    {feedback && <p>{feedback}</p>}
                    {feedback.startsWith("Correct") && (
                        <button onClick={fetchRandomPokemon}>Next</button>
                    )}
                </>
            )}
        </div>
    );
};

export default GuessType;