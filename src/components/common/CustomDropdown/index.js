import React, { useState } from "react";
import "./style.scss";
import arrowDown from "../../../assets/images/arrow_black.svg";
import arrowDownLight from "../../../assets/images/arrow_light.svg";
import { FILTER_SORT_BY } from "../../../constant/marketplace";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const CustomDropdown = ({
  data,
  title,
  onSelect,
  isSortBy,
  onSelectSortBy,
}) => {
  const theme = useSelector(selectTheme);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const isDark = theme === "dark";

  const onToggleDropdown = () => {
    if (isSortBy) onSelectSortBy(FILTER_SORT_BY);
    setIsOpen(!isOpen);
  };

  const onSelectItem = (item) => {
    onSelect(item);
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div
      className={`customDropdown ${
        isSortBy ? "customDropdown__sortBy" : ""
      } z-50`}
    >
      {isSortBy ? (
        <div
          className={`navbar__filtersItems--criterion ${
            isOpen ? "navbar__filtersItems--criterionOpen" : ""
          }`}
          onClick={onToggleDropdown}
        >
          {selectedItem?.label
            ? selectedItem?.label
            : selectedItem
            ? selectedItem
            : title}
          <img src={isDark ? arrowDownLight : arrowDown} alt={""} />
        </div>
      ) : (
        <div
          className={`customDropdown__mainBlock ${
            isOpen ? "customDropdown__mainBlock--open" : ""
          }`}
          onClick={onToggleDropdown}
        >
          {selectedItem?.label
            ? selectedItem?.label
            : selectedItem
            ? selectedItem
            : title}
          <img src={isDark ? arrowDownLight : arrowDown} alt={""} />
        </div>
      )}

      {isOpen && (
        <div className="customDropdown__dropdown">
          {data?.map((item, key) => (
            <p key={key} onClick={() => onSelectItem(item)}>
              {item?.label ? item?.label : item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
