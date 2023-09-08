import React from "react";
import MarketplaceButton from "../../MarketplaceButton";
import "./style.scss";
import Modal from "storybook/atom/Modal/modal";

const TreasureWarningModal = ({ onClose, isOpen }) => {
  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className="max-w-[458px] max-h-[268px] px-[20px] py-[32px]"
    >
      <p className="modal__title">Warning</p>
      <p className="modal__text treasureWarningModal__text">
        First activate your Founder's Key and try again.
      </p>

      <div className="upgradeKeyModal__buttons">
        <MarketplaceButton onClick={onClose} title="OK" isBlue />
      </div>
    </Modal>
  );
};

export default TreasureWarningModal;
