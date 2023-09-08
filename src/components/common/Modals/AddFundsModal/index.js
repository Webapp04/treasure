import React, { useRef, useState } from "react";
import "./style.scss";
import copyImg from "../../../../assets/images/singleNFTPage/copy.svg";
import checkMark from "../../../../assets/images/singleNFTPage/checkMark.svg";
import MarketplaceButton from "../../MarketplaceButton";
import useWindowDimensions from "../../../../hooks/useWidowDimensions";
import Modal from "storybook/atom/Modal/modal";

const AddFundsModal = ({ isOpen, onClose }) => {
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 450;

  const [isCopied, setIsCopied] = useState(false);
  const textRef = useRef();

  const onCopyImg = () => {
    navigator.clipboard.writeText(textRef?.current?.value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className={`max-w-[775px] px-[20px] py-[32px] ${
        isMobile ? "max-h-[430px]" : "max-h-[388px]"
      }`}
    >
      <p className={"modal__title"}>Add funds to purchase</p>

      <p className={"modal__text modal__text--big addFunds__subtitle"}>
        You need 82,1053 AVAX +{" "}
        <span className={"modal__text modal__text--blue modal__text--big"}>
          gas fees
        </span>
      </p>

      <p className={"modal__text modal__text--medium"}>
        Your balance:{" "}
        <span className={"modal__text modal__text--blue modal__text--medium"}>
          34.28 AVAX
        </span>
      </p>

      <div className={"addFunds__address"} onClick={onCopyImg}>
        <p className={"modal__text modal__text--medium"}>
          0xbec4dd0a14214241ed4d8e202133f5aa355c23acd
        </p>
        <input
          value={"0xbec4dd0a14214241ed4d8e202133f5aa355c23acd"}
          ref={textRef}
          hidden
          onChange={() => {}}
        />
        {isCopied ? (
          <img src={checkMark} alt={"copy"} width={16} height={16} />
        ) : (
          <img src={copyImg} alt={"copy"} />
        )}
      </div>

      <p className={"modal__text"}>
        Transfer funds to your wallet or add funds with a card. It can take up
        to a minute for your balance to update.
      </p>

      <div className={"addFunds__buttons"}>
        <MarketplaceButton title={"Cancel"} isNormal onClick={onClose} />
        <MarketplaceButton title={"Continue"} isBlue />
      </div>
    </Modal>
  );
};

export default AddFundsModal;
