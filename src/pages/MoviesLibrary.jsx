import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";

const MoviesLibrary = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get("/src/data/movies.json")
      .then((response) => {
        setFilms(response.data.movies.slice(0, 30));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="movies-library">
      <div className="back-container">
        <BackButton
          label="Back to Movies Section"
          fallback="/home-movie-section"
        />
      </div>

      <h1>Movies Library</h1>

      <div className="movies-grid">
        {films.map((film) => (
          <div key={film.id} className="movie-card">
            <img src={film.picture} alt={film.title} />

            <div className="movie-content">
              <h3>
                {film.title} ({film.year})
              </h3>

              <p className="director">
                🎬 <strong>Director:</strong> {film.director}
              </p>

              <p className="actors">
                🎭 <strong>Actors:</strong> {film.mainActors.join(", ")}
              </p>

              <p className="synopsis">{film.synopsis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesLibrary;
