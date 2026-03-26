import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";

const MoviesLibrary = () => {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    axios
      .get("/src/data/movies.json")
      .then((response) => {
        setFilms(response.data.movies.slice(0, 30));
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredFilms = films.filter((film) => {
    const searchLower = search.toLowerCase();

    return (
      film.title.toLowerCase().includes(searchLower) ||
      film.director.toLowerCase().includes(searchLower) ||
      film.mainActors.join(" ").toLowerCase().includes(searchLower) ||
      film.synopsis.toLowerCase().includes(searchLower)
    );
  });

  const sortedFilms = [...filteredFilms].sort((a, b) => {
    if (sortOrder === "oldest") {
      return a.year - b.year;
    }
    if (sortOrder === "newest") {
      return b.year - a.year;
    }
    return 0;
  });

  return (
    <div className="movies-library">
      <div className="back-container">
        <BackButton
          label="Back to Movies Section"
          fallback="/home-movie-section"
        />
      </div>

      <h1>Movies Library</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title, director, actors, synopsis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by year</option>
          <option value="oldest">Oldest → Newest</option>
          <option value="newest">Newest → Oldest</option>
        </select>
      </div>

      {/* FILMS */}
      <div className="movies-grid">
        {sortedFilms.map((film) => (
          <div
            key={film.id}
            className="movie-card"
            onClick={() => setSelectedFilm(film)}
          >
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
      {selectedFilm && (
        <div className="movie-modal" onClick={() => setSelectedFilm(null)}>
          <div
            className="movie-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedFilm.picture} alt={selectedFilm.title} />

            <h2>
              {selectedFilm.title} ({selectedFilm.year})
            </h2>

            <p>
              🎬 <strong>Director:</strong> {selectedFilm.director}
            </p>

            <p>
              🎭 <strong>Actors:</strong> {selectedFilm.mainActors.join(", ")}
            </p>

            <p className="full-synopsis">{selectedFilm.synopsis}</p>

            <button onClick={() => setSelectedFilm(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesLibrary;
