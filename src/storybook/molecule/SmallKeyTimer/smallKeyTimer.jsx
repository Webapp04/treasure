import React, { useMemo } from "react";
import "./style.scss";

const SmallKeyTimer = ({ days, hours, minutes, seconds, isActive }) => {
  return useMemo(
    () => (
      <div
        className={`smallKeyTimer ${isActive ? "smallKeyTimer__isActive" : ""}`}
      >
        <div>{days > 0 ? days : "00"}</div>
        <div>:</div>

        <div>{hours > 0 ? hours : "00"}</div>
        <div>:</div>

        <div>{minutes > 0 ? minutes : "00"}</div>
        <div>:</div>

        <div>{seconds > 0 ? seconds : "00"}</div>
      </div>
    ),
    [days, hours, minutes, seconds]
  );
};

export default SmallKeyTimer;
