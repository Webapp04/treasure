import React from "react";
import MarketplaceButton from "../../../common/MarketplaceButton";
import "./style.scss";
import Modal from "storybook/atom/Modal/modal";

const OnUnstakeTRESRModal = ({
  onClose,
  isOpen,
  unstake,
  setUnstake,
  onChangeUnstake,
  onUnstake,
  onUnstakeClose,
  balance,
  title,
  description,
  placeholder,
  marginTop,
}) => {
  const onClickMax = () => setUnstake(balance);

  return (
    <Modal
      withCrossIcon
      handleClose={onClose}
      isModalOpen={isOpen}
      className="px-[20px] py-[40px] max-w-[458px] max-h-[392px]"
    >
      <h2 className="modal__title onStakeTRESRModal__title">{title}</h2>
      <p className="modal__text">{description}</p>
      <div className="onStakeTRESRModal__inputContainer onUnstakeTRESRModal__inputContainer">
        <input
          className="modal__input onStakeTRESRModal__input"
          type="number"
          placeholder={placeholder}
          value={unstake}
          onChange={onChangeUnstake}
        />
        <p className="onStakeTRESRModal__input--max" onClick={onClickMax}>
          max
        </p>
      </div>
      <div
        className="modal__actionButtons flex-grow justify-end items-end"
        style={{ marginTop: `${marginTop}px` }}
      >
        <MarketplaceButton title={"Cancel"} onClick={onUnstakeClose} isNormal />
        <MarketplaceButton title={"Continue"} onClick={onUnstake} isBlue />
      </div>
    </Modal>
  );
};

export default OnUnstakeTRESRModal;
