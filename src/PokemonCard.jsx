import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
    const pokeID = pokemon.url.split("/").filter(Boolean).pop();
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;

    const isImageAvailable = spriteUrl !== null;

    return (
        <Link to={`/pokemon?name=${pokemon.name}`}>
            <div className="pokemon-card">
                {isImageAvailable ? (
                    <img src={spriteUrl} alt={pokemon.name} />
                ) : (
                    <p>No image</p>
                )}
                <h2>{pokemon.name}</h2>
            </div>
        </Link>
    );
};

export default PokemonCard;