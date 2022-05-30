import React from "react";
// styles
import "../css/FanModeCard.css";

const FanModeCard = ({ id, mode, title, description, isSelected, handleFanMode }) => (
  <div
    className={isSelected ? "fan-mode-card fan-mode-cardSelected" : "fan-mode-card"}
    id={id}
    onClick={handleFanMode}
  >
    {/* Title */}
    <h3 className="fan-mode-card--title">{title}</h3>
    {/* Icon */}
    {mode === "auto" ? (
      <i className="fa-solid fa-robot fan-mode-card--icon"></i>
    ) : (
      <i className="fa-solid fa-hand-back-fist fan-mode-card--icon"></i>
    )}
    {/* Description */}
    <p className="fan-mode-card--description">{description}</p>
  </div>
);

export default FanModeCard;
