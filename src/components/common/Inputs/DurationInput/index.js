import React from "react";
import arrowWhiteImg from "../../../../assets/images/singleNFTPage/arrowDownWhite.svg";
import { DURATION_DROPDOWN } from "../../../../constant/singleNFTPage";
import { useLocation } from "react-router-dom";
import arrowBlackImg from "../../../../assets/images/singleNFTPage/arrowDownBlack.svg";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const DurationInput = ({
  selectedDuration,
  onChangeDuration,
  isOpen,
  onClose,
  onOpen,
  handleCalendarClose,
}) => {
  const location = useLocation();
  const theme = useSelector(selectTheme);
  const isCreatePage = location?.pathname?.includes("create");
  const isDark = theme === "dark";

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
      <img
        src={isDark ? arrowWhiteImg : arrowBlackImg}
        alt={""}
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
