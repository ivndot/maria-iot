import React, { useEffect, useState } from "react";
// styles
import "./css/App.css";
// components
import Navbar from "./components/Navbar";
import TemperatureCard from "./components/TemperatureCard";
import FanControl from "./components/FanControl";
import SwitchButton from "./components/SwitchButton";
import LedControl from "./components/LedControl";
import { getModeIoT, getTemperature, setModeIoT } from "./util/requests";
// loader
import { Jelly } from "@uiball/loaders";

const App = () => {
  /*
  ======================================================
                         STATES
  ======================================================
*/

  const [isLoading, setIsLoading] = useState(true);
  const [temperature, setTemperature] = useState(20);
  const [fanMode, setFanMode] = useState();
  const [fanStatus, setFanStatus] = useState();
  const [fanSpeed, setFanSpeed] = useState();
  const [led1Status, setLed1Status] = useState();
  const [led2Status, setLed2Status] = useState();

  /*
  ======================================================
                          EFECT
  ======================================================
*/
  useEffect(() => {
    // get the mode of the iot devices
    const getInitModeAndTemperature = async () => {
      try {
        // get init mode
        const modeIoT = await getModeIoT();
        // get init temperature
        const temp = await getTemperature();
        // update states of mode
        setFanMode(modeIoT.substring(0, 1));
        setFanStatus(parseInt(modeIoT.substring(2, 3)));
        setFanSpeed(modeIoT.substring(4, 5));
        setLed1Status(parseInt(modeIoT.substring(6, 7)));
        setLed2Status(parseInt(modeIoT.substring(8, 9)));
        // update state of temperature
        setTemperature(temp.value_sensor);
        // update isLoading state
        setIsLoading(false);
        console.log("Init render");
      } catch (error) {
        console.error(error);
      }
    };
    getInitModeAndTemperature();
  }, []);

  /*
  ======================================================
              FETCH TEMPERATURE EVERY 2 SECONDS
  ======================================================
*/
  setInterval(async () => {
    try {
      // get temperature
      const temp = await getTemperature();
      // update temp state
      setTemperature(temp.value_sensor);
    } catch (error) {
      console.error(error);
    }
  }, 2000);

  /*
  ======================================================
                        HANDLERS
  ======================================================
*/
  /**
   * Function to control the mode status
   * @param {EventListener} e
   */
  const handleFanMode = async (e) => {
    const fan_mode = e.currentTarget.id;
    // update fan mode
    setFanMode(fan_mode);
    // send mode to api
    const iotMode = { modeFan: fan_mode, statusFan: fanStatus, speedFan: fanSpeed, led1Status, led2Status };
    await setModeIoT({ iotMode });
  };

  /**
   * Function to control the fan status
   * @param {EventListener} e
   */
  const handleFanSwitch = async (e) => {
    const fan_status = e.target.checked ? 1 : 0;
    // update fan state
    setFanStatus(fan_status);
    // send mode to api
    const iotMode = { modeFan: fanMode, statusFan: fan_status, speedFan: fanSpeed, led1Status, led2Status };
    await setModeIoT({ iotMode });
  };

  /**
   * Function to control the speed status
   * @param {EventListener} e
   */
  const handleFanSpeed = async (e) => {
    //get id of the selected button
    const fan_speed = e.target.id === "speedSlow" ? "l" : "f";

    if (fan_speed === "l") {
      //update fan speed
      setFanSpeed(fan_speed);
      // send mode to api
      const iotMode = { modeFan: fanMode, statusFan: fanStatus, speedFan: fan_speed, led1Status, led2Status };
      await setModeIoT({ iotMode });
      // add and remove css classes
      document.getElementById("speedSlow").classList.add("selected");
      document.getElementById("speedFast").classList.remove("selected");
    }
    if (fan_speed === "f") {
      //update fan speed
      setFanSpeed(fan_speed);
      // send mode to api
      const iotMode = { modeFan: fanMode, statusFan: fanStatus, speedFan: fan_speed, led1Status, led2Status };
      await setModeIoT({ iotMode });
      // add and remove css classes
      document.getElementById("speedFast").classList.add("selected");
      document.getElementById("speedSlow").classList.remove("selected");
    }
    console.log("Velocidad ventilador -> ", fan_speed);
  };

  /**
   * Function to control the status of LED 1
   * @param {EventListener} e
   */
  const handleLED1 = async (e) => {
    const led1_status = e.target.checked ? 1 : 0;
    // update led 1 status
    setLed1Status(led1_status);
    // send mode to api
    const iotMode = {
      modeFan: fanMode,
      statusFan: fanStatus,
      speedFan: fanSpeed,
      led1Status: led1_status,
      led2Status,
    };
    await setModeIoT({ iotMode });
  };

  /**
   * Function to control the status of LED 2
   * @param {EventListener} e
   */
  const handleLED2 = async (e) => {
    const led2_status = e.target.checked ? 1 : 0;
    // update led 2 status
    setLed2Status(led2_status);
    // send mode to api
    const iotMode = {
      modeFan: fanMode,
      statusFan: fanStatus,
      speedFan: fanSpeed,
      led1Status,
      led2Status: led2_status,
    };
    await setModeIoT({ iotMode });
  };

  /*
  ======================================================
                       COMPONENT
  ======================================================
*/
  return (
    <>
      {!isLoading ? (
        /*APP*/
        <>
          <Navbar />
          <div className="container">
            {/* TEMPERATURE CARD */}
            <div className="temp-container">
              <TemperatureCard temp={temperature} />
            </div>
            {/* CONTROLS */}
            <div className="control-container">
              {/* FAN CONTROL */}
              <div className="fan-control">
                {/* Title */}
                <h2 className="fan-control__title">
                  <i className="fa-solid fa-fan title__icon"></i>
                  <span className="title__info">Ventilador</span>
                </h2>
                {/* Description */}
                <p className="fan-control__description">Escoge el modo del ventilador</p>
                {/* Control the fan mode */}
                <div className="fan-control__mode">
                  <FanControl
                    fanMode={fanMode}
                    fanStatus={fanStatus}
                    fanSpeed={fanSpeed}
                    handleFanMode={handleFanMode}
                    handleFanSwitch={handleFanSwitch}
                    handleFanSpeed={handleFanSpeed}
                  />
                </div>
                {/* State and speed */}
                {fanMode === "m" ? (
                  <div className="fan-mode__manual">
                    {/* State */}
                    <SwitchButton
                      isFanStatus
                      title={"Estado"}
                      buttonState={fanStatus}
                      speedFan={fanSpeed}
                      handleSwitch={handleFanSwitch}
                      handleSpeed={handleFanSpeed}
                    />
                  </div>
                ) : null}
              </div>
              {/* SEPARATOR */}
              <div className="separator"></div>
              {/* LED CONTROL */}
              <div className="led-control">
                {/* Title */}
                <h2 className="led-control__title">
                  <i className="fa-solid fa-lightbulb title__icon"></i>
                  <span className="title__info">LED's</span>
                </h2>
                <div className="led-control__content">
                  <LedControl
                    led1Status={led1Status}
                    led2Status={led2Status}
                    handleLED1={handleLED1}
                    handleLED2={handleLED2}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /*LOADER*/
        <div className="loader-container">
          <Jelly size={100} speed={0.9} color="#0c6697" />
          <p className="loader__text">Cargando...</p>
        </div>
      )}
    </>
  );
};

export default App;
