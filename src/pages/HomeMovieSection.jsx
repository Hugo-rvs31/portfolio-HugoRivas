import React, { useMemo } from "react";
import NavigationMovieSection from "../components/NavigationMovieSection";

const images = import.meta.glob("../assets/img-homeMovieSection/*", {
  eager: true,
});

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const HomeMovieSection = () => {
  const imageList = Object.values(images).map((img) => img.default);

  const shuffledImages = useMemo(() => shuffleArray(imageList), []);

  return (
    <div className="home">
      <NavigationMovieSection />
      <div className="home-grid">
        {shuffledImages.map((img, index) => (
          <img key={index} src={img} alt="" />
        ))}
      </div>

      <div className="game-rules-box">
        <h1>Quiz Cinéma</h1>
        <NavigationMovieSection />
      </div>
    </div>
  );
};

export default HomeMovieSection;
