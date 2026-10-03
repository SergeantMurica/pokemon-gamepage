import { useState, useEffect } from "react";
import PokemonCard from "../../components/Pokemon/PokemonCard.jsx";
import "./Search.css";

const Search = () => {
  const [pokemons, setPokemons] = useState([]);
  const [input, setInput] = useState("");

  const fetchPokemons = async () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemons =
    input === ""
      ? []
      : pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(input.toLowerCase()),
        );

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
