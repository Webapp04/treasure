import React from "react";
import "./style.scss";
import MarketplaceButton from "../../../common/MarketplaceButton";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import Modal from "storybook/atom/Modal/modal";

const ActivateKeyModal = ({ isOpen, onClose, onStake }) => {
  const nftSelected = useSelector(selectNftSelected);

  const onContinue = () => {
    onClose();
    onStake();
  };

  return (
    <Modal
      withCrossIcon
      handleClose={onClose}
      isModalOpen={isOpen}
      className="px-[20px] py-[32px] max-w-[458px] max-h-[368px]"
    >
      <p className="modal__title">Activate Founder's Key?</p>
      <p className="modal__text deactivateKeyModal__text">
        Activating your Founder's Key allows you to open Treasure Boxes and
        compete for $TRESR rewards. Your daily $TRESR Rewards grow as you
        upgrade your "Key Level" and "Treasure Tier". <br />
        You are about to activate
        <span className="deactivateKeyModal__text--purple">
          {" "}
          Founder's Key #{nftSelected?.tokenId}.
        </span>
      </p>

      <div className="modal__actionButtons flex-grow flex justify-end items-end">
        <MarketplaceButton onClick={onClose} title={"Cancel"} />
        <MarketplaceButton onClick={onContinue} title={"Continue"} isBlue />
      </div>
    </Modal>
  );
};

export default ActivateKeyModal;
