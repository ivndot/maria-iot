import React from "react";
// styles
import "../css/SpeedButton.css";

const SpeedButton = ({ title, speed, handleSpeed }) => (
  <div className="speed-button">
    <h3 className="speed-button--title">{title}</h3>
    <div className="speed-button--card">
      <button
        id="speedSlow"
        type="button"
        className={speed === "l" ? "button-speed selected" : "button-speed"}
        onClick={handleSpeed}
      >
        Lento
      </button>
      <button
        id="speedFast"
        type="button"
        className={speed === "f" ? "button-speed selected" : "button-speed"}
        onClick={handleSpeed}
      >
        R&aacute;pido
      </button>
    </div>
  </div>
);

export default SpeedButton;
