import React from "react";

const RatingStars = ({ rating, onRate }) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={rating >= star ? "active" : ""}
          onClick={() => onRate(star)}
        >
          ⭐
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
