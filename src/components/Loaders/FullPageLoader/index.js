import React from "react";
import styles from "./styles.module.scss";

export default function FullPageLoader({isLoaderActive, opacityLevel = 3}) {
    if (!isLoaderActive) return null;
    return (
        <div
            className={`${styles.loaderWrap} ${
                styles[`opacityLevel_${opacityLevel}`]
            }`}
        >
            <div className={`${styles["la-ball-atom"]} ${styles["la-3x"]}`}>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
}
