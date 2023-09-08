import React, { useEffect, useState } from "react";
import CurrencyInput from "../../Inputs/CurrencyInput";
import MarketplaceButton from "../../MarketplaceButton";
import "./style.scss";
import { AVAILABLE_CURRENCY } from "../../../../constant/singleNFTPage";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
} from "../../../../constant/alert";
import useHandleMarketplace from "../../../../hooks/blockchain/useHandleMarketplace";
import useHandleLoader from "../../../../hooks/loader/useHandleLoader";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import useWindowDimensions from "../../../../hooks/useWidowDimensions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";

const ChangePriceModal = ({
  isOpen,
  onClose,
  token,
  onCloseTransactionLoadingModal,
  onOpenTransactionLoadingModal,
  listingInfo,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width < 400;
  const dispatch = useDispatch();

  const handleMarketplace = useHandleMarketplace();
  const handleLoader = useHandleLoader();
  const handleNFT = useHandleNFT();
  const params = useParams();
  const CHANGE_PRICE_SUCCESS = `Your price for NFT#${
    token?.tokenId || token?.tokenID
  } has been changed`;
  const CHANGE_PRICE_FAILURE = `Your price for NFT#${
    token?.tokenId || token?.tokenID
  } has NOT been changed. Try again`;

  useEffect(() => {
    setSelectedCurrency(
      AVAILABLE_CURRENCY.find(
        (item) => item?.address === listingInfo?.tokenAddress
      )
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangePrice = (event) => {
    setErrorMessage("");
    if (+event?.target?.value || "0") setPrice(event?.target?.value);
  };

  const onContinue = () => {
    if (+price === 0) return setErrorMessage("Price can not be 0");
    if (!price)
      return setErrorMessage(
        "This field is required and must contain a numeric value"
      );
    if (!token) return;

    onClose();
    onOpenTransactionLoadingModal();
    handleMarketplace
      .changePrice(
        (price * 10 ** 18).toString(),
        token?.tokenId || token?.tokenID,
        params?.contractAddress
      )
      .then(async (transaction) => {
        const status = transaction?.status
          ? ALERT_STATUS_SUCCESS
          : ALERT_STATUS_FAILURE;
        const message = transaction?.status
          ? CHANGE_PRICE_SUCCESS
          : CHANGE_PRICE_FAILURE;

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

        ACTIONS.SET_ALERT(dispatch, true, status, message, token?.image);
      })
      .catch(() =>
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          CHANGE_PRICE_FAILURE,
          token?.image
        )
      )
      .finally(() => {
        onCloseTransactionLoadingModal();
        setPrice("");
      });
  };

  const onCancel = () => {
    setErrorMessage("");
    onClose();
  };

  return (
    <Modal
      handleClose={onCancel}
      isModalOpen={isOpen}
      withCrossIcon
      className={`max-w-[448px] p-[40px] ${
        isMobile ? "max-h-[450px]" : "max-h-[416px]"
      }`}
    >
      <p className={"modal__title priceModal__title"}>
        Change the listing price
      </p>
      <CurrencyInput
        selectedCurrency={selectedCurrency}
        price={price}
        onChangePrice={onChangePrice}
        hideCurrencyList
      />
      {!!errorMessage && (
        <p className={"priceModal__error modal__text"}>{errorMessage}</p>
      )}

      <p className={"modal__text priceModal__text"}>
        You must pay an additional gas fee if you want to cancel this listing at
        a later point.
      </p>

      <div className={"priceModal__buttons"}>
        <MarketplaceButton title={"Continue"} isBlue onClick={onContinue} />
        <MarketplaceButton title={"Cancel"} onClick={onCancel} />
      </div>
    </Modal>
  );
};

export default ChangePriceModal;
