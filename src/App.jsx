import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import HomeMovieSection from "./pages/HomeMovieSection";
import GuessTheMovie from "./pages/GuessTheMovie";
import MoviesLibrary from "./pages/MoviesLibrary";
import ClothingStore from "./pages/ClothingStore";
import "./styles/index.scss";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-movie-section" element={<HomeMovieSection />} />
        <Route path="/guess-the-movie" element={<GuessTheMovie />} />
        <Route path="/movies-library" element={<MoviesLibrary />} />
        <Route path="/clothing-store" element={<ClothingStore />} />

        {/* Route path avec l'étoile, toujours en dernier */}
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
