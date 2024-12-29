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

    const fetchRandomPokemon = async () => {
        const randomId = Math.floor(Math.random() * 151) + 1;
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
            return null;
        }
    };

    const fetchNewPokemon = async (current) => {
        let newPokemon;
        do {
            newPokemon = await fetchRandomPokemon();
        } while (newPokemon && newPokemon.name === current.name);
        return newPokemon;
    };

    useEffect(() => {
        const initializeGame = async () => {
            const firstPokemon = await fetchRandomPokemon();
            const secondPokemon = await fetchNewPokemon(firstPokemon);
            setPreviousPokemon(firstPokemon);
            setCurrentPokemon(secondPokemon);
            const thirdPokemon = await fetchNewPokemon(secondPokemon);
            setNextPokemon(thirdPokemon);
            setLoading(false);
            setGameOver(false);
            setFeedback("");
            setPoints(0);
        };

        initializeGame();
    }, []);

    const handleRestart = async () => {
        setLoading(true);
        setGameOver(false);
        const firstPokemon = await fetchRandomPokemon();
        const secondPokemon = await fetchNewPokemon(firstPokemon);
        setPreviousPokemon(firstPokemon);
        setCurrentPokemon(secondPokemon);
        const thirdPokemon = await fetchNewPokemon(secondPokemon);
        setNextPokemon(thirdPokemon);
        setLoading(false);
        setFeedback("");
        setPoints(0);
    };

    const handleGuess = async (type) => {
        if (currentPokemon && previousPokemon) {
            const isCorrect =
                (type === "higher" &&
                    currentPokemon[attribute] > previousPokemon[attribute]) ||
                (type === "lower" &&
                    currentPokemon[attribute] < previousPokemon[attribute]);

            if (isCorrect) {
                setFeedback("Correct!");
                setPoints(points + 1);
                setLoading(true);
                setTimeout(async () => {
                    setPreviousPokemon(currentPokemon);
                    setCurrentPokemon(nextPokemon);
                    const newPokemon = await fetchNewPokemon(nextPokemon);
                    setNextPokemon(newPokemon);
                    setLoading(false);
                }, 500);
            } else {
                setFeedback("Wrong! Game Over.");
                setGameOver(true);
            }
        }
    };

    const previousSpriteUrl = previousPokemon ? previousPokemon.sprites.front_default : "";
    const currentSpriteUrl = currentPokemon ? currentPokemon.sprites.front_default : "";

    const isImageAvailable = currentSpriteUrl !== null;

    if (isImageAvailable === false){
        fetchNewPokemon();
    };


    return (
        <div>
            <div className="content-inputs">
                <h1>Higher or Lower Game</h1>
                <p>Points: {points}</p>
                <label>Select Attribute: </label>
                <select
                    onChange={(e) => setAttribute(e.target.value)}
                    value={attribute}>
                    <option value="base_experience">Experience</option>
                    <option value="height">Height</option>
                    <option value="weight">Weight</option>
                </select>
            </div>
            {loading && <p>Loading...</p>}
            {!loading && previousPokemon && currentPokemon && !gameOver && (
                <div className="game-container">
                    <div className="content-game">
                        <h2>Previous Pokémon: {previousPokemon.name}</h2>
                        <p>
                            {attribute.charAt(0).toUpperCase() + attribute.slice(1)}:{" "}
                            {previousPokemon[attribute]}
                        </p>
                        <img src={previousSpriteUrl} alt={previousPokemon.name} />
                    </div>
                    <div className="vs-container">
                        <h2>VS</h2>
                    </div>
                    <div className="content-game">
                        <h2>Current Pokémon: {currentPokemon.name}</h2>
                        <img src={currentSpriteUrl} alt={currentPokemon.name} />
                    </div>
                    <div className="content-inputs buttons-container">
                        <button onClick={() => handleGuess("higher")}>Higher</button>
                        <button onClick={() => handleGuess("lower")}>Lower</button>
                    </div>
                    <p>{feedback}</p>
                </div>
            )}
            {gameOver && (
                <div>
                    <h2>Game Over!</h2>
                    <p>{feedback}</p>
                    <button onClick={handleRestart}>Restart Game</button>
                </div>
            )}
        </div>
    );
};

export default HigherOrLower;