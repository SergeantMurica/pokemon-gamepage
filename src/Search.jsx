import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard.jsx";
import "../../pokemon-game-template/Search.css";

const Search = () => {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [input, setInput] = useState("");

    const fetchPokemons = async () => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((response) => response.json())
            .then((data) => setPokemons(data.results));
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    useEffect(() => {
        if (input === "") {
            setFilteredPokemons([]);
        } else {
            if (Array.isArray(pokemons)) {
                const filtered = pokemons.filter((pokemon) =>
                    pokemon.name.toLowerCase().startsWith(input.toLowerCase()),
                );
                setFilteredPokemons(filtered);
            }
        }
    }, [input, pokemons]);

    return (
        <div>
            <h1>Search For A Pokemon</h1>
            <input
                placeholder="Enter Pokémon name..."
                onChange={(inputText) => setInput(inputText.target.value)}
            />
            <div className="pokemon-grid">
                {filteredPokemons.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default Search;