import React, { useState, useEffect, useRef } from "react";
import img1Drawer1 from "../assets/img-clothing-store/img1-drawer.jpg";
import img1Drawer2 from "../assets/img-clothing-store/img2-drawer.jpg";
import img1Drawer3 from "../assets/img-clothing-store/img3-drawer.jpg";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
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
import bags from "../assets/img-clothing-store/img-big-images-section/bags.jpg";
import shoes from "../assets/img-clothing-store/img-big-images-section/shoes.jpg";
import jackets from "../assets/img-clothing-store/img-big-images-section/jackets.jpg";
import trousers from "../assets/img-clothing-store/img-big-images-section/trousers.jpg";
import jeans1 from "../assets/img-clothing-store/img-big-images-section/jeans-1.jpg";
import jeans2 from "../assets/img-clothing-store/img-big-images-section/jeans-2.jpg";
import tops1 from "../assets/img-clothing-store/img-big-images-section/tops-1.jpg";
import tops2 from "../assets/img-clothing-store/img-big-images-section/tops-2.jpg";
import collectiveImage1 from "../assets/img-clothing-store/img-collective-section/img-collective-1.jpg";
import collectiveImage2 from "../assets/img-clothing-store/img-collective-section/img-collective-2.jpg";
import collectiveImage3 from "../assets/img-clothing-store/img-collective-section/img-collective-3.jpg";
import collectiveImage4 from "../assets/img-clothing-store/img-collective-section/img-collective-4.jpg";
import collectiveImage5 from "../assets/img-clothing-store/img-collective-section/img-collective-5.jpg";
import collectiveImage6 from "../assets/img-clothing-store/img-collective-section/img-collective-6.jpg";
import collectiveImage7 from "../assets/img-clothing-store/img-collective-section/img-collective-7.jpg";
import collectiveImage8 from "../assets/img-clothing-store/img-collective-section/img-collective-8.jpg";
import collectiveImage9 from "../assets/img-clothing-store/img-collective-section/img-collective-9.jpg";
import collectiveImage10 from "../assets/img-clothing-store/img-collective-section/img-collective-10.jpg";
import collectiveImage11 from "../assets/img-clothing-store/img-collective-section/img-collective-11.jpg";
import collectiveImage12 from "../assets/img-clothing-store/img-collective-section/img-collective-12.jpg";
import imgInteractiveHeels from "../assets/img-clothing-store/img-interactive-section/heels.jpg";
import imgInteractiveSneakers from "../assets/img-clothing-store/img-interactive-section/sneakers.jpg";
import imgInteractiveSandals from "../assets/img-clothing-store/img-interactive-section/sandals.jpg";
import imgInteractiveJackets from "../assets/img-clothing-store/img-interactive-section/jacket.jpg";
import imgInteractiveMiniShort from "../assets/img-clothing-store/img-interactive-section/mini-short.jpg";
import imgInteractiveSummerDress from "../assets/img-clothing-store/img-interactive-section/summer-dress.jpg";
import imgInteractiveTshirt from "../assets/img-clothing-store/img-interactive-section/t-shirt.jpg";
import chooseYourLook1 from "../assets/img-clothing-store/img-choose-your-look/pexel-1.jpg";
import chooseYourLook2 from "../assets/img-clothing-store/img-choose-your-look/pexel-2.jpg";
import chooseYourLook3 from "../assets/img-clothing-store/img-choose-your-look/pexel-3.jpg";
import chooseYourLook4 from "../assets/img-clothing-store/img-choose-your-look/pexel-4.jpg";
import chooseYourLook5 from "../assets/img-clothing-store/img-choose-your-look/pexel-5.jpg";
import chooseYourLook6 from "../assets/img-clothing-store/img-choose-your-look/pexel-6.jpg";
import chooseYourLook7 from "../assets/img-clothing-store/img-choose-your-look/pexel-7.jpg";
import chooseYourLook8 from "../assets/img-clothing-store/img-choose-your-look/pexel-8.jpg";
import chooseYourLook9 from "../assets/img-clothing-store/img-choose-your-look/pexel-9.jpg";
import chooseYourLook10 from "../assets/img-clothing-store/img-choose-your-look/pexel-10.jpg";
import chooseYourLook11 from "../assets/img-clothing-store/img-choose-your-look/pexel-11.jpg";
import chooseYourLook12 from "../assets/img-clothing-store/img-choose-your-look/pexel-12.jpg";

