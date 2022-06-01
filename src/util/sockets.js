// socket.io
import { io } from "socket.io-client";
// API URL
import API_URL from "./API";
// init
const socket = io(API_URL);

/**
 * Function to stablish a socket.io connection and to listen for the `server:temperature` event
 * @param {callback} handleTemperature The callback function to update the temperature state
 */
const initSockets = (handleTemperature) => {
  // init socket.io
  socket.on("connect", () => {
    console.log("Socketid --> ", socket.id);
    // listener for change in the temperature event
    socket.on("server:temperature", (temp) => {
      console.log("Temperature from the server --> ", temp);
      // update temperature state
      handleTemperature(temp);
    });
  });
};

/**
 * Function to delete the listener for the event `server:temperature` and remove connection of socket.io
 */
const disconnectSockets = () => {
  socket.off("server:temperature");
  socket.disconnect();
};

export { initSockets, disconnectSockets };
