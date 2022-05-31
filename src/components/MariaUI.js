import React from "react";
// styles
import "../css/MariaUI.css";
// loader
import { Waveform } from "@uiball/loaders";

const MariaUI = ({ transcript }) => (
  <div className="mariaUI-container">
    {/* loader */}
    <Waveform size={50} lineWeight={3.5} speed={1} color="black" />
    {/* transcript */}
    <p className="mariaUI--transcript">{transcript}</p>
  </div>
);

export default MariaUI;
