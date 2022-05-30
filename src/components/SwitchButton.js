import React from "react";
// styles
import "../css/SwitchButton.css";
// components
import SpeedButton from "./SpeedButton";

const SwitchButton = ({ isFanStatus, title, buttonState, speedFan, handleSwitch, handleSpeed }) => {
  // switch button for led's
  if (!isFanStatus) {
    return (
      <div className="switch-button">
        <h2 className="switch-button--title">{title}</h2>
        <div className="switch-button--card">
          {/* State */}
          <h3 className="card--state">{buttonState === 0 ? "Apagado" : "Encendido"}</h3>
          {/* Switch button */}
          <label className="card--button">
            <input type="checkbox" onClick={handleSwitch} defaultChecked={buttonState === 1 ? true : false} />
            <span className={buttonState === 1 ? "slider selectedSlider" : "slider"}>
              <span
                className={buttonState === 1 ? "sliderButton selectedSliderButton" : "sliderButton"}
              ></span>
            </span>
          </label>
        </div>
      </div>
    );
  }
  // switch button for fan
  return (
    <>
      <div className="switch-button">
        <h2 className="switch-button--title">{title}</h2>
        <div className="switch-button--card">
          {/* State */}
          <h3 className="card--state">{buttonState === 0 ? "Apagado" : "Encendido"}</h3>
          {/* Switch button */}
          <label className="card--button">
            <input
              type="checkbox"
              name="fanStatus"
              onClick={handleSwitch}
              defaultChecked={buttonState === 1 ? true : false}
            />
            <span className={buttonState === 1 ? "slider selectedSlider" : "slider"}>
              <span
                className={buttonState === 1 ? "sliderButton selectedSliderButton" : "sliderButton"}
              ></span>
            </span>
          </label>
        </div>
      </div>
      {/* Speed */}
      {buttonState === 1 ? (
        <SpeedButton title={"Velocidad"} speed={speedFan} handleSpeed={handleSpeed} />
      ) : null}
    </>
  );
};

export default SwitchButton;
