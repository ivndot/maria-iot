import React, { useEffect, useState } from "react";
// styles
import "./css/App.css";
// components
import Navbar from "./components/Navbar";
import TemperatureCard from "./components/TemperatureCard";
import FanControl from "./components/FanControl";
import SwitchButton from "./components/SwitchButton";
import LedControl from "./components/LedControl";
import CallAssistantButton from "./components/CallAssistantButton";
import Loader from "./components/Loader";
import MariaUI from "./components/MariaUI";
// util
import { getModeIoT, setModeIoT } from "./util/requests";
import { disconnectSockets, initSockets } from "./util/sockets";
// speech recognition
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const App = () => {
  /*
  ======================================================
                         STATES
  ======================================================
*/
  const [isMariaOn, setIsMariaOn] = useState(false);
  const [isMariaListen, setIsMariaListen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [temperature, setTemperature] = useState(20);
  const [fanMode, setFanMode] = useState();
  const [fanStatus, setFanStatus] = useState();
  const [fanSpeed, setFanSpeed] = useState();
  const [led1Status, setLed1Status] = useState();
  const [led2Status, setLed2Status] = useState();

  /*
  ======================================================
                    SPEECH RECOGNITION
  ======================================================
*/
  const commands = [
    {
      command: "ventilador modo automático",
      callback: () => {
        handleFanMode(undefined, "a");
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "ventilador modo manual",
      callback: () => {
        handleFanMode(undefined, "m");
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "encender ventilador",
      callback: () => {
        handleFanSwitch(undefined, 1);
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "apagar ventilador",
      callback: () => {
        handleFanSwitch(undefined, 0);
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "velocidad del ventilador lenta",
      callback: () => {
        handleFanSpeed(undefined, "l");
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "velocidad del ventilador rápida",
      callback: () => {
        handleFanSpeed(undefined, "f");
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "encender led verde",
      callback: () => {
        handleLED1(undefined, 1);
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "apagar led verde",
      callback: () => {
        handleLED1(undefined, 0);
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "encender led amarillo",
      callback: () => {
        handleLED2(undefined, 1);
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
    {
      command: "apagar led amarillo",
      callback: () => {
        handleLED2(undefined, 0);
        setIsMariaListen(false);
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    },
  ];
  const { listening, transcript, resetTranscript, isMicrophoneAvailable, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands });

  /*
  ======================================================
                          EFECT
  ======================================================
*/
  useEffect(() => {
    // get the mode of the iot devices
    const getInitMode = async () => {
      try {
        // get init mode
        const modeIoT = await getModeIoT();
        // update states of mode
        setFanMode(modeIoT.substring(0, 1));
        setFanStatus(parseInt(modeIoT.substring(2, 3)));
        setFanSpeed(modeIoT.substring(4, 5));
        setLed1Status(parseInt(modeIoT.substring(6, 7)));
        setLed2Status(parseInt(modeIoT.substring(8, 9)));
        // update isLoading state
        setIsLoading(false);
        console.log("Init render");
      } catch (error) {
        console.error(error);
      }
    };
    getInitMode();

    // init sockets
    initSockets(handleTemperature);

    // clean up sockets instance and the events listeners
    return () => disconnectSockets();
  }, []);

  /*
  ======================================================
                        HANDLERS
  ======================================================
*/
  /**
   * Function to update the temperature value
   * @param {number} temperature
   */
  const handleTemperature = (temperature) => {
    // update temperature
    setTemperature(temperature);
  };

  /**
   * Function to control the mode status
   * @param {EventListener} e
   * @param {string} mode The mode of the fan
   */
  const handleFanMode = async (e, mode) => {
    const fan_mode = e === undefined ? mode : e.currentTarget.id;
    // update fan mode
    setFanMode(fan_mode);
    // send mode to api
    const iotMode = { modeFan: fan_mode, statusFan: fanStatus, speedFan: fanSpeed, led1Status, led2Status };
    await setModeIoT({ iotMode });
  };

  /**
   * Function to control the fan status
   * @param {EventListener} e
   * @param {number} status The status of the fan
   */
  const handleFanSwitch = async (e, status) => {
    const fan_status = e === undefined ? status : e.target.checked ? 1 : 0;
    // update fan state
    setFanStatus(fan_status);
    // send mode to api
    const iotMode = { modeFan: fanMode, statusFan: fan_status, speedFan: fanSpeed, led1Status, led2Status };
    await setModeIoT({ iotMode });
  };

  /**
   * Function to control the speed status
   * @param {EventListener} e
   * @param {string} speed The speed of the fan
   */
  const handleFanSpeed = async (e, speed) => {
    //get id of the selected button
    const fan_speed = e === undefined ? speed : e.target.id === "speedSlow" ? "l" : "f";

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
   * @param {number} status The status of the led 1
   */
  const handleLED1 = async (e, status) => {
    const led1_status = e === undefined ? status : e.target.checked ? 1 : 0;
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
   * @param {number} status The status of the led 2
   */
  const handleLED2 = async (e, status) => {
    const led2_status = e === undefined ? status : e.target.checked ? 1 : 0;
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

  /**
   * Function to handle the maria assitant status `on/off`
   * @param {EventListener} e
   * @returns null
   */
  const handleMariaStatus = (e) => {
    if (isMariaOn) {
      // turn off maria
      setIsMariaOn(false);
      // stop listening
      SpeechRecognition.stopListening();
      return;
    }

    // turn on maria
    setIsMariaOn(true);

    // validate if the browser supports speech recognition
    if (!browserSupportsSpeechRecognition) {
      alert("Tu navegador no soporta el reconocimiento de voz");
    }

    // start listening
    SpeechRecognition.startListening({ continuous: true, language: "es-MX" });
    // validate if the permission of the microfone is set
    if (!isMicrophoneAvailable) {
      alert("Por favor, habilita los permisos del micrófono");
    }
  };

  /**
   * Function to show / hide the UI of maria and reset the state of transcript
   */
  const handleSpeechRecognition = () => {
    if (listening) {
      // define pattern to search
      const pattern = /(.*)(María|maría)(.*)/i;
      if (pattern.exec(transcript)) {
        // user said the word `maria`
        setIsMariaListen(true);
        //console.log("YO DIGO --> ", transcript);
        resetTranscript();
      }
    }
    console.log("no escucho");
  };

  handleSpeechRecognition();

  /*
  ======================================================
                  RENDER LOADER COMPONENT
  ======================================================
*/
  if (isLoading) {
    return <Loader />;
  }

  /*
  ======================================================
                RENDER MARIAUI COMPONENT
  ======================================================
*/
  if (isMariaListen) {
    return <MariaUI transcript={transcript} />;
  }

  /*
  ======================================================
                  RENDER APP COMPONENT
  ======================================================
*/
  return (
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
      <CallAssistantButton isMariaOn={isMariaOn} handleMariaStatus={handleMariaStatus} />
    </>
  );
};

export default App;
