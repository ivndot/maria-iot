// axios
const axios = require("axios").default;

// API
//const API = "http://localhost:3000/api";
const API = "https://api-iot-maria.herokuapp.com/api";

/**
 * Function to get the temperature of the sensor
 * @returns A string with the temperature in celsius degrees
 */
const getTemperature = async () => {
  try {
    const response = await axios.get(`${API}/temp`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Function to get the mode of the iot device
 * @returns A string with the mode in the form `fanMode:fanStatus:fanSpeed:led1Status:led2Status`
 */
const getModeIoT = async () => {
  try {
    const response = await axios.get(`${API}/mode`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Function to set the mode of the iot device
 * @param {*} iotMode The iot object configuration mode
 */
const setModeIoT = async (iotMode) => {
  // convert js object to json
  const iotModeConfig = JSON.stringify(iotMode);
  console.log(iotModeConfig);
  try {
    await axios.put(`${API}/mode`, iotModeConfig, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export { getTemperature, getModeIoT, setModeIoT };
