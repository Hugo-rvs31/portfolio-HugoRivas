import React, { useEffect, useMemo, useState } from "react";
import NavigationMovieSection from "../components/NavigationMovieSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const HomeMovieSection = () => {
  const [images, setImages] = useState([]);
  const [maxCells, setMaxCells] = useState(88); // valeur par défaut
  const navigate = useNavigate();

  const handleGridClick = () => {
    navigate("/library"); // future page bibliothèque
  };

  useEffect(() => {
    axios
      .get("/cinema-quiz/db-cinema.json")
      .then((res) => {
        const imgs = res.data.films.map((f) => f.image);
        setImages(imgs);
      })
      .catch(console.error);
  }, []);

  // calcul dynamique du nombre de cellules selon la largeur de la fenêtre
  useEffect(() => {
    const updateGridCells = () => {
      const width = window.innerWidth;
      let columns = 11;
      let rows = 8;

      if (width <= 400) {
        columns = 2;
        rows = 5;
      } else if (width <= 500) {
        columns = 3;
        rows = 5;
      } else if (width <= 650) {
        columns = 4;
        rows = 6; // on peut ajuster selon tes besoins
      } else if (width <= 910) {
        columns = 5;
        rows = 6;
      } else if (width <= 1050) {
        columns = 6;
        rows = 8;
      } else if (width <= 1280) {
        columns = 9;
        rows = 8;
      } else {
        columns = 11;
        rows = 8;
      }

      setMaxCells(columns * rows);
    };

    updateGridCells();
    window.addEventListener("resize", updateGridCells);
    return () => window.removeEventListener("resize", updateGridCells);
  }, []);

  const shuffledImages = useMemo(() => shuffleArray(images), [images]);

  return (
    <div className="home">
      <div className="home-grid">
        {shuffledImages.slice(0, maxCells).map((img, index) => (
          <div
            key={index}
            className="grid-cell"
            style={{ backgroundImage: `url(${img})` }}
            onClick={handleGridClick}
          />
        ))}
      </div>

      <div className="game-rules-box" onClick={(e) => e.stopPropagation()}>
        <h1>Quiz Cinéma</h1>
        <div className="game-rules">
          Trouvez le film correspondant à l'image en moins de 10 secondes.{" "}
          <br />
          Plus vous trouvez de films, plus votre score final sera élevé, chaque
          film vaut 1 point de 1 à 20 films, puis 2 points de 21 à 40 films (le
          jeu fonctionne par palier de 20 films) et ainsi de suite
          <br />
          Êtes-vous prêt à tester vos connaissances cinéma ?
        </div>
        <NavigationMovieSection />
      </div>
    </div>
  );
};

export default HomeMovieSection;
