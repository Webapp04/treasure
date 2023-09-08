import React, { useEffect, useState } from "react";
import {
  CREATE_BUTTON_APPROVE,
  CREATE_BUTTON_APPROVING,
  CREATE_BUTTON_AUCTION,
  CREATE_BUTTON_MINT,
  CREATE_BUTTON_MINTING,
  CREATE_BUTTON_SALE,
  CREATE_BUTTON_STARTING,
  CREATE_BUTTON_UPLOADING,
  CREATE_STATUS_IS_APPROVED,
  CREATE_STATUS_IS_MINTED,
  CREATE_STATUS_IS_PUT_ON_SALE,
  CREATE_STATUS_IS_UPLOADED,
  CREATE_STATUS_IS_UPLOADING,
} from "../../../../constant/createPage";
import loaderUploading from "../../../../assets/images/loader_uploading.svg";
import loaderMinting from "../../../../assets/images/loader_minting.svg";
import loaderApprove from "../../../../assets/images/loader_approve.svg";
import loaderSale from "../../../../assets/images/loader_sale.svg";
import "./style.scss";
import MarketplaceButton from "../../MarketplaceButton";
import { useNavigate } from "react-router-dom";
import useHandleLoader from "../../../../hooks/loader/useHandleLoader";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import { SUCCESS_CREATE_TEST } from "../../../../constant/singleNFTPage";
import { customStyles } from "./customStyles";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";

const LoadingMintModal = ({
  isOpen,
  onClose,
  status,
  isAuction,
  onMint,
  onApprove,
  onPutOnSale,
  setLoadingStatus,
  tokenId,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(loaderUploading);
  const [buttonStatus, setButtonStatus] = useState(CREATE_BUTTON_UPLOADING);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const handleLoader = useHandleLoader();
  const handleNFT = useHandleNFT();

  const loadingImages = {
    [CREATE_STATUS_IS_UPLOADING]: loaderUploading,
    [CREATE_STATUS_IS_UPLOADED]: loaderMinting,
    [CREATE_STATUS_IS_MINTED]: loaderApprove,
    [CREATE_STATUS_IS_APPROVED]: loaderSale,
  };

  const buttonStatuses = {
    [CREATE_STATUS_IS_UPLOADING]: CREATE_BUTTON_UPLOADING,
    [CREATE_STATUS_IS_UPLOADED]: CREATE_BUTTON_MINT,
    [CREATE_STATUS_IS_MINTED]: CREATE_BUTTON_APPROVE,
    [CREATE_STATUS_IS_APPROVED]: isAuction
      ? CREATE_BUTTON_AUCTION
      : CREATE_BUTTON_SALE,
  };

  const onCloseModal = async () => {
    onClose();

    if (
      status === CREATE_STATUS_IS_MINTED ||
      status === CREATE_STATUS_IS_APPROVED
    ) {
      ACTIONS.SET_CREATE_BUTTON(
        dispatch,
        false,
        {},
        true,
        SUCCESS_CREATE_TEST({ tokenId })
      );
      navigate(
        `/marketplace/${process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS}/${tokenId}`
      );
      await handleLoader.loaderWrapper(
        () =>
          handleNFT.reloadNFTItemBalance(
            process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
            tokenId
          ),
        2
      );
    }

    setIsDisabled(true);
    setLoadingStatus(CREATE_STATUS_IS_UPLOADING);
  };

  const onNextStep = () => {
    if (status === CREATE_STATUS_IS_UPLOADED) {
      setButtonStatus(CREATE_BUTTON_MINTING);
      setIsDisabled(true);
      onMint();
    } else if (status === CREATE_STATUS_IS_MINTED) {
      setButtonStatus(CREATE_BUTTON_APPROVING);
      setIsDisabled(true);
      onApprove();
    } else if (status === CREATE_STATUS_IS_APPROVED) {
      setButtonStatus(CREATE_BUTTON_STARTING);
      setIsDisabled(true);
      onPutOnSale();
    }
  };

  useEffect(() => {
    setImage(loadingImages[status]);
    setButtonStatus(buttonStatuses[status]);

    if (
      status === CREATE_STATUS_IS_UPLOADED ||
      status === CREATE_STATUS_IS_MINTED ||
      status === CREATE_STATUS_IS_APPROVED
    ) {
      setIsDisabled(false);
    }

    if (status === CREATE_STATUS_IS_PUT_ON_SALE) onCloseModal();
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal isModalOpen={isOpen} className="customMintModal">
      <div className="loadingMintModal__background">
        <div
          className={`loadingMintModal__image 
            ${
              status === CREATE_STATUS_IS_UPLOADED
                ? "loadingMintModal__image--isMinted"
                : ""
            }
            ${
              status === CREATE_STATUS_IS_MINTED
                ? "loadingMintModal__image--isApproved"
                : ""
            }
            ${
              status === CREATE_STATUS_IS_APPROVED
                ? "loadingMintModal__image--isOnSale"
                : ""
            }
            ${!isDisabled ? "loadingMintModal__image--noSpinner" : ""}
            `}
        >
          <img src={image} alt={"wait..."} />
        </div>

        <div
          className={`loadingMintModal__wrapper ${
            !isDisabled ? "loadingMintModal__wrapper--blurred" : ""
          }`}
        >
          <div className="loadingMintModal__text">
            <p className="loadingMintModal__text--big">Upload</p>
            <p className="loadingMintModal__text--small">
              Uploading of all media assets and metadata to IPFS
            </p>
          </div>

          <div className="loadingMintModal__text">
            <p className="loadingMintModal__text--big">Mint</p>
            <p className="loadingMintModal__text--small">
              Send transaction to create your NFT
            </p>
          </div>

          <div className="loadingMintModal__text">
            <p className="loadingMintModal__text--big">Approve</p>
            <p className="loadingMintModal__text--small">
              This transaction is conducted only once per collection
            </p>
          </div>

          <div className="loadingMintModal__text">
            <p className="loadingMintModal__text--big">
              {isAuction ? "Put on Auction" : "Put on Listing"}
            </p>
            <p className="loadingMintModal__text--small">
              {isAuction
                ? "Sign message to start the auction"
                : "Sign message to start the listing"}
            </p>
          </div>
        </div>

        <div className="loadingMintModal__buttons">
          <div
            className={`loadingMintModal__buttons--note ${
              !isDisabled ? "loadingMintModal__buttons--note__visible" : ""
            }`}
          >
            Click to {buttonStatus}
          </div>

          <MarketplaceButton
            isNormal
            title="Cancel"
            onClick={onCloseModal}
            disabled={isDisabled}
          />
          <MarketplaceButton
            title={buttonStatus}
            onClick={onNextStep}
            isBlue
            disabled={isDisabled}
            isAnimated={!isDisabled}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LoadingMintModal;
