import React from "react";
import MarketplaceButton from "../../../common/MarketplaceButton";
import "./style.scss";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import Modal from "storybook/atom/Modal/modal";

const DeactivateKeyModal = ({ isOpen, onClose, onUnstake }) => {
  const nftSelected = useSelector(selectNftSelected);

  const onContinue = () => {
    onClose();
    onUnstake();
  };

  return (
    <Modal
      withCrossIcon
      handleClose={onClose}
      isModalOpen={isOpen}
      className="px-[20px] py-[32px] max-w-[458px] max-h-[352px]"
    >
      <p className="modal__title">Deactivate key</p>
      <p className="modal__text deactivateKeyModal__text">
        Are you sure to deactivate this key? This action cannot be undone.{" "}
        <span className="deactivateKeyModal__text--purple">
          You are about to Deactivate key #{nftSelected?.tokenId}.
        </span>{" "}
        Make sure you to claim all of your rewards. Any TRESR rewards left on
        key after deactivation will be burned.
      </p>

      <div className="modal__actionButtons flex-grow flex justify-end items-end">
        <MarketplaceButton onClick={onClose} title={"Cancel"} />
        <MarketplaceButton onClick={onContinue} title={"Continue"} isBlue />
      </div>
    </Modal>
  );
};

export default DeactivateKeyModal;
