import React from "react";
// styles
import "../css/Loader.css";
// loader
import { Jelly } from "@uiball/loaders";

const Loader = () => (
  <div className="loader-container">
    <Jelly size={100} speed={0.9} color="#0c6697" />
    <p className="loader__text">Cargando...</p>
  </div>
);

export default Loader;
