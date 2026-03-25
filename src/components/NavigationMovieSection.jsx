import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const NavigationMovieSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="navigation-movie-section">
      <div id="menu-button2" onClick={toggleMenu}>
        {isOpen ? "Fermer" : "Menu"}
      </div>

      {isOpen && (
        <nav className="navigation-inner-movie-section">
          <ul>
            <NavLink to="/guess-the-movie" onClick={closeMenu}>
              Guess the movie
            </NavLink>

            <NavLink to="/movies-library" onClick={closeMenu}>
              Movies Library
            </NavLink>

            <NavLink to="/#" onClick={closeMenu}>
              Home
            </NavLink>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavigationMovieSection;
