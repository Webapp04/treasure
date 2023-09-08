import React from "react";
import MarketplaceButton from "../../../common/MarketplaceButton";
import "./style.scss";
import { formatterUS } from "../../../../utils";
import Modal from "storybook/atom/Modal/modal";

const OnStakeTRESRModal = ({
  isOpen,
  stake,
  balance,
  setStake,
  onChangeStake,
  onClose,
  onStake,
  onStakeClose,
  title,
  description,
  placeholder,
  marginTop = 0,
}) => {
  const onClickMax = () => setStake(balance);

  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className="px-[20px] py-[40px] max-w-[458px] max-h-[392px]"
    >
      <h2 className="modal__title onStakeTRESRModal__title">{title}</h2>
      <p className="modal__text">{description}</p>
      <p className="onStakeTRESRModal__text">
        Available to stake: {formatterUS(balance)}
      </p>
      <div className="onStakeTRESRModal__inputContainer">
        <input
          className="modal__input onStakeTRESRModal__input"
          type="number"
          placeholder={placeholder}
          value={stake}
          onChange={onChangeStake}
        />
        <p className="onStakeTRESRModal__input--max" onClick={onClickMax}>
          max
        </p>
      </div>
      <div
        className="modal__actionButtons flex-grow justify-end items-end"
        style={{ marginTop: `${marginTop}px` }}
      >
        <MarketplaceButton title={"Cancel"} onClick={onStakeClose} />
        <MarketplaceButton
          title={"Continue"}
          onClick={onStake}
          isBlue
          disabled={+stake > +balance}
        />
      </div>
    </Modal>
  );
};

export default OnStakeTRESRModal;
