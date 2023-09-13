import React from "react";
import "./style.scss";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_INFO,
  ALERT_STATUS_SUCCESS,
} from "constant/alert";
import Icon from "../Icon/icon";

const CustomAlert = ({
  alertIsActive,
  alertStatus,
  alertImage,
  alertText,
  transactionHashBalance,
  onClose,
}) => {
  const classNameStatus = {
    [ALERT_STATUS_SUCCESS]: "customAlert__success",
    [ALERT_STATUS_FAILURE]: "customAlert__failure",
    [ALERT_STATUS_INFO]: "customAlert__info",
  };

  return (
    <div
      className={`customAlert ${
        alertIsActive ? classNameStatus[alertStatus] : ""
      }`}
    >
      <div className={"customAlert__container"}>
        <div className={"customAlert__content"}>
          {!!alertImage && (
            <video
              src={alertImage}
              className={"customAlert__image"}
              preload="metadata"
            />
          )}
          {!!alertText && <p className={"customAlert__text"}>{alertText}</p>}
        </div>

        <div className="customAlert__close" onClick={onClose}>
          <Icon iconName={"cross"} />
        </div>
        {classNameStatus[alertStatus] != "customAlert__failure" && (
          <a
            href={`https://testnet.snowtrace.io/tx/${transactionHashBalance}`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
            className="customAlert__link"
            //className="singleCollectionPage__dropdown--link text-white"
          >
            View on Snowtrace
            <Icon iconName={"viewImg"} />
          </a>
        )}
      </div>
    </div>
  );
};

export default CustomAlert;
