import React from "react";
import "./style.scss";

const Timer = ({ hours, minutes, seconds, days }) => {
  return (
    <div className="timer">
      <div className="timer__element">
        <div className="timer__element--count">{days > 0 ? days : "00"}</div>
        <div className="timer__element--label">Days</div>
      </div>
      <div className="timer__element">
        <div className="timer__element--count">{hours > 0 ? hours : "00"}</div>
        <div className="timer__element--label">hrs</div>
      </div>
      <div className="timer__element">
        <div className="timer__element--count">
          {minutes > 0 ? minutes : "00"}
        </div>
        <div className="timer__element--label">mins</div>
      </div>
      <div className="timer__element">
        <div className="timer__element--count">
          {seconds > 0 ? seconds : "00"}
        </div>
        <div className="timer__element--label">secs</div>
      </div>
    </div>
  );
};

export default Timer;
