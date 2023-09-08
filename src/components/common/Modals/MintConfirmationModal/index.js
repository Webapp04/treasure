import React from "react";
import "./style.scss";
import MarketplaceButton from "../../MarketplaceButton";
import Modal from "storybook/atom/Modal/modal";

const MintConfirmationModal = ({ isOpen, onClose, onMint }) => {
  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onClose}
      withCrossIcon
      className="max-w-[458px] max-h-[280px] px-[20px] py-[40px]"
    >
      <p className={"modal__title"}>Minting</p>

      <div className="modal__text mt-[32px] max-md:mt-[20px]">
        If you are minting multiple keys, you will be asked to confirm a
        transaction for each key being minted.
      </div>

      <div className="mintCModal__buttons max-md:mt-[20px] max-md:justify-end max-md:items-end max-md:h-[370px]">
        <MarketplaceButton title={"Cancel"} isWhite onClick={onClose} />
        <MarketplaceButton title={"Continue"} isBlue onClick={onMint} />
      </div>
    </Modal>
  );
};

export default MintConfirmationModal;