const ClothingStore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const bannerText =
    "WEEKLY NEWS We inspire people to enjoy fashion with passion DISCOVER";
  const deliveryText =
    "· Free delivery to store · Free home delivery on orders over £30 ·";

  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const interactiveRef = useRef(null);

  const totalSlides = 3;
  const slideDuration = 8000;

  const products = [
    {
      img: imgInteractiveHeels,
      title: "Heels",
      sizes: ["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      img: imgInteractiveSandals,
      title: "Sandals",
      sizes: ["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      img: imgInteractiveSneakers,
      title: "Sneakers",
      sizes: ["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      img: imgInteractiveJackets,
      title: "Jackets",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      img: imgInteractiveMiniShort,
      title: "Shorts",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      img: imgInteractiveSummerDress,
      title: "Dress",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      img: imgInteractiveTshirt,
      title: "T-shirt",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ];

  // Bloquer scroll body quand drawer ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Carousel interval
  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, slideDuration);
    }
  };

  // Carousel principal infinite loop
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

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    resetInterval();
  };
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    resetInterval();
  };

  const handlePausePlay = () => setIsPlaying((prev) => !prev);

  const scrollLeftInteractive = () => {
    if (!interactiveRef.current) return;
    interactiveRef.current.scrollBy({
      left: -interactiveRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollRightInteractive = () => {
    if (!interactiveRef.current) return;
    interactiveRef.current.scrollBy({
      left: interactiveRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="clothing-store">
      <div className="chat">
        <div className="inner-chat">
          <HiOutlineChatBubbleLeft id="chat-icon" />
          <p>Chat</p>
        </div>
      </div>
      <div className="delivery-banner">
        <div className="delivery-ticker">
          {[...Array(8)].map((_, index) => (
            <span key={index}>{deliveryText}</span>
          ))}
        </div>
      </div>
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
              <Search id="iconSearch1" />
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
                resetInterval();
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
              style={{
                backgroundImage: `url(${img1})`,
                backgroundPosition: "center top",
              }}
            >
              <div className="little-text-left">
                <h3>NEW IN</h3>
                <p>VIEW ALL</p>
              </div>
            </div>
            <div
              className="big-image carousel-image2"
              style={{
                backgroundImage: `url(${img2})`,
                backgroundPosition: "center top",
              }}
            ></div>
          </div>

          {/* SLIDE 2 */}
          <div className="each-part-carousel">
            <div
              className="big-image carousel-image3"
              style={{
                backgroundImage: `url(${img3})`,
                backgroundPosition: "center top",
              }}
            >
              <div className="little-text-left">
                <h3> STR TEEN</h3>
                <p>VIEW ALL</p>
              </div>
            </div>
            <div
              className="big-image carousel-image4"
              style={{
                backgroundImage: `url(${img4})`,
                backgroundPosition: "center top",
              }}
            ></div>
          </div>

          {/* SLIDE 3 */}
          <div className="each-part-carousel">
            <div
              className="big-image carousel-image5"
              style={{
                backgroundImage: `url(${img5})`,
                backgroundPosition: "center top",
              }}
            >
              <div className="little-text-left">
                <h3>CASUAL SPORT</h3>
                <p>VIEW ALL</p>
              </div>
            </div>
            <div
              className="big-image carousel-image6"
              style={{
                backgroundImage: `url(${img6})`,
                backgroundPosition: "center top",
              }}
            ></div>
          </div>

          {/* DUPLICATION DU PREMIER SLIDE (clé loop) */}
          <div className="each-part-carousel">
            <div
              className="big-image carousel-image1"
              style={{
                backgroundImage: `url(${img1})`,
                backgroundPosition: "center top",
              }}
            >
              <div className="little-text-left">
                <h3>NEW IN</h3>
                <p>VIEW ALL</p>
              </div>
            </div>
            <div
              className="big-image carousel-image2"
              style={{
                backgroundImage: `url(${img2})`,
                backgroundPosition: "center top",
              }}
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
              <Search id="iconSearch2" />
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
        <h2>On 27.04 WE OPEN IN LONDON</h2>
        <div className="text-informations">
          <p>
            Visit us at the Clothing Store Shopping Centre and discover our
            latest collections.
          </p>
          <h4>📍LOCAL LSU 3/4 & LSU 12 LEVEL 2 </h4>
        </div>
      </div>
      <div className="big-images-section">
        <div className="part part-1">
          <div
            className="big-image"
            style={{ backgroundImage: `url(${bags})` }}
          >
            <div className="little-text-image">
              <h3>BAGS</h3>
              <p>VIEW ALL</p>
            </div>
          </div>
          <div
            className="big-image"
            style={{ backgroundImage: `url(${shoes})` }}
          >
            <div className="little-text-image">
              <h3>SHOES</h3>
              <p>VIEW ALL</p>
            </div>
          </div>
        </div>
        <div className="part part-2">
          <div
            className="big-image jackets"
            style={{ backgroundImage: `url(${jackets})` }}
          >
            <div className="little-text-image">
              <h3>JACKETS</h3>
              <p>VIEW ALL</p>
            </div>
          </div>
          <div
            className="big-image"
            style={{ backgroundImage: `url(${trousers})` }}
          >
            <div className="little-text-image">
              <h3>TROUSERS</h3>
              <p>VIEW ALL</p>
            </div>
          </div>
        </div>
        <div className="inserted-information">
          <div className="text-left">D80 Barrel</div>
          <div className="text-right">
            <p>2026</p>
            <p>
              Spring-Summer <br /> Collection
            </p>
          </div>
        </div>
        <div className="part part-3">
          <div
            className="big-image"
            style={{ backgroundImage: `url(${jeans1})` }}
          >
            <div className="little-text-image">
              <h3>JEANS</h3>
              <p>VIEW ALL</p>
            </div>
          </div>
          <div
            className="big-image"
            style={{ backgroundImage: `url(${jeans2})` }}
          ></div>
        </div>
        <div className="part part-4">
          <div
            className="big-image img-tops1"
            style={{ backgroundImage: `url(${tops1})` }}
          >
            <div className="little-text-image">
              <h3>TOPS & BODYSUITS</h3>
              <p>VIEW ALL</p>
            </div>
          </div>
          <div
            className="big-image"
            style={{ backgroundImage: `url(${tops2})` }}
          ></div>
        </div>
      </div>
      <div className="collective-section">
        <div className="grid-section">
          <div className="grid">
            <img src={collectiveImage1} alt="" />
            <img src={collectiveImage2} alt="" />
            <img src={collectiveImage3} alt="" />
            <img src={collectiveImage4} alt="" />
            <img src={collectiveImage5} alt="" />
            <img src={collectiveImage6} alt="" />
            <img src={collectiveImage7} alt="" />
            <img src={collectiveImage8} alt="" />
            <img src={collectiveImage9} alt="" />
            <img src={collectiveImage10} alt="" />
            <img src={collectiveImage11} alt="" />
            <img src={collectiveImage12} alt="" />
          </div>
        </div>
        <div className="right-part-collective-section">
          <h1>THE COLLECTIVE</h1>
          <p>The Experiential Project by Stradivarius</p>
          <h2>DISCOVER THE LOOKS</h2>
        </div>
      </div>

      <div className="interactive-section">
        <h1>LATEST NEWS FOR YOU</h1>
        <div className="interactive-wrapper">
          <button className="buttonLeft" onClick={scrollLeftInteractive}>
            ❮
          </button>
          <button className="buttonRight" onClick={scrollRightInteractive}>
            ❯
          </button>
          <div className="carousel-interactive-section" ref={interactiveRef}>
            {products.map((product, index) => (
              <div className="each-column-full" key={index}>
                <div className="each-column-interactive">
                  <img src={product.img} alt={product.title} />
                  <div className="overlay-sizes">
                    <h4>SIZES</h4>
                    <div className="choice-sizes">
                      {product.sizes.map((size, i) => (
                        <span key={i}>{size}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="title-and-prices">
                  <h5>{product.title}</h5>
                  <p className="price">£29.99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="chooseYourLook">
        <div id="grid-section">
          <div id="grid">
            <img src={chooseYourLook1} alt="" />
            <img src={chooseYourLook2} alt="" />
            <img src={chooseYourLook3} alt="" />
            <img src={chooseYourLook4} alt="" />
            <img src={chooseYourLook5} alt="" />
            <img src={chooseYourLook6} alt="" />
            <img src={chooseYourLook7} alt="" />
            <img src={chooseYourLook8} alt="" />
            <img src={chooseYourLook9} alt="" />
            <img src={chooseYourLook10} alt="" />
            <img src={chooseYourLook11} alt="" />
            <img src={chooseYourLook12} alt="" />
          </div>
        </div>
        <div id="right-part">
          <h1>Choose your look</h1>
        </div>
      </div>

      <div className="scrolling-banner-part">
        <div className="scrolling-banner">
          <div className="inner-scrolling-banner">
            {[...Array(4)].map((_, index) => (
              <React.Fragment key={index}>
                <span>{bannerText}</span>
                <span>☺️</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="subscription">
        <div className="left-part">
          <h1>STAY UP-TO-DATE ON THE LATEST TRENDS AND EXCLUSIVE OFFERS</h1>
          <p>
            Subscribe now and receive the latest in fashion and tips straight to
            your email.
          </p>
        </div>
        <div className="right-part">
          <input type="text" name="" id="inputMail" placeholder="Email" />
          <button className="submit">SUBSCRIBE NOW</button>
          <p className="unsubscribe">I want to unsubscribe</p>
        </div>
      </div>

      <div className="little-information">
        **Free delivery over £30, only for non-discounted products from the new
        collection.
      </div>

      <footer>
        <div className="information-footer">
          <h3>Online women's and Men's clothing store</h3>
          <p>
            Discover the latest fashion on <span>ClothingStore</span>. Find your
            favorite, elegant <span>dresses</span> <span>pants</span>,
            comfortable <span>jeans</span> and modern <span>shoes</span>. Renew
            your wardrobe with our fashion collections that combine style and
            comfort.
          </p>
        </div>
        <ul className="nav-footer">
          <li>HELP</li>
          <li>US</li>
          <li>GIFT CARD</li>
          <li>FOLLOW US</li>
          <li>OUR APP</li>
          <li>LEGAL</li>
          <li>SITEMAP</li>
          <li>
            <span className="country1">UNITED KINGDOM</span>{" "}
            <span className="barre"></span>{" "}
            <span className="country2">ENGLISH</span>
          </li>
        </ul>
        <div className="logo-brand">
          <div className="logo">ClothingStore</div>
          <p className="copyright">© 2026 Stradivarius</p>
        </div>
      </footer>

      {/* OVERLAY */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
};

export default ClothingStore;

/* 




*/
