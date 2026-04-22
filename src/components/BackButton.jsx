import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = ({ label = "Back", fallback = "/" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  // ✅ condition simple
  const isClothingStore = location.pathname === "/clothing-store";

  return (
    <div className={`back-button-wrapper ${isClothingStore ? "clothing" : ""}`}>
      <button className="back-button" type="button" onClick={handleClick}>
        <span className="arrow">←</span>
        <span className="label">{label}</span>
      </button>
    </div>
  );
};

export default BackButton;
