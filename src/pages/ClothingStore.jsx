import React, { useState, useEffect } from "react";
import img1Drawer1 from "../assets/img-clothing-store/img1-drawer.jpg";
import img1Drawer2 from "../assets/img-clothing-store/img2-drawer.jpg";
import img1Drawer3 from "../assets/img-clothing-store/img3-drawer.jpg";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";

const ClothingStore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Bloquer le scroll du body quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Carousel automatique
  useEffect(() => {
    const totalSlides = 3;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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
        <div
          className="carousel-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="each-part-carousel">
            <div className="big-image carousel-image1">
              <div className="little-text-left">
                <h3>
                  <p></p>
                </h3>
              </div>
            </div>
            <div className="big-image carousel-image2">
              <div className="little-text-left">
                <h3>
                  <p></p>
                </h3>
              </div>
            </div>
          </div>
          <div className="each-part-carousel">
            <div className="big-image carousel-image3">
              <div className="little-text-left">
                <h3>
                  <p></p>
                </h3>
              </div>
            </div>
            <div className="big-image carousel-image4">
              <div className="little-text-left">
                <h3>
                  <p></p>
                </h3>
              </div>
            </div>
          </div>
          <div className="each-part-carousel">
            <div className="big-image carousel-image5">
              <div className="little-text-left">
                <h3>
                  <p></p>
                </h3>
              </div>
            </div>
            <div className="big-image carousel-image6">
              <div className="little-text-left">
                <h3>
                  <p></p>
                </h3>
              </div>
            </div>
          </div>
          <div className="three-dots-carousel"></div>
          <div className="carousel-player"></div>
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

      {/* OVERLAY */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};

export default ClothingStore;
