import React from "react";

import { Heart } from "lucide-react";

import RatingStars from "./RatingStars";
import CommentSection from "./CommentSection";

const MovieCard = ({
  film,
  isFavorite,
  toggleFavorite,
  rating,
  handleRate,
  comments,
  addComment,
}) => {
  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={film.picture} alt={film.title} />

        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => toggleFavorite(film.id)}
        >
          <Heart fill={isFavorite ? "red" : "transparent"} id="heart" />
        </button>
      </div>

      <div className="movie-content">
        <h2>
          {film.title} ({film.year})
        </h2>

        <p>
          <strong>Director:</strong> {film.director}
        </p>

        <p>
          <strong>Actors:</strong> {film.mainActors.join(", ")}
        </p>

        <RatingStars
          rating={rating}
          onRate={(value) => handleRate(film.id, value)}
        />

        <CommentSection
          comments={comments}
          onAddComment={(text) => addComment(film.id, text)}
        />
      </div>
    </div>
  );
};

export default MovieCard;
