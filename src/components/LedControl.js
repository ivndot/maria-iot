import React from "react";
// components
import SwitchButton from "./SwitchButton";

const LedControl = ({ led1Status, led2Status, handleLED1, handleLED2 }) => (
  <>
    {/* LED 1 */}
    <SwitchButton title={"LED Verde"} buttonState={led1Status} handleSwitch={handleLED1} />
    {/* LED 2 */}
    <SwitchButton title={"LED Amarillo"} buttonState={led2Status} handleSwitch={handleLED2} />
  </>
);

export default LedControl;
