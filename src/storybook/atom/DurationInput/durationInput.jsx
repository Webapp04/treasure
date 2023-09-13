import React from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { DURATION_DROPDOWN } from "constant/singleNFTPage";
import Icon from "../Icon/icon";

const DurationInput = ({
  isDark,
  selectedDuration,
  onChangeDuration,
  isOpen,
  onClose,
  onOpen,
  handleCalendarClose,
}) => {
  const location = useLocation();
  const isCreatePage = location?.pathname?.includes("create");

  const showDurationList = () => {
    handleCalendarClose();
    isOpen ? onClose() : onOpen();
  };
  return (
    <div className={"listingTab__startDate--input"}>
      <input
        placeholder={"Duration"}
        type={"text"}
        className={`modal__input 
            ${isOpen ? "listingTab__durationInput" : ""} 
            ${isCreatePage ? "modal__input--createPage" : ""} 
            ${
              isCreatePage && isOpen
                ? "listingTab__durationInput--createPage"
                : ""
            }`}
        onClick={showDurationList}
        value={
          selectedDuration?.label ||
          `${selectedDuration ? selectedDuration + " Days" : "Duration"}`
        }
      />
      <Icon
        iconName={isDark ? "arrowDownWhite" : "arrowDownBlack"}
        onClick={showDurationList}
        className={`listingTab__startDate--arrow ${
          isOpen ? "listingTab__startDate--open" : ""
        }`}
      />

      {isOpen && (
        <div
          className={`listingTab__durationList ${
            isOpen ? "listingTab__durationList--open" : ""
          } ${isCreatePage ? "listingTab__durationList--createPage" : ""}`}
        >
          {DURATION_DROPDOWN.map((item, key) => (
            <p
              key={key}
              className={`${
                item?.value === selectedDuration?.value
                  ? "listingTab__durationList--active"
                  : ""
              }`}
              onClick={() => onChangeDuration(item)}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DurationInput;
