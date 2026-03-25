// BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({
  label = "Back", // Texte du bouton
  fallback = "/", // Route si pas d'historique
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1); // Retour arrière dans l'historique
      console.log("BackButton: navigation back");
    } else {
      navigate(fallback); // Route fallback si pas d'historique
      console.log(`BackButton: no history, redirect to ${fallback}`);
    }
  };

  return (
    <div id="back-button">
      <button className="back-button" type="button" onClick={handleClick}>
        <span className="arrow">←</span>
        <span className="label">{label}</span>
      </button>
    </div>
  );
};

export default BackButton;
