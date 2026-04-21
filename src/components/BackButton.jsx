import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", fallback = "/", className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <div className={`back-button-wrapper ${className}`}>
      <button className="back-button" type="button" onClick={handleClick}>
        <span className="arrow">←</span>
        <span className="label">{label}</span>
      </button>
    </div>
  );
};

export default BackButton;
