import React from "react";
import styles from "./styles.module.scss";

export default function PageLoader({
  isLoaderActive,
  opacityLevel = 3,
  customClass = "",
}) {
  if (!isLoaderActive) return null;
  return (
    <div>
      <div
        className={`${styles.loaderWrap} ${
          styles[`opacityLevel_${opacityLevel}`]
        } ${customClass}`}
      >
        <div className={`${styles["la-ball-atom"]} ${styles["la-3x"]}`}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}
