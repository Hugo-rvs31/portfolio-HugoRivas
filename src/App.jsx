import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import "./styles/index.scss";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Route path avec l'étoile, toujours en dernier */}
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
