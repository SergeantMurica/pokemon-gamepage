import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  const pokeID = pokemon.url.split("/").filter(Boolean).pop();
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;
  const formattedId = `#${String(pokeID).padStart(3, "0")}`;

  const isImageAvailable = spriteUrl !== null;

  return (
    <Link to={`/pokemon?name=${pokemon.name}`} className="pokemon-link">
      <div className="pokemon-card">
        <div className="pokemon-screen">
          <div className="pokemon-id">{formattedId}</div>
          {isImageAvailable ? (
            <img src={spriteUrl} alt={pokemon.name} />
          ) : (
            <span>No image</span>
          )}
          <h2>{pokemon.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
