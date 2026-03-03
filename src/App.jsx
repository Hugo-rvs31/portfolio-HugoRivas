import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import HomeMovieSection from "./pages/HomeMovieSection";
import GuessTheMovie from "./pages/GuessTheMovie";
import "./styles/index.scss";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-movie-section" element={<HomeMovieSection />} />
        <Route path="/guess-the-movie" element={<GuessTheMovie />} />

        {/* Route path avec l'étoile, toujours en dernier */}
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
