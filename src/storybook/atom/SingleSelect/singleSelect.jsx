import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./style.scss";
import Icon from "../Icon/icon";

const SingleSelect = ({ options = [], value, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState();

  const ref = useRef(null);

  useEffect(() => {
    setSelected(value || options?.[0]);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className={classNames("dropdown")} ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={classNames("dropdown__active")}
      >
        <label>{selected ? selected?.label : placeholder}</label>
        <Icon
          iconName={"arrow"}
          className={classNames("", {
            opened: Boolean(isOpen),
          })}
        />
      </div>
      {isOpen && (
        <div className={classNames("dropdown__list")}>
          {options?.length > 0 ? (
            options?.map((item, index) => (
              <p
                key={index}
                className={classNames("dropdown__list--item")}
                onClick={() => handleSelect(item)}
              >
                {item?.label}
              </p>
            ))
          ) : (
            <p className={classNames("dropdown__list--item")}>
              No Options Found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleSelect;
