import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import "./style.scss";
import Icon from "../Icon/icon";
import useWindowDimensions from "hooks/useWidowDimensions";

const Modal = ({
  custom,
  withoutBlur,
  isModalOpen,
  handleClose = () => {},
  children,
  withCrossIcon = false,
  isDark = true,
  isFullModalBg = false,
  className,
  bgImg,
}) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(isModalOpen ? isModalOpen : false);
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 640;

  const onClose = () => {
    setIsOpen(false);
    handleClose();
  };

  useEffect(() => {
    isModalOpen && setIsOpen(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setIsOpen(false);
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return ReactDOM.createPortal(
    <>
      {/* <button onClick={() => setIsOpen(!isOpen)}>Open</button> */}
      {isOpen && (
        <div
          className={classNames("modal__overview", {
            blurredModal: !withoutBlur,
          })}
        >
          <div
            ref={ref}
            className={classNames("", {
              "modal__overview--wrapper": !isMobile,
              "modal__overview--wrapper--mobile": isMobile,
              [className]: Boolean(className),
            })}
            style={{
              backgroundImage: bgImg ? `url(${bgImg})` : "none",
            }}
          >
            {withCrossIcon && !isMobile && (
              <div
                onClick={onClose}
                className={`modal__exit ${
                  isFullModalBg ? "modal__exit--noPadding" : ""
                }`}
              >
                <Icon
                  iconName={isDark ? "exitDark" : "exitLight"}
                  className="modal__exit--line"
                />
                <Icon iconName={"close"} className="modal__exit--bg" />
              </div>
            )}
            {isMobile && !custom && (
              <div className="BarAccordian">
                <div></div>
              </div>
            )}
            {children}
          </div>
        </div>
      )}
    </>,
    document?.getElementById("modal-root")
  );
};

export default Modal;
