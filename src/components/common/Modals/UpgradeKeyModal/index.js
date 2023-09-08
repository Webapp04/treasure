import React from "react";
import { formatterUS } from "../../../../utils";
import MarketplaceButton from "../../MarketplaceButton";
import "./style.scss";
import Modal from "storybook/atom/Modal/modal";

const UpgradeKeyModal = ({
  onClose,
  isOpen,
  nftSelected,
  amountUpgradeKey,
  onApproveUpgradeKey,
}) => {
  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className="max-w-[458px] max-h-[412px] px-[20px] py-[32px]"
    >
      <p className="modal__title">Upgrade Founder's Key</p>
      <p className="modal__text upgradeKeyModal__text">
        Upgrading your Key Level helps you earn more $TRESR.
      </p>

      <div className="flex justify-between my-3">
        <p className="modal__text">Key #</p>
        <span className="modal__text--blue">
          Founder's Key #{nftSelected?.tokenId}
        </span>
      </div>
      <div className="flex justify-between my-3">
        <p className="modal__text">Next Level</p>
        <span className="modal__text--blue">
          Level {+nftSelected?.tier + 1}
        </span>
      </div>
      <div className="flex justify-between my-3">
        <p className="modal__text">To Burn</p>
        <span className="modal__text--blue">
          {formatterUS(amountUpgradeKey)} $SMRTR
        </span>
      </div>
      <div className="modal__text text-center my-6 flex-grow justify-center items-end flex">
        This actions cannot be undone
      </div>
      <div className="upgradeKeyModal__buttons">
        <MarketplaceButton title={"Cancel"} onClick={onClose} />
        <MarketplaceButton
          title={"Upgrade"}
          isBlue
          onClick={onApproveUpgradeKey}
        />
      </div>
    </Modal>
  );
};

export default UpgradeKeyModal;
