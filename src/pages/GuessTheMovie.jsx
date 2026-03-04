import React, { useEffect, useState, useRef } from "react";
import { RotateCcw } from "lucide-react";
import NavigationMovieSection from "../components/MainNavigation";
import axios from "axios";

const GuessTheMovie = () => {
  const [films, setFilms] = useState([]);
  const [currentFilm, setCurrentFilm] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);
  const [usedFilms, setUsedFilms] = useState([]);

  // Paliers / banner
  const [tierMessage, setTierMessage] = useState("");
  const [currentTier, setCurrentTier] = useState("");
  const tierTimeoutRef = useRef(null);
  const timerRef = useRef(null);

  // -----------------------
  // Fonctions utilitaires
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
    if (count <= 30) return "Palier 1 — 1 point";
    if (count <= 40) return "Palier 2 — 2 points";
    if (count <= 60) return "Palier 3 — 3 points";
    if (count <= 80) return "Palier 4 — 4 points";
    if (count <= 100) return "Palier 5 — 5 points";
    return "Palier ultime — 10 points";
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
      .get("/cinema-quiz/db-cinema.json")
      .then((response) => {
        const filmsData = response.data.films;
        if (Array.isArray(filmsData) && filmsData.length > 0) {
          setFilms(filmsData);
        }
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
  // Mise à jour du palier courant
  // -----------------------
  useEffect(() => {
    setCurrentTier(getTierLabel(usedFilms.length));
  }, [usedFilms.length]);

  // -----------------------
  // Nettoyage timer
  // -----------------------
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
    const availableFilms = filmsList.filter(
      (film) => !usedList.some((u) => u.id === film.id),
    );

    if (availableFilms.length === 0) {
      handleGameOver("🎉 Bravo ! Tous les films ont été trouvés !");
      return;
    }

    const randomFilm =
      availableFilms[Math.floor(Math.random() * availableFilms.length)];

    setCurrentFilm(randomFilm);
    setOptions(generateOptions(randomFilm, filmsList));
    setTimeLeft(10);
    startTimer();
  };

  const generateOptions = (currentFilm, filmsList) => {
    const wrongFilms = filmsList.filter((film) => film.id !== currentFilm.id);
    const uniqueWrongFilms = Array.from(
      new Map(wrongFilms.map((f) => [f.id, f])).values(),
    );
    const shuffled = [...uniqueWrongFilms].sort(() => Math.random() - 0.5);
    const selectedWrong = shuffled.slice(0, 3);
    const finalOptions = [...selectedWrong, currentFilm];
    return finalOptions.sort(() => Math.random() - 0.5);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleGameOver("⏰ Temps écoulé !");
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
        showTierBanner(`⭐ Nouveau palier ! ${getTierLabel(newCount)}`);
      }

      setMessage(`✅ Bonne réponse ! +${now} point${now > 1 ? "s" : ""}`);

      setTimeout(() => {
        setMessage("");
        initQuiz(films, newUsed);
      }, 900);
    } else {
      handleGameOver(`❌ Mauvaise réponse. C'était "${currentFilm.title}".`);
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

  // -----------------------
  // JSX
  // -----------------------
  return (
    <div className="guess-the-movie">
      <NavigationMovieSection />

      <div className="container-guess-the-movie">
        <div className={`tier-banner ${tierMessage ? "show" : ""}`}>
          {tierMessage}
        </div>

        <div className="tier-info">
          <div>
            Films trouvés : <strong>{usedFilms.length}</strong>
          </div>
          <div className="tier-current">
            Palier actuel : <strong>{currentTier}</strong>
          </div>
          <div>
            Points par film :{" "}
            <strong>{getPointsForCount(usedFilms.length)}</strong>
          </div>
        </div>

        <div className="box-quiz">
          <p className="score">Score : {score}</p>
          <p className={`timer ${timeLeft <= 3 ? "urgent" : ""}`}>
            Temps restant : {timeLeft}s
          </p>

          <div className="quiz-image">
            {currentFilm && (
              <img src={currentFilm.image} alt={currentFilm.title} />
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
              className={`quiz-message ${
                message.includes("Bonne") ? "success" : "error"
              }`}
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
