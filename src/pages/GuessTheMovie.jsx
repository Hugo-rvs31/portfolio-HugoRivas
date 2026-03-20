import React, { useEffect, useState, useRef } from "react";
import { RotateCcw } from "lucide-react";
import NavigationMovieSection from "../components/MainNavigation";
import axios from "axios";

// Import dynamique des 30 premières images
const images = import.meta.glob(
  "../assets/img-homeMovieSection/*.{jpg,png,jpeg}",
  { eager: true },
);
const imageList = Object.entries(images)
  .sort(([a], [b]) => a.localeCompare(b)) // tri par nom pour correspondre au JSON
  .slice(0, 30)
  .map(([, img]) => img.default);

const GuessTheMovie = () => {
  const [films, setFilms] = useState([]);
  const [currentFilm, setCurrentFilm] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);
  const [usedFilms, setUsedFilms] = useState([]);

  const [tierMessage, setTierMessage] = useState("");
  const [currentTier, setCurrentTier] = useState("");
  const tierTimeoutRef = useRef(null);
  const timerRef = useRef(null);

  // -----------------------
  // Utilitaires
  // -----------------------
  const getPointsForCount = (count) => {
    if (count <= 20) return 1;
    if (count <= 40) return 2;
    if (count <= 60) return 3;
    if (count <= 80) return 4;
    if (count <= 100) return 5;
    return 10;
  };

  const getTierLabel = (count) => {
    if (count <= 30) return "Tier 1 — 1 point";
    if (count <= 40) return "Tier 2 — 2 points";
    if (count <= 60) return "Tier 3 — 3 points";
    if (count <= 80) return "Tier 4 — 4 points";
    if (count <= 100) return "Tier 5 — 5 points";
    return "Last tier — 10 points";
  };

  const showTierBanner = (text) => {
    clearTimeout(tierTimeoutRef.current);
    setTierMessage(text);
    tierTimeoutRef.current = setTimeout(() => setTierMessage(""), 3000);
  };

  // -----------------------
  // Chargement des films
  // -----------------------
  useEffect(() => {
    axios
      .get("/src/data/movies.json")
      .then((response) => {
        const moviesData = response.data.movies.slice(0, 30);
        const moviesWithImages = moviesData.map((movie, index) => ({
          ...movie,
          picture: imageList[index] || null,
        }));
        setFilms(moviesWithImages);
      })
      .catch((error) => console.error(error));
  }, []);

  // -----------------------
  // Démarrage automatique
  // -----------------------
  useEffect(() => {
    if (films.length > 0 && !currentFilm && !isGameOver) {
      initQuiz(films, []);
    }
  }, [films]);

  // -----------------------
  // Mise à jour du palier
  // -----------------------
  useEffect(() => {
    setCurrentTier(getTierLabel(usedFilms.length));
  }, [usedFilms.length]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(tierTimeoutRef.current);
    };
  }, []);

  // -----------------------
  // Quiz logic
  // -----------------------
  const initQuiz = (filmsList, usedList) => {
    const availableFilms = filmsList.filter((film) => !usedList.includes(film));

    if (availableFilms.length === 0) {
      handleGameOver("🎉 Well done, all the films have been found!");
      return;
    }

    const randomFilm =
      availableFilms[Math.floor(Math.random() * availableFilms.length)];

    // Générer les options : 3 mauvaises réponses + film courant
    const wrongOptions = filmsList
      .filter((film) => film !== randomFilm)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [...wrongOptions, randomFilm].sort(
      () => Math.random() - 0.5,
    );

    setCurrentFilm(randomFilm);
    setOptions(allOptions);
    setTimeLeft(10);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleGameOver("⏰ Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (title) => {
    if (isGameOver) return;
    clearInterval(timerRef.current);

    if (title === currentFilm.title) {
      const newUsed = [...usedFilms, currentFilm];
      const prevCount = usedFilms.length;
      const newCount = newUsed.length;

      const before = getPointsForCount(prevCount);
      const now = getPointsForCount(newCount);

      setScore((prev) => prev + now);
      setUsedFilms(newUsed);

      if (before !== now) {
        showTierBanner(`⭐ New tier ! ${getTierLabel(newCount)}`);
      }

      setMessage(`✅ Correct answer ! +${now} point${now > 1 ? "s" : ""}`);

      setTimeout(() => {
        setMessage("");
        initQuiz(films, newUsed);
      }, 900);
    } else {
      handleGameOver(
        `❌ Wrong answer. The correct answer was "${currentFilm.title}".`,
      );
    }
  };

  const handleGameOver = (text) => {
    setIsGameOver(true);
    setMessage(text);
    clearInterval(timerRef.current);
  };

  const handleRestart = () => {
    clearInterval(timerRef.current);
    setIsGameOver(false);
    setScore(0);
    setMessage("");
    setUsedFilms([]);
    setCurrentFilm(null);
    setOptions([]);
    setTimeLeft(10);
    setTierMessage("");
    setTimeout(() => {
      initQuiz(films, []);
    }, 100);
  };

  return (
    <div className="guess-the-movie">
      <NavigationMovieSection />

      <div className="container-guess-the-movie">
        <div className={`tier-banner ${tierMessage ? "show" : ""}`}>
          {tierMessage}
        </div>

        <div className="tier-info">
          <div>
            Films found : <strong>{usedFilms.length}</strong>
          </div>
          <div className="tier-current">
            Current tier : <strong>{currentTier}</strong>
          </div>
          <div>
            Points per film :{" "}
            <strong>{getPointsForCount(usedFilms.length)}</strong>
          </div>
        </div>

        <div className="box-quiz">
          <p className="score">Score : {score}</p>
          <p className={`timer ${timeLeft <= 3 ? "urgent" : ""}`}>
            Time remaining : {timeLeft}s
          </p>

          <div className="quiz-image">
            {currentFilm && (
              <img src={currentFilm.picture} alt={currentFilm.title} />
            )}
          </div>

          <div className="quiz-options">
            {options.map((option) => (
              <button
                key={option.id}
                className="quiz-button"
                onClick={() => handleAnswer(option.title)}
                disabled={isGameOver}
              >
                {option.title}
              </button>
            ))}
          </div>

          {message && (
            <p
              className={`quiz-message ${message.includes("Bonne") ? "success" : "error"}`}
            >
              {message}
            </p>
          )}

          {isGameOver && (
            <div className="end-block">
              <p className="final-score">Résultat final</p>
              <p>
                Films trouvés : <strong>{usedFilms.length}</strong>
              </p>
              <p>
                Score total : <strong>{score}</strong>
              </p>

              <button className="restart-button" onClick={handleRestart}>
                <RotateCcw size={20} />
                <span>Rejouer</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuessTheMovie;
