import React from "react";
import "./style.scss";
import MarketplaceButton from "../../MarketplaceButton";
import { NFKEY_COLLECTION_ADDRESS } from "../../../../constant/blockchain";
import { useParams } from "react-router-dom";
import moment from "moment";
import Modal from "storybook/atom/Modal/modal";

const BuyModal = ({
  isOpen,
  onClose,
  openCheckoutModal,
  isOffer,
  openMakeOfferModal,
  totalCollectionAmount,
}) => {
  const params = useParams();
  const isNFKeyCollection =
    params?.contractAddress === NFKEY_COLLECTION_ADDRESS;

  const onAccept = () => {
    onClose();
    isOffer ? openMakeOfferModal() : openCheckoutModal();
  };

  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onClose}
      withCrossIcon
      className="max-w-[608px] max-h-[600px]"
    >
      <p className={"modal__title"}>This is an unreviewed collection</p>
      <p className={"modal__text buyModal__subtitle"}>
        Review this information to ensure it’s what you want to buy.
      </p>

      <div className={"buyModal__data"}>
        <div className={"buyModal__block"}>
          <p className={"modal__text buyModal__text"}>Collection name</p>
          <p className={"modal__text modal__text--blue"}>
            {isNFKeyCollection ? "NFTreasure Keys" : "1:1 Collection"}
          </p>
        </div>

        <hr className={"buyModal__divider"} />

        <div className={"buyModal__block"}>
          <p className={"modal__text buyModal__text"}>Contract address</p>
          <a
            href={`https://testnet.snowtrace.io/address/${params?.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="modal__text modal__text--blue"
          >
            {params?.contractAddress.slice(0, 10) +
              "..." +
              params?.contractAddress.slice(-10)}
          </a>
        </div>

        <hr className={"buyModal__divider"} />

        <div className={"buyModal__block"}>
          <p className={"modal__text buyModal__text"}>Total items</p>
          <p className={"modal__text modal__text--blue"}>
            {totalCollectionAmount} items
          </p>
        </div>

        <hr className={"buyModal__divider"} />

        <div className={"buyModal__block"}>
          <p className={"modal__text buyModal__text"}>Created date</p>
          <p className={"modal__text modal__text--blue"}>
            {moment(new Date()).format("MMMM Do YYYY, hh:mm a")}
          </p>
        </div>
      </div>

      <div className="buyModal__buttons">
        <MarketplaceButton title={"Decline"} isWhite onClick={onClose} />
        <MarketplaceButton title={"Accept"} isBlue onClick={onAccept} />
      </div>
    </Modal>
  );
};

export default BuyModal;
