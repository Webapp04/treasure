import React, { useState, useEffect } from "react";
import "./style.scss";
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
import { useParams } from "react-router-dom";
import Modal from "storybook/atom/Modal/modal";

const SuccessAuctionModal = ({ isOpen, onClose, token }) => {
  const params = useParams();
  const [tokenImage, setTokenImage] = useState("");
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

  const SUCCESS_AUCTION_TEXT = `Your NFT#${
    token?.tokenId || token?.tokenID
  } is successfully put on Auction.`;

  useEffect(() => {
    if (isJoepegsCollection)
      setTokenImage(
        `https://ipfs.io/${token?.metadata?.image?.split(":")?.join("")}`
      );
    else if (isCloudheadzCollection)
      setTokenImage(token?.metadata?.cached_image);
    else if (isCommunityCollection)
      setTokenImage(
        token?.fileLinkCDN?.length ? token?.fileLinkCDN : token?.metadata?.image
      );
  }, [params?.contractAddress, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className="px-[20px] py-[40px] max-h-[558px] max-w-[458px]"
    >
      <p className={"modal__title"}>Yay! 🎉</p>
      <p className={"modal__text successModal__text--top"}>
        {SUCCESS_AUCTION_TEXT}
      </p>

      <div className="successModal__image">
        {isNFKeyCollection ? (
          <img src={token?.spaceThumbnail} alt={""} />
        ) : (
          <img alt={""} src={tokenImage} />
        )}
      </div>
    </Modal>
  );
};

export default SuccessAuctionModal;
