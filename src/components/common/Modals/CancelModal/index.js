import React from "react";
import "./style.scss";
import MarketplaceButton from "../../MarketplaceButton";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
} from "../../../../constant/alert";
import useHandleMarketplace from "../../../../hooks/blockchain/useHandleMarketplace";
import useHandleLoader from "../../../../hooks/loader/useHandleLoader";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";

const CancelModal = ({
  isOpen,
  onClose,
  token,
  isOffer,
  currentOffer,
  onCloseTransactionLoadingModal,
  onOpenTransactionLoadingModal,
  checkOffersInfo,
}) => {
  const handleMarketplace = useHandleMarketplace();
  const handleLoader = useHandleLoader();
  const handleNFT = useHandleNFT();
  const params = useParams();
  const dispatch = useDispatch();

  const CANCEL_LISTING_SUCCESS = `Your listing for NFT#${
    token?.tokenId || token?.tokenID
  } has been canceled`;
  const CANCEL_LISTING_FAILURE = `Your listing for NFT#${
    token?.tokenId || token?.tokenID
  } has NOT been canceled. Try again`;

  const CANCEL_OFFER_SUCCESS = `Your offer for NFT#${
    token?.tokenId || token?.tokenID
  } has been canceled`;
  const CANCEL_OFFER_FAILURE = `Your offer for NFT#${
    token?.tokenId || token?.tokenID
  } has NOT been canceled. Try again`;

  const onCancelListing = () => {
    if (!token) return;

    onClose();
    onOpenTransactionLoadingModal();
    handleMarketplace
      .cancelListing(token?.tokenId || token?.tokenID, params?.contractAddress)
      .then(async (transaction) => {
        const status = transaction?.status
          ? ALERT_STATUS_SUCCESS
          : ALERT_STATUS_FAILURE;
        const message = transaction?.status
          ? CANCEL_LISTING_SUCCESS
          : CANCEL_LISTING_FAILURE;

        if (transaction?.status) {
          onCloseTransactionLoadingModal();
          await handleLoader.loaderWrapper(
            () =>
              handleNFT.reloadNFTItemBalance(
                token?.contractAddress,
                token?.tokenId || token?.tokenID
              ),
            2
          );
        }

        ACTIONS.SET_ALERT(true, status, message, token?.image);
      })
      .catch(() => {
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          CANCEL_LISTING_FAILURE,
          token?.image
        );
      })
      .finally(() => onCloseTransactionLoadingModal());
  };

  const onCancelOffer = () => {
    if (!token) return;

    onClose();
    onOpenTransactionLoadingModal();
    handleMarketplace
      .onCancelOffer(
        token?.tokenId || token?.tokenID,
        currentOffer?.id,
        params?.contractAddress
      )
      .then(async (transaction) => {
        if (transaction?.status) {
          ACTIONS.SET_ALERT(
            true,
            ALERT_STATUS_SUCCESS,
            CANCEL_OFFER_SUCCESS,
            token?.image
          );
        } else {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            CANCEL_OFFER_FAILURE,
            token?.image
          );
        }
        onClose();
      })
      .catch(() => {
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          CANCEL_OFFER_FAILURE,
          token?.image
        );
        onClose();
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
        checkOffersInfo();
      });
  };

  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onClose}
      withCrossIcon
      className="max-h-[344px] max-w-[448px] px-[20px] py-[40px]"
    >
      <p className={"modal__title cancelModal__title"}>
        {isOffer ? "Cancel offer?" : "Cancel listings?"}
      </p>
      <p className={"modal__text"}>
        {isOffer
          ? "This will cancel your offer after gas payment"
          : "This will cancel your listings. You will also be asked to confirm thiscancelation"}
      </p>

      <div className={"priceModal__buttons"} style={{ marginTop: "60px" }}>
        <MarketplaceButton
          title={"Continue"}
          isBlue
          onClick={isOffer ? onCancelOffer : onCancelListing}
        />
        <MarketplaceButton title={"Cancel"} onClick={onClose} />
      </div>
    </Modal>
  );
};

export default CancelModal;
