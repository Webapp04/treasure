import React from "react";
import "./style.scss";
import MarketplaceButton from "../../MarketplaceButton";
import useHandleAuction from "../../../../hooks/blockchain/useHandleAuction";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
} from "../../../../constant/alert";
import useHandleLoader from "../../../../hooks/loader/useHandleLoader";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";

const FinishAuctionModal = ({
  token,
  isOpen,
  onClose,
  onCloseTransactionLoadingModal,
  onOpenTransactionLoadingModal,
}) => {
  const handleAuction = useHandleAuction();
  const APPROVE_MESSAGE_SUCCESS = "Auction was successfully finished";
  const APPROVE_MESSAGE_FAILURE = "Something went wrong";
  const handleLoader = useHandleLoader();
  const handleNFT = useHandleNFT();
  const dispatch = useDispatch();

  const onFinalizeAuction = () => {
    onClose();
    onOpenTransactionLoadingModal();

    handleAuction
      .finalize(token?.contractAddress, token?.tokenId || token?.tokenID)
      .then(() => {
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          APPROVE_MESSAGE_SUCCESS,
          token?.image
        );
      })
      .catch(() => {
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          APPROVE_MESSAGE_FAILURE,
          token?.image
        );
      })
      .finally(async () => {
        onCloseTransactionLoadingModal();
        await handleLoader.loaderWrapper(
          () =>
            handleNFT.reloadNFTItemBalance(
              token?.contractAddress,
              token?.tokenId || token?.tokenID
            ),
          2
        );
      });
  };
  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className="px-[20px] py-[40px] max-h-[344px] max-w-[448px]"
    >
      <p className={"modal__title cancelModal__title"}>Finish auction</p>
      <p className={"modal__text"}>
        This will end your auction after gas payment
      </p>

      <div className={"cancelModal__wrapper"}>
        <p className={"modal__text"}>Service fee</p>
        <p className={"modal__boldText"}>2.5 WETH</p>
      </div>

      <div className="priceModal__buttons finishAuctionModal__buttons">
        <MarketplaceButton
          title={"Continue"}
          onClick={onFinalizeAuction}
          isBlue
        />
        <MarketplaceButton title={"Cancel"} onClick={onClose} />
      </div>
    </Modal>
  );
};

export default FinishAuctionModal;
