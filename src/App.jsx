import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pokedex from "./pages/Pokedex/Pokedex.jsx";
import Home from "./pages/Home/Home.jsx";
import Search from "./pages/Search/Search.jsx";
import Pokemon from "./components/Pokemon/Pokemon.jsx";
import GuessPokemon from "./pages/GuessPokemon/GuessPokemon.jsx";
import GuessType from "./pages/GuessType/GuessType.jsx";
import HigherOrLower from "./pages/HigherOrLower/HigherOrLower.jsx";
import NavigationDrop from "./components/Header/NavigationDrop.jsx";
import NavigationBar from "./components/Header/NavigationBar.jsx";
import "./App.css";


const App = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <BrowserRouter>
            <div>
                {isMobile ? <NavigationDrop/> : <NavigationBar/>}
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/pokedex" element={<Pokedex/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/pokemon" element={<Pokemon/>}/>
                    <Route path="/guess-pokemon" element={<GuessPokemon/>}/>
                    <Route path="/guess-type" element={<GuessType/>}/>
                    <Route path="/higher-or-lower" element={<HigherOrLower/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
