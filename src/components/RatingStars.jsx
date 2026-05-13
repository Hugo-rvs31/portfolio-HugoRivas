import React, { useState } from "react";
import { Star } from "lucide-react";

const RatingStars = ({ rating, onRate }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = hovered >= star || rating >= star;

        return (
          <button
            key={star}
            onClick={() => onRate(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            <Star
              className={active ? "star active" : "star"}
              fill={active ? "#ffd43b" : "transparent"}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
