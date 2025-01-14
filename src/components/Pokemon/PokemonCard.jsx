import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
    // eslint-disable-next-line react/prop-types
    const pokeID = pokemon.url.split("/").filter(Boolean).pop();
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;

    const isImageAvailable = spriteUrl !== null;

    return (
        // eslint-disable-next-line react/prop-types
        <Link to={`/pokemon?name=${pokemon.name}`}>
            <div className="pokemon-card">
                {isImageAvailable ? (
                    // eslint-disable-next-line react/prop-types
                    <img src={spriteUrl} alt={pokemon.name} />
                ) : (
                    <span>No image</span>
                )}
                <h2>{pokemon.name}</h2>
            </div>
        </Link>
    );
};

export default PokemonCard;