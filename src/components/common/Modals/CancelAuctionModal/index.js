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

const CancelAuctionModal = ({
  token,
  isOpen,
  onClose,
  onCloseTransactionLoadingModal,
  onOpenTransactionLoadingModal,
}) => {
  const handleAuction = useHandleAuction();
  const APPROVE_MESSAGE_SUCCESS = "Auction was successfully canceled";
  const APPROVE_MESSAGE_FAILURE = "Cancel auction failed";
  const handleLoader = useHandleLoader();
  const handleNFT = useHandleNFT();
  const dispatch = useDispatch();

  const onCancelAuction = () => {
    onClose();
    onOpenTransactionLoadingModal();
    handleAuction
      .cancelAuction(token?.contractAddress, token?.tokenId || token?.tokenID)
      .then(async () => {
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
      className="max-h-[344px] max-w-[448px]"
    >
      <p className="modal__title cancelModal__title">Cancel auction?</p>
      <p className="modal__text">
        This will cancel your auction. You will also be asked to confirm this
        cancelation
      </p>

      <div className={"priceModal__buttons"} style={{ marginTop: "60px" }}>
        <MarketplaceButton
          title={"Continue"}
          onClick={onCancelAuction}
          isBlue
        />
        <MarketplaceButton title={"Cancel"} onClick={onClose} />
      </div>
    </Modal>
  );
};

export default CancelAuctionModal;
