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
  const [hasStarted, setHasStarted] = useState(false);

  const timerRef = useRef(null);

  // -----------------------
  // Chargement des films
  // -----------------------
  useEffect(() => {
    axios
      .get("/src/data/movies.json")
      .then((response) => {
        const moviesData = response.data.movies.slice(0, 30);
        setFilms(moviesData);
      })
      .catch((error) => console.error(error));
  }, []);

  // -----------------------
  // Lancement du jeu
  // -----------------------
  useEffect(() => {
    if (films.length > 0 && hasStarted && !currentFilm && !isGameOver) {
      initQuiz(films, []);
    }
  }, [films, hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // -----------------------
  // Quiz logic
  // -----------------------
  const initQuiz = (filmsList, usedList) => {
    const availableFilms = filmsList.filter(
      (film) => !usedList.some((f) => f.id === film.id), // ✅ FIX important
    );

    if (availableFilms.length === 0) {
      handleGameOver("🎉 Well done, you found all the movies!");
      return;
    }

    const randomFilm =
      availableFilms[Math.floor(Math.random() * availableFilms.length)];

    const wrongOptions = filmsList
      .filter((film) => film.id !== randomFilm.id) // ✅ FIX important
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

      setScore((prev) => prev + 1);
      setUsedFilms(newUsed);

      setMessage("✅ Correct answer! +1 point");

      setTimeout(() => {
        setMessage("");
        initQuiz(films, newUsed);
      }, 800);
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

    setTimeout(() => {
      initQuiz(films, []);
    }, 100);
  };

  return (
    <div className="guess-the-movie">
      <NavigationMovieSection />

      <div className="container-guess-the-movie">
        {!hasStarted ? (
          <div className="start-screen">
            <h2>Game Rules</h2>
            <p>
              Guess the movie based on the image. You have 10 seconds for each
              question. Try to find all 30 movies!
            </p>
            <button className="start-button" onClick={handleStart}>
              Start Game
            </button>
          </div>
        ) : (
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

            {message && <p className="quiz-message">{message}</p>}

            {isGameOver && (
              <div className="end-block">
                <p>Final result</p>
                <p>Movies found : {usedFilms.length}</p>
                <p>Total score : {score}</p>

                <button className="restart-button" onClick={handleRestart}>
                  <RotateCcw size={20} />
                  <span>Play again</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuessTheMovie;
