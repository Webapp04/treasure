import React from "react";
import "./style.scss";

const InputRange = ({ scaleValue, inputBgSize, handleChange }) => {
  return (
    <div className="inputRange">
      <input
        type="range"
        min={120}
        max={315}
        value={scaleValue}
        step={13}
        style={{ backgroundSize: inputBgSize }}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

export default InputRange;
