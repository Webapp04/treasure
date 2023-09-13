import React from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";

const TimeInput = ({
  timeValue,
  onChangeTime,
  onChangeTimesOfDay,
  timesOfDay,
}) => {
  const location = useLocation();
  const isCreatePage = location?.pathname?.includes("create");

  return (
    <div className="listingTab__startDate--time">
      <input
        placeholder={"00:00 pm"}
        type="time"
        className={`modal__input ${
          isCreatePage ? "modal__input--createPage" : ""
        }`}
        value={timeValue}
        onChange={onChangeTime}
      />
      <p
        onClick={onChangeTimesOfDay}
        className={`listingTab__startDate--timeOfDay ${
          isCreatePage ? "listingTab__startDate--timeOfDay__createPage" : ""
        }`}
      >
        {timesOfDay ? "pm" : "am"}
      </p>
    </div>
  );
};

export default TimeInput;
