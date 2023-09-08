import React from "react";
import MarketplaceButton from "../../MarketplaceButton";
import "./style.scss";
import Modal from "storybook/atom/Modal/modal";

const LoadingModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      className="px-[20px] py-[40px] max-h-[222px] max-w-[448px]"
    >
      <div className={"loadingModal"}>
        <p className={"modal__title loadingModal__title"}>Loading...</p>
        <p className={"modal__text"}>
          Checking collection for deployment status
        </p>
        <MarketplaceButton isWhite title={"Cancel"} />
      </div>
    </Modal>
  );
};

export default LoadingModal;
