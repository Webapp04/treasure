import React, { useState } from "react";
import "./style.scss";
import MarketplaceButton from "../../MarketplaceButton";
import useHandleMarketplace from "../../../../hooks/blockchain/useHandleMarketplace";
import useHandleLoader from "../../../../hooks/loader/useHandleLoader";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  TRANSFER_MESSAGE_FAILURE,
  TRANSFER_MESSAGE_SUCCESS,
} from "../../../../constant/alert";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";

const TransferModal = ({
  isOpen,
  onClose,
  token,
  onCloseTransactionLoadingModal,
  onOpenTransactionLoadingModal,
}) => {
  const [addressTo, setAddressTo] = useState("");
  const handleMarketplace = useHandleMarketplace();
  const handleLoader = useHandleLoader();
  const handleNFT = useHandleNFT();
  const params = useParams();
  const dispatch = useDispatch();

  const onAddressChange = (event) => {
    setAddressTo(event?.target?.value);
  };

  const onTransfer = () => {
    if (!addressTo || !token) return;

    onClose();
    onOpenTransactionLoadingModal();
    handleMarketplace
      .transfer(
        addressTo,
        token?.tokenId || token?.tokenID,
        params?.contractAddress
      )
      .then(async (transaction) => {
        const status = transaction?.status
          ? ALERT_STATUS_SUCCESS
          : ALERT_STATUS_FAILURE;
        const message = transaction?.status
          ? TRANSFER_MESSAGE_SUCCESS
          : TRANSFER_MESSAGE_FAILURE;
        ACTIONS.SET_ALERT(dispatch, true, status, message, token?.image);
      })
      .catch(() => {
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          TRANSFER_MESSAGE_FAILURE,
          token?.image
        );
      })
      .finally(async () => {
        onCloseTransactionLoadingModal();
        setAddressTo("");
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
      isModalOpen={isOpen}
      handleClose={onClose}
      withCrossIcon
      className="max-w-[500px] max-h-[300px] px-[20px] py-[40px]"
    >
      <p className={"modal__text transferModal__text"}>
        Enter the address you would like transfer to
      </p>
      <input
        placeholder={"Address..."}
        type={"text"}
        className="modal__input transferModal__input"
        onChange={onAddressChange}
        value={addressTo}
      />
      <div className={"transferModal__buttons"}>
        <MarketplaceButton onClick={onClose} title={"Cancel"} />
        <MarketplaceButton title={"Transfer"} isBlue onClick={onTransfer} />
      </div>
    </Modal>
  );
};

export default TransferModal;
