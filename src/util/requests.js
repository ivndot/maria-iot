// axios
const axios = require("axios").default;

// API URL
import API_URL from "./API";

/**
 * Function to get the temperature of the sensor
 * @returns A string with the temperature in celsius degrees
 */
const getTemperature = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/temp`);
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
    const response = await axios.get(`${API_URL}/api/mode`);
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
    await axios.put(`${API_URL}/api/mode`, iotModeConfig, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export { getTemperature, getModeIoT, setModeIoT };
