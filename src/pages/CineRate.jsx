import React, { useEffect, useState } from "react";
import axios from "axios";

import BackButton from "../components/BackButton";
import UserSetup from "../components/UserSetup";
import MovieCard from "../components/MovieCard";

const CineRate = () => {
  const [films, setFilms] = useState([]);

  const [user, setUser] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("./data/movies.json")
      .then((response) => {
        setFilms(response.data.movies.slice(0, 30));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("cinerate-user");
    const savedFavorites = localStorage.getItem("cinerate-favorites");
    const savedRatings = localStorage.getItem("cinerate-ratings");
    const savedComments = localStorage.getItem("cinerate-comments");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRatings) setRatings(JSON.parse(savedRatings));
    if (savedComments) setComments(JSON.parse(savedComments));
  }, []);

  useEffect(() => {
    localStorage.setItem("cinerate-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cinerate-ratings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem("cinerate-comments", JSON.stringify(comments));
  }, [comments]);

  const handleUserSetup = (newUser) => {
    setUser(newUser);

    localStorage.setItem("cinerate-user", JSON.stringify(newUser));
  };

  const toggleFavorite = (filmId) => {
    if (favorites.includes(filmId)) {
      setFavorites(favorites.filter((id) => id !== filmId));
    } else {
      setFavorites([...favorites, filmId]);
    }
  };

  const handleRate = (filmId, value) => {
    setRatings({
      ...ratings,
      [filmId]: value,
    });
  };

  const handleAddComment = (filmId, text) => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      username: user.username,
      avatar: user.avatar,
      text,
      date: new Date().toLocaleString(),
    };

    setComments({
      ...comments,
      [filmId]: comments[filmId]
        ? [newComment, ...comments[filmId]]
        : [newComment],
    });
  };

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleLogout = () => {
    localStorage.removeItem("cinerate-user");
    setUser(null);
  };

  return (
    <div className="cinerate">
      <BackButton />

      {!user ? (
        <UserSetup onSetup={handleUserSetup} />
      ) : (
        <div className="cinerate-inner">
          <div className="top-bar">
            <h1>
              Welcome {user.avatar} {user.username}
            </h1>
            <button onClick={handleLogout}>Logout</button>

            <input
              type="text"
              placeholder="Search a movie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="movies-grid">
            {filteredFilms.map((film) => (
              <MovieCard
                key={film.id}
                film={film}
                isFavorite={favorites.includes(film.id)}
                toggleFavorite={toggleFavorite}
                rating={ratings[film.id] || 0}
                handleRate={handleRate}
                comments={comments[film.id] || []}
                addComment={handleAddComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CineRate;
