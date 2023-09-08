import React from "react";
import classNames from "classnames";
import "./style.scss";

export const TooltipPosition = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
};

const Tooltip = ({
  title,
  position = TooltipPosition.top,
  className,
  children,
}) => {
  return (
    <div
      className={classNames("customTooltipWrapper", {
        [className]: Boolean(className),
      })}
    >
      {position === TooltipPosition.top && (
        <span tooltip={title}> {children}</span>
      )}
      {position === TooltipPosition.left && (
        <span tooltip={title} flow="left">
          {children}
        </span>
      )}
      {position === TooltipPosition.right && (
        <span tooltip={title} flow="right">
          {children}
        </span>
      )}
      {position === TooltipPosition.bottom && (
        <span tooltip={title} flow="down">
          {children}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
