import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import image1 from "../assets/img-home/landscape-1.jpg";
import image2 from "../assets/img-home/landscape-2.jpg";
import image3 from "../assets/img-home/landscape-3.jpg";

const images = [image1, image2, image3];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000); // 8 secondes
    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      <h1>Welcome</h1>
      <Navigation />
    </div>
  );
};

export default Home;
