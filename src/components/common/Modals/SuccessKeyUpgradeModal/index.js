import React, { useEffect, useState } from "react";
import "./style.scss";
import "../SuccessAuctionModal/style.scss";
import { BASE_REWARD } from "../../../../constant/blockchain";
import { NFKEY_SOCIALS } from "../../../../constant/singleCollectionPage";
import SocialLinkComponent from "../../../AccountComponent/SocialLinkComponent";
import useWindowDimensions from "../../../../hooks/useWidowDimensions";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import Modal from "storybook/atom/Modal/modal";

const SuccessKeyUpgradeModal = ({ onClose, isOpen }) => {
  const nftSelected = useSelector(selectNftSelected);
  const [socials, setSocials] = useState([]);
  const tierPerMonth =
    +nftSelected?.tier * nftSelected?.tierTresr * BASE_REWARD * 30;
  const windowDimensions = useWindowDimensions();
  const isMobile = windowDimensions?.width <= 850;

  useEffect(() => {
    setSocials(NFKEY_SOCIALS);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      handleClose={onClose}
      withCrossIcon
      isModalOpen={isOpen}
      className="px-[20px] py-[40px] max-h-[598px] max-w-[458px]"
    >
      <p className="modal__title successKeyUpgradeModal__title">
        Upgrade Complete!
      </p>

      <p className="modal__text successKeyUpgradeModal__text">
        Founder's Key #{nftSelected?.tokenId} is updated to{" "}
        <span className="successKeyUpgradeModal__text--yellow">
          Level {nftSelected?.tier}
        </span>
        !
      </p>
      <p className="modal__text successKeyUpgradeModal__text">
        You're currently earning{" "}
        <span className="successKeyUpgradeModal__text--yellow">
          {tierPerMonth} $TRESR/month
        </span>
      </p>
      <p className="modal__text successKeyUpgradeModal__text">
        Open a Treasure Box to earn more TRESR
      </p>

      <div className="successModal__image successKeyUpgradeModal__image">
        <video src={nftSelected?.spaceFile} autoPlay loop />
      </div>

      <p className="modal__text successModal__text--bottom">
        Share it and help grow the ecosystem!
      </p>
      {!isMobile && (
        <div className="successKeyUpgradeModal_socials justify-center  ">
          {!!socials?.length &&
            socials?.map((item, key) => (
              <SocialLinkComponent
                key={key}
                isEditMode={false}
                link={item?.link}
                index={key}
              />
            ))}
        </div>
      )}
    </Modal>
  );
};

export default SuccessKeyUpgradeModal;
