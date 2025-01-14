import React, { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";

const Pokemon = () => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const pokemonName = query.get("name");

    useEffect(() => {
        const fetchPokemon = async () => {
            if (!pokemonName) return;

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                if (!response.ok) throw new Error("Pokémon not found");

                const data = await response.json();
                setPokemon(data);
                setError(null);
            } catch (err) {
                setPokemon(null);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [pokemonName]);

    if (loading) {
        return <p>Loading ..</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const spriteUrl = pokemon.sprites.front_default;
    const isImageAvailable = spriteUrl !== null;

    return (
        <div>
            <div>
                <Link className="back-button" to="/pokedex">&times;</Link>
            </div>
            <h1>{pokemon.name}</h1>
            {isImageAvailable ? <img src={spriteUrl} alt={pokemon.name} /> : <p>No image</p>}
            {pokemon.height && <p>Height: {pokemon.height}</p>}
            {pokemon.weight && <p>Weight: {pokemon.weight}</p>}
            {pokemon.abilities && (
                <p>
                    Abilities:{" "}
                    {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
                </p>
            )}
            {pokemon.types && (
                <p>
                    Types: {pokemon.types.map((type) => type.type.name).join(", ")}
                </p>
            )}
            {pokemon.base_experience && <p>Base Experience: {pokemon.base_experience}</p>}
        </div>
    );
};

export default Pokemon;