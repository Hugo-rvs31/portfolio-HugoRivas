import React, { useState, useEffect, useRef } from "react";
import img1Drawer1 from "../assets/img-clothing-store/img1-drawer.jpg";
import img1Drawer2 from "../assets/img-clothing-store/img2-drawer.jpg";
import img1Drawer3 from "../assets/img-clothing-store/img3-drawer.jpg";
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import img1 from "../assets/img-clothing-store/img-carousel-section/carousel-new-in1.jpg";
import img2 from "../assets/img-clothing-store/img-carousel-section/carousel-new-in2.jpg";
import img3 from "../assets/img-clothing-store/img-carousel-section/carousel-street-teen1.jpg";
import img4 from "../assets/img-clothing-store/img-carousel-section/carousel-street-teen2.jpg";
import img5 from "../assets/img-clothing-store/img-carousel-section/carousel-sport-casual1.jpg";
import img6 from "../assets/img-clothing-store/img-carousel-section/carousel-sport-casual2.jpg";

const ClothingStore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef();
  const intervalRef = useRef();

  const totalSlides = 3;
  const slideDuration = 8000; // 8 secondes

  // Bloquer le scroll du body quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Fonction pour lancer ou relancer l'intervalle
  const resetInterval = () => {
    clearInterval(intervalRef.current);
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, slideDuration);
    }
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Boucle infinie propre
  useEffect(() => {
    if (currentIndex === totalSlides) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1000);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex]);

  // RIGHT/LEFT PLAYER
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    resetInterval();
  };
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    resetInterval();
  };

  // Gestion pause/play
  const handlePausePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="clothing-store">
      <header>
        <div className="nav-fixed">
          <div className="menu-left">
            <div id="menu-drawer" onClick={() => setIsOpen(true)}>
              <Menu id="iconMenu" />
            </div>
            <div className="NameBrand">
              <h1>ClothingStore</h1>
            </div>
          </div>
          <div className="menu-right">
            <div className="divInputSearch1">
              <input
                className="inputSearch1"
                type="search"
                placeholder="Search by product, collection..."
              />
              <Search id="iconSearch" />
            </div>
            <div className="three-icons">
              <User />
              <Heart />
              <ShoppingBag />
            </div>
          </div>
        </div>
      </header>

      <div className="carousel-section">
        {/* DOTS */}
        <div className="three-dots-carousel">
          {[...Array(totalSlides)].map((_, index) => (
            <span
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsTransitioning(true);
                resetInterval(); // reset compteur
              }}
              style={{
                background:
                  currentIndex % totalSlides === index ? "black" : "white",
              }}
            ></span>
          ))}
        </div>

        {/* PLAYER */}
        <div className="carousel-player">
          <ChevronLeft className="icon player-icon" onClick={handlePrev} />
          {isPlaying ? (
            <Pause className="icon player-icon" onClick={handlePausePlay} />
          ) : (
            <Play className="icon player-icon" onClick={handlePausePlay} />
          )}
          <ChevronRight className="icon player-icon" onClick={handleNext} />
        </div>

        {/* SLIDES */}
        <div
          ref={carouselRef}
          className="carousel-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 25}%)`,
            transition: isTransitioning ? "transform 1s ease-in-out" : "none",
          }}
        >
          {/* SLIDE 1 */}
          <div className="each-part-carousel">
            <div
              className="big-image carousel-image1"
              style={{ backgroundImage: `url(${img1})` }}
            >
              <div className="little-text-left">
                <h3>NEW IN</h3>
                <p>VIEW ALL</p>
              </div>
            </div>
            <div
              className="big-image carousel-image2"
              style={{ backgroundImage: `url(${img2})` }}
            ></div>
          </div>

          {/* SLIDE 2 */}
          <div className="each-part-carousel">
            <div
              className="big-image carousel-image3"
              style={{ backgroundImage: `url(${img3})` }}
            >
              <div className="little-text-left">
                <h3> STR TEEN</h3>
                <p>VIEW ALL</p>
              </div>
            </div>
            <div
              className="big-image carousel-image4"
              style={{ backgroundImage: `url(${img4})` }}
            ></div>
          </div>

          {/* SLIDE 3 */}
          <div className="each-part-carousel">
            <div
              className="big-image carousel-image5"
              style={{ backgroundImage: `url(${img5})` }}
            >
              <div className="little-text-left">
                <h3>CASUAL SPORT</h3>
                <p>VIEW ALL</p>
              </div>
            </div>
            <div
              className="big-image carousel-image6"
              style={{ backgroundImage: `url(${img6})` }}
            ></div>
          </div>

          {/* DUPLICATION DU PREMIER SLIDE (clé loop) */}
          <div className="each-part-carousel">
            <div
              className="big-image carousel-image1"
              style={{ backgroundImage: `url(${img1})` }}
            >
              <div className="little-text-left">
                <h3>NEW IN</h3>
                <p>VIEW ALL</p>
              </div>
            </div>
            <div
              className="big-image carousel-image2"
              style={{ backgroundImage: `url(${img2})` }}
            ></div>
          </div>
        </div>
      </div>

      {/* DRAWER */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="inner-drawer">
          <div className="up">
            <button onClick={() => setIsOpen(false)}>✕</button>
            <h2>Menu</h2>
            <div className="divInputSearch2">
              <input
                type="search"
                className="inputSearch2"
                placeholder="SEARCH"
              />
            </div>
          </div>
          <div className="images-part">
            <img src={img1Drawer1} alt="" />
            <img src={img1Drawer2} alt="" />
            <img src={img1Drawer3} alt="" />
          </div>
          <ul>
            <li>NEW IN</li>
            <li>CITY BREAK LOOKS</li>
            <li>CO ORDS SETS</li>
            <li>CLOTHING</li>
            <li>JEANS</li>
            <li>
              STR TEEN <p>NEW</p>
            </li>
            <li>CASUAL SPORT</li>
            <li>BASICS</li>
            <li>SHOES</li>
            <li>BAGS</li>
            <li>ACCESSORIES</li>
            <li>PERFUMES</li>
            <li id="li-red">SPECIAL PRICES</li>
            <li>GIFT CARD</li>
          </ul>
        </div>
      </div>
      {/* INFORMATIONS */}
      <div className="informations-1">
        <h1>On 27.04 WE OPEN IN LONDON</h1>
        <div className="text-informations">
          <p>
            Visit us at the TRAFFORD CENTRE Shopping Centre and discover our
            latest collections.
          </p>
          <h4>📍LOCAL LSU 4/5 & LSU 15 LEVEL 3 </h4>
        </div>
      </div>

      {/* OVERLAY */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};

export default ClothingStore;
