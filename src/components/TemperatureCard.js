import React from "react";
// styles
import "../css/TemperatureCard.css";

const TemperatureCard = ({ temp }) => {
  return (
    <div className="temp-card">
      <div className="temp-card__title">
        <p className="title">Temperatura</p>
      </div>
      <div className="temp-card__data">
        {/* icon */}
        {temp >= 50 ? (
          <i className="fa-solid fa-fire-flame-curved icon--warm"></i>
        ) : (
          <i className="fa-solid fa-snowflake icon--cold"></i>
        )}
        {/* temperature */}
        <span className="temperature">{`${temp} °C`}</span>
      </div>
    </div>
  );
};

export default TemperatureCard;
