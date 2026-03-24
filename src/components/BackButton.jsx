// BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({
  label = "Back", // Texte du bouton
  fallback = "/", // Route si pas d'historique
  style = {}, // Styles supplémentaires
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
    <button
      type="button"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        background: "#eee",
        border: "1px solid #ccc",
        borderRadius: "5px",
        ...style,
      }}
    >
      ← {label}
    </button>
  );
};

export default BackButton;
