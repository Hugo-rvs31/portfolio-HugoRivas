import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const NavigationMovieSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const isHome = currentPath === "/";
  const isShop = currentPath === "/shop";
  const isCarouselFilm = currentPath === "/carousel-film";

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  if (!isHome) {
    return (
      <div
        className={`navigation navigation-simple 
        ${isShop ? "navigation-shopp" : ""} 
        ${isCarouselFilm ? "navigation-carousel-film" : ""}
      `}
      >
        <button className="menu-button" onClick={() => navigate("/")}>
          Accueil
        </button>
      </div>
    );
  }

  return (
    <div className="navigation-movie-section">
      <div className="menu-button" onClick={toggleMenu}>
        {isOpen ? "Fermer" : "Menu"}
      </div>

      {isOpen && (
        <nav className="navigation-inner">
          <ul>
            <li>
              <NavLink to="/shop" onClick={closeMenu}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/home-movie-section" onClick={closeMenu}>
                Guess the movie
              </NavLink>
            </li>
            <li>
              <NavLink to="/carousel-film" onClick={closeMenu}>
                Carousel-Film
              </NavLink>
            </li>
            <li>
              <NavLink to="/form" onClick={closeMenu}>
                Formulaire
              </NavLink>
            </li>
            <li>
              <NavLink to="/drawing" onClick={closeMenu}>
                Dessin
              </NavLink>
            </li>
            <li>
              <NavLink to="/BubbleGenerator" onClick={closeMenu}>
                Générateur de bulles
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavigationMovieSection;
