import React from "react";
// styles
import "../css/CallAssistantButton.css";

const CallAssistantButton = ({ isMariaOn, handleMariaStatus }) => (
  <button type="button" className="assistantButton" onClick={handleMariaStatus}>
    {isMariaOn ? <i className="fa-solid fa-microphone-slash"></i> : <i className="fa-solid fa-microphone"></i>}
  </button>
);

export default CallAssistantButton;
