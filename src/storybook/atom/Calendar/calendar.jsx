import React from "react";
import "./style.scss";
import { DayPicker } from "react-day-picker";

const Calendar = ({ isOpen, selectedDate, handleDateChange }) => {
  const today = new Date();
  return (
    <div className="listingTab__datePicker">
      <DayPicker
        initialFocus={isOpen}
        mode="range"
        defaultMonth={today}
        selected={selectedDate}
        onSelect={handleDateChange}
      />
    </div>
  );
};

export default Calendar;
