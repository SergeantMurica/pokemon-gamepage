import { Link } from "react-router-dom";
import websiteData from "../../utils/websiteData.jsx";
import "./Home.css";

const homeCards = [
  {
    key: "pokedex",
    description: "Browse Pokémon cards and open detailed stats for each entry.",
  },
  {
    key: "search",
    description: "Find Pokémon quickly by name with instant filtering.",
  },
  {
    key: "guesspokemon",
    description: "Test your memory by guessing each silhouetted Pokémon.",
  },
  {
    key: "guesstype",
    description: "Name the right type and build your streak.",
  },
  {
    key: "higherorlower",
    description: "Pick higher or lower based on key Pokémon stats.",
  },
];

const Home = () => {
  return (
    <section className="home">
      <div className="pokedex-shell">
        <div className="pokedex-top">
          <div className="status-lights">
            <span className="light light-blue" />
            <span className="light light-yellow" />
            <span className="light light-green" />
          </div>
        </div>

        <div className="pokedex-screen-wrap">
          <div className="pokedex-screen">
            <div className="screen-header">Pokédex</div>
            <div className="screen-badge">Gen 1</div>
            <h1>Welcome to the Pokédex</h1>
            <p>
              Explore the original 151, sharpen your memory, and challenge your
              Pokémon instincts across every mode.
            </p>
            <div className="home-actions">
              <Link to="/pokedex" className="home-action-link">
                Open Pokédex
              </Link>
              <Link to="/guess-pokemon" className="home-action-link">
                Play A Game
              </Link>
            </div>
          </div>
        </div>

        <div className="pokedex-controls">
          <div className="device-indicator">READY</div>
          <div className="device-indicator small">GEN I</div>
        </div>
      </div>

      <div className="home-section">
        <h2>Choose Your Mode</h2>
        <div className="home-grid">
          {homeCards.map((card) => {
            const page = websiteData.pages[card.key];

            return (
              <Link key={card.key} to={page.path} className="home-card">
                <h3>{page.name}</h3>
                <p>{card.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="home-section">
        <h2>Quick Tips</h2>
        <ul className="home-tips">
          <li>Use Search when you already know the Pokémon name.</li>
          <li>Guess games award points for each correct answer.</li>
          <li>
            Higher or Lower lets you swap between experience, height, and
            weight.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
