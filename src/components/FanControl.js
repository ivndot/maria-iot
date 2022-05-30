import React from "react";
// components
import FanModeCard from "./FanModeCard";
// descriptions
const autoDescription = "Enciende el ventilador si la temperatura es mayor o igual a los 50 °C";
const manualDescription = "Enciende/Apaga el ventilador o controla su velocidad";

const FanControl = ({ fanMode, handleFanMode }) => (
  <>
    <FanModeCard
      id={"a"}
      mode={"auto"}
      title={"Automático"}
      description={autoDescription}
      isSelected={fanMode === "a" ? true : false}
      handleFanMode={handleFanMode}
    />
    <FanModeCard
      id={"m"}
      mode={"manual"}
      title={"Manual"}
      description={manualDescription}
      isSelected={fanMode === "m" ? true : false}
      handleFanMode={handleFanMode}
    />
  </>
);

export default FanControl;
