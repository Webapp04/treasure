import React from "react";
import classNames from "classnames";
import "./style.scss";

export const LabelCategoryTypes = {
  primary: "primary",
  secondary: "secondary",
};

export const LabelSizes = {
  small: "small",
  medium: "medium",
  large: "large",
  extraLarge: "extraLarge",
};

const Label = ({ className, variant, size, label, ...props }) => {
  return (
    <p
      className={classNames("label", {
        labelPrimary: variant === LabelCategoryTypes.primary,
        labelSecondary: variant === LabelCategoryTypes.secondary,
        labelSmall: size === LabelSizes.small,
        labelMedium: size === LabelSizes.medium,
        labelLarge: size === LabelSizes.large,
        labelExtraLarge: size === LabelSizes.extraLarge,
        [className]: Boolean(className),
      })}
      {...props}
    >
      {label ? label : ""}
    </p>
  );
};

export default Label;
