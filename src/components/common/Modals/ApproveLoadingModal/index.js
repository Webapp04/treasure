import React, { useState, useEffect } from "react";
import step1 from "../../../../assets/images/steps_1.svg";
import step3 from "../../../../assets/images/steps_2.svg";
import step2 from "../../../../assets/images/steps_3.svg";
import "./style.scss";
import { APPROVE_STATUS_TEXT } from "../../../../constant/approveLoadingModal";
import MarketplaceButton from "../../MarketplaceButton";
import Modal from "storybook/atom/Modal/modal";

const ApproveLoadingModal = ({
  isOpen,
  onClose,
  isApproved,
  status,
  onNextStep,
}) => {
  const [isDisabledNextStep, setIsDisabledNextStep] = useState(true);
  const [isDisabledCancel, setIsDisabledCancel] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [loadingImage, setLoadingImage] = useState(step1);

  const handleNextStep = () => {
    onNextStep();
    setIsDisabledNextStep(true);
    setIsDisabledCancel(true);
    setButtonText(APPROVE_STATUS_TEXT[status].loadingButton);
    setLoadingImage(step3);
  };

  useEffect(() => {
    setIsDisabledNextStep(!isApproved);
    setButtonText(
      isApproved ? APPROVE_STATUS_TEXT[status].button : "Approving"
    );
    setLoadingImage(isApproved ? step2 : step1);
  }, [isApproved]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal isModalOpen={isOpen} className="approveLoadingModal">
      <div className="approveModal__background">
        <div
          className={`approveModal__image 
                ${isApproved ? "approveModal__image--isApproved" : ""}
                ${!isDisabledNextStep ? "approveModal__image--noSpinner" : ""}
                `}
        >
          <img src={loadingImage} alt={"waiting for approve"} />
        </div>

        <div
          className={`approveModal__container ${
            !isDisabledNextStep ? "approveModal__container--blurred" : ""
          }`}
        >
          <div className={"approveModal__info"}>
            <p className={"modal__text"}>
              {APPROVE_STATUS_TEXT[status].firstTitle}
            </p>
            <p className={"modal__text modal__text--small"}>
              {APPROVE_STATUS_TEXT[status].firstText}
            </p>
          </div>

          <div className="approveModal__info">
            <p className={"modal__text"}>
              {APPROVE_STATUS_TEXT[status].secondTitle}
            </p>
            <p className={"modal__text modal__text--small"}>
              {APPROVE_STATUS_TEXT[status].secondText}
            </p>
          </div>
        </div>

        <div className="approveModal__buttons">
          <div
            className={`approveModal__buttons--note ${
              !isDisabledNextStep ? "approveModal__buttons--note__visible" : ""
            }`}
          >
            Click to {buttonText}
          </div>

          <MarketplaceButton
            isNormal
            title={"Cancel"}
            onClick={onClose}
            disabled={isDisabledCancel}
          />
          <MarketplaceButton
            title={buttonText}
            onClick={handleNextStep}
            isBlue
            disabled={isDisabledNextStep}
            isAnimated={!isDisabledNextStep}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ApproveLoadingModal;
