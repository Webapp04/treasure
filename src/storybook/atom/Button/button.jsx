import React from "react";
import classNames from "classnames";
import "./style.scss";
import Icon, { IconsNames } from "../Icon/icon";

export const ButtonCategoryTypes = {
  primary: "primary",
  secondary: "secondary",
  outlined: "outlined",
  shadow: "shadow",
};

export const ButtonSizes = {
  small: "small",
  medium: "medium",
  large: "large",
};

const Button = ({
  className,
  variant,
  size,
  label,
  iconPosition,
  disabled,
  iconName,
  onClick,
  ...props
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames("button_wrapper", {
        buttonPrimary: variant === ButtonCategoryTypes.primary,
        buttonSecondary: variant === ButtonCategoryTypes.secondary,
        buttonOutlined: variant === ButtonCategoryTypes.outlined,
        buttonShadow: variant === ButtonCategoryTypes.shadow,
        buttonSmall: size === ButtonSizes.small,
        buttonMedium: size === ButtonSizes.medium,
        buttonLarge: size === ButtonSizes.large,
        buttonDisabled: disabled,
        [className]: Boolean(className),
      })}
      disabled={disabled}
      {...props}
    >
      {iconPosition === "start" && iconName && (
        <Icon iconName={iconName} className="iconStyle" />
      )}
      {label ? label : ""}
      {iconPosition === "end" && iconName && (
        <Icon iconName={iconName} className="iconStyle" />
      )}
    </button>
  );
};

export default Button;
