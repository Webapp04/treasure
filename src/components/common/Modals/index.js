import React, { useEffect } from "react";
import useWindowDimensions from "../../../hooks/useWidowDimensions";
import { customStylesDark } from "./customDarkModalStyles";
import { customStyles } from "./custumModalStyles";
import Modal from "react-modal";
import exitIconLight from "../../../assets/images/exit-icon-light.svg";
import exitIconDark from "../../../assets/images/exit-icon-dark.svg";
import exitIconBg from "../../../assets/images/close_bg.svg";
import { customStylesMobile } from "components/NavBarEditModeMobile/stylesMobile";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const ModalLayout = ({
  isOpen,
  onClose,
  maxWidth,
  maxHeight,
  children,
  withCrossIcon,
  padding,
  isFullModalBg,
  height,
  isCloserView,
  style,
}) => {
  const theme = useSelector(selectTheme);
  const isDark = theme === "light";
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 450;

  const modalStyles = isMobile
    ? {
        ...customStylesMobile,
        content: {
          ...customStylesMobile.content,
          background: isDark ? "#081326" : "rgba(236, 241, 249, 0.9)",
          overflow: "scroll",
          ...style,
        },
      }
    : {
        ...customStylesDark,
        content: {
          ...customStylesDark?.content,
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          padding: padding,
          height: height ? height : "100%",
          borderRadius: isCloserView ? "0px" : "8px",
          border: isCloserView ? "none" : "1px solid rgb(147, 163, 248)",
          ...style,
        },
      };
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div className="modal__wrapper">
        {isMobile && (
          <div className="flex justify-center mb-[32px]">
            <div className="w-[70px] h-[4px] bg-[#93A3F8] opacity-30 rounded-[24px]"></div>
          </div>
        )}
        {withCrossIcon && !isMobile && (
          <div
            className={`modal__exit ${
              isFullModalBg ? "modal__exit--noPadding" : ""
            }`}
            onClick={onClose}
          >
            <img
              src={isDark ? exitIconDark : exitIconLight}
              alt={""}
              className="modal__exit--line"
            />
            <img src={exitIconBg} alt={"exit"} className="modal__exit--bg" />
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
};

export default ModalLayout;
