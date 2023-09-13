import React from "react";
import classNames from "classnames";
import "./style.scss";

export const LoaderTypes = {
  primary: "primary",
  secondary: "secondary",
  pageLoader: "pageLoader",
  fullPageLoader: "fullPageLoader",
};

export const LoaderSizes = {
  extraSmall: "extraSmall",
  small: "small",
  medium: "medium",
  large: "large",
};

export const LoaderSpeeds = {
  slow: "slow",
  normal: "normal",
  fast: "fast",
};

const Loader = ({
  variant,
  size,
  speed,
  isLoaderActive,
  opacityLevel,
  customClass,
}) => {
  if (
    (variant === LoaderTypes.pageLoader ||
      variant === LoaderTypes.fullPageLoader) &&
    !isLoaderActive
  ) {
    return null;
  }
  return (
    <>
      {(variant === LoaderTypes.primary ||
        variant === LoaderTypes.secondary) && (
        <div
          className={classNames("custom-loader", {
            loaderPrimary: variant === LoaderTypes.primary,
            loaderSecondary: variant === LoaderTypes.secondary,
            loaderExtraSmall: size === LoaderSizes.extraSmall,
            loaderSmall: size === LoaderSizes.small,
            loaderMedium: size === LoaderSizes.medium,
            loaderLarge: size === LoaderSizes.large,
            loaderSlow: speed === LoaderSpeeds.slow,
            loaderNormal: speed === LoaderSpeeds.normal,
            loaderFast: speed === LoaderSpeeds.fast,
          })}
        ></div>
      )}
      {variant === LoaderTypes.pageLoader && (
        <div>
          <div
            className={`loaderWrap pageLoaderWrapper ${`opacityLevel_${opacityLevel}`} ${customClass}`}
          >
            <div className={"la-ball-atom la-3x"}>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      )}
      {variant === LoaderTypes.fullPageLoader && (
        <div className={`loaderWrap ${`opacityLevel_${opacityLevel}`}`}>
          <div className={"la-ball-atom la-3x"}>
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
