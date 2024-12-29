import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Pokedex from "./Pokedex.jsx";
import Home from "./Home.jsx";
import Search from "./Search.jsx";
import Pokemon from "./Pokemon.jsx";
import GuessPokemon from "./GuessPokemon.jsx";
import GuessType from "./GuessType.jsx";
import HigherOrLower from "./HigherOrLower.jsx";
import "./App.css";

const NavigationBar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/pokedex">Pokédex</Link>
            <Link to="/search">Search</Link>
            <Link to="/guess-pokemon">Who's That Pokémon?</Link>
            <Link to="/guess-type">Guess The Pokémon's Type</Link>
            <Link to="/higher-or-lower">Higher or Lower</Link>
        </nav>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <NavigationBar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokedex" element={<Pokedex />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/pokemon" element={<Pokemon />} />
                    <Route path="/guess-pokemon" element={<GuessPokemon />} />
                    <Route path="/guess-type" element={<GuessType />} />
                    <Route path="/higher-or-lower" element={<HigherOrLower />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
