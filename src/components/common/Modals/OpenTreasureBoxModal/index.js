import React from "react";
import { formatterUS } from "../../../../utils";
import MarketplaceButton from "../../MarketplaceButton";
import { BASE_REWARD, MAX_CHEST_TIER } from "constant/blockchain";
import Modal from "storybook/atom/Modal/modal";

const OpenTreasureBoxModal = ({
  onClose,
  isOpen,
  nftSelected,
  amountOpenChest,
  onOpenTreasure,
  balanceTresr,
  probToOpen,
  TRESRBalance,
}) => {
  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className="max-w-[460px] max-h-[540px] px-[20px] py-[32px]"
    >
      <p className="modal__title">Open a Treasure Box</p>
      <p className="modal__text upgradeKeyModal__text">
        You are about to attempt to open a Treasure Box
      </p>

      <div className="flex justify-between">
        <p className="modal__text upgradeKeyModal__text">With the Key #</p>
        <p className="modal__text upgradeKeyModal__text">
          Founder's Key #{nftSelected?.tokenId}
        </p>
      </div>

      <div className="flex justify-between -mt-[15px]">
        <p className="modal__text upgradeKeyModal__text">
          Probability of opening
        </p>
        <p className="modal__text upgradeKeyModal__text">
          {probToOpen?.toFixed(1)}%
        </p>
      </div>

      <div className="-mt-[15px]">
        <p className="modal__text text-[#fbfbfb70] text-[12px]">
          You can improve your open probability by staking TRESR to earn
          veTRESR.
        </p>
      </div>

      <div className="flex justify-between -mb-8">
        <p className="modal__text upgradeKeyModal__text">Your TRESR Balance</p>
        <div className="flex">
          <p className="modal__text upgradeKeyModal__text">
            {formatterUS(+balanceTresr)} TRESR
          </p>
        </div>
      </div>

      <div className="flex justify-between -mb-8">
        <p className="modal__text upgradeKeyModal__text">
          Current{"   "}: Tier {nftSelected?.tierTresr} Rewards
        </p>
        <div className="flex">
          <p className="modal__text upgradeKeyModal__text">
            {+nftSelected?.tier * nftSelected?.tierTresr * BASE_REWARD * 30}{" "}
            TRESR / MONTH
          </p>
        </div>
      </div>

      <div className="flex justify-between -mb-3">
        <p className="modal__text upgradeKeyModal__text">
          Attempt: Tier{" "}
          {MAX_CHEST_TIER === nftSelected?.tierTresr
            ? "-"
            : nftSelected?.tierTresr + 1}{" "}
          Rewards
        </p>
        <div className="flex">
          <p className="modal__text upgradeKeyModal__text">
            {MAX_CHEST_TIER === nftSelected?.tierTresr
              ? "-"
              : +nftSelected?.tier *
                (nftSelected?.tierTresr + 1) *
                BASE_REWARD *
                30}{" "}
            TRESR / MONTH
          </p>
        </div>
      </div>

      <div className="flex justify-between -mb-5">
        <p className="modal__text upgradeKeyModal__text">Burn Fee</p>
        <div className="flex">
          <p className="modal__text upgradeKeyModal__text">
            {formatterUS(amountOpenChest)} TRESR
          </p>
        </div>
      </div>
      <div className="flex-grow justify-center items-end flex">
        <p className="modal__text upgradeKeyModal__text">
          This action cannot be undone.
        </p>
      </div>
      <div className="upgradeKeyModal__buttons">
        <MarketplaceButton title={"Cancel"} onClick={onClose} />
        <MarketplaceButton
          disabled={+amountOpenChest > +balanceTresr}
          title={
            +amountOpenChest > +balanceTresr
              ? "Insufficient balance"
              : `Burn ${formatterUS(amountOpenChest)} $TRESR`
          }
          isBlue
          onClick={onOpenTreasure}
        />
      </div>
    </Modal>
  );
};

export default OpenTreasureBoxModal;
