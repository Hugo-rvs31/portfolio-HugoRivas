import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const MainNavigation = () => {
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
    <div className="main-navigation">
      <div className="menu-button" onClick={toggleMenu}>
        {isOpen ? "Fermer" : "Menu"}
      </div>

      {isOpen && (
        <nav className="navigation-inner">
          <ul>
            <NavLink to="/home-movie-section" onClick={closeMenu}>
              Movies Section
            </NavLink>
            <NavLink to="/clothing-store" onClick={closeMenu}>
              Clothing Store
            </NavLink>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MainNavigation;
