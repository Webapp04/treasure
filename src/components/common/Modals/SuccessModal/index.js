import React, { useState, useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { NFKEY_SOCIALS } from "constant/singleCollectionPage";
import {
  CLOUDHEADS_COLLECTION_ADDRESS,
  COMMUNITY_COLLECTION_ADDRESS,
  DOODLEVERSE_COLLECTION_ADDRESS,
  HAPPY_SUN_COLLECTION_ADDRESS,
  JOEPEGS_COLLECTION_ADDRESS,
  MORE_SATOS_COLLECTION_ADDRESS,
  NFKEY_COLLECTION_ADDRESS,
  VIN_TAGE_TAPE_COLLECTION_ADDRESS,
} from "../../../../constant/blockchain";
import SocialLinkComponent from "components/AccountComponent/SocialLinkComponent";
import useWindowDimensions from "hooks/useWidowDimensions";
import MarketplaceButton from "components/common/MarketplaceButton";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "redux/slice/currentTokenSlice";
import ACTIONS from "redux/action";
import { selectCreateButtonIsCreatedNFT } from "redux/slice/createButtonSlice";
import Modal from "storybook/atom/Modal/modal";

const SuccessModal = ({
  isOpen,
  onClose,
  isOffer,
  transactionAddress,
  text,
}) => {
  const isCreatedNFT = useSelector(selectCreateButtonIsCreatedNFT);
  const currentToken = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const params = useParams();
  const [tokenImage, setTokenImage] = useState("");
  const windowDimensions = useWindowDimensions();
  const [socials, setSocials] = useState([]);
  const isMobile = windowDimensions?.width <= 850;
  const isJoepegsCollection =
    params?.contractAddress === JOEPEGS_COLLECTION_ADDRESS ||
    params?.contractAddress === DOODLEVERSE_COLLECTION_ADDRESS ||
    params?.contractAddress === HAPPY_SUN_COLLECTION_ADDRESS ||
    params?.contractAddress === MORE_SATOS_COLLECTION_ADDRESS ||
    params?.contractAddress === VIN_TAGE_TAPE_COLLECTION_ADDRESS;
  const isCloudheadzCollection =
    params?.contractAddress === CLOUDHEADS_COLLECTION_ADDRESS;
  const isCommunityCollection =
    params?.contractAddress === COMMUNITY_COLLECTION_ADDRESS;
  const isNFKeyCollection =
    params?.contractAddress === NFKEY_COLLECTION_ADDRESS;

  useEffect(() => {
    setSocials(NFKEY_SOCIALS);
    if (isJoepegsCollection)
      setTokenImage(
        `https://ipfs.io/${currentToken?.metadata?.image?.split(":")?.join("")}`
      );
    else if (isCloudheadzCollection)
      setTokenImage(currentToken?.metadata?.cached_image);
    else if (isCommunityCollection)
      setTokenImage(
        currentToken?.fileLinkCDN?.length
          ? currentToken?.fileLinkCDN
          : currentToken?.metadata?.image
      );
  }, [params?.contractAddress, currentToken]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCloseModal = () => {
    onClose();

    if (isCreatedNFT) ACTIONS.SET_CREATE_BUTTON(dispatch, false, {}, false);
  };

  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onCloseModal}
      withCrossIcon
      className={`px-[20px] py-[24px] max-w-[458px] ${
        isOffer ? "max-h-[596px]" : "max-h-[694px]"
      }`}
    >
      <p className={"modal__title"}>Success! 🎉</p>
      <p className={"modal__text successModal__text--top"}>{text}</p>

      <div className="successModal__image">
        {isNFKeyCollection ? (
          <img src={currentToken?.spaceThumbnail} alt={""} />
        ) : (
          <img alt={""} src={tokenImage} />
        )}
      </div>

      {isOffer ? (
        <div className={"successModal__block"}>
          <div>
            <p className={"modal__text"}>Status</p>
            <p className={"modal__text modal__text--success"}>Successful</p>
          </div>
          <div>
            <p className={"modal__text"}>Transaction ID</p>
            <a
              href={`https://testnet.snowtrace.io/tx/${transactionAddress}`}
              target="_blank"
              rel="noreferrer"
              className={"modal__text"}
              style={{ textDecoration: "none" }}
            >
              {transactionAddress.slice(0, 9) +
                "..." +
                transactionAddress?.slice(-9)}
            </a>
          </div>
        </div>
      ) : (
        <>
          <p className={"modal__text successModal__text--bottom"}>
            Share it on Twitter, or turn it into physical merchandise like wall
            art, t-shirts, hoodies, and more...
          </p>
          {!isMobile && (
            <div className="singleCollectionPage__socials justify-center  ">
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
        </>
      )}
      <div className="flex mt-10 gap-[11px]">
        <MarketplaceButton isWhite title={"Close"} onClick={onCloseModal} />
        <MarketplaceButton
          isBlue
          title={"Create Merch"}
          onClick={onCloseModal}
        />
      </div>
    </Modal>
  );
};

export default SuccessModal;
