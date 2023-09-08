import React, { useState, useEffect } from "react";
import "./style.scss";
import { MODAL_TAB_MENU_ITEMS } from "../../../../constant/singleNFTPage";
import ListingTab from "./ListingTab";
import AuctionTab from "./AuctionTab";
import useWindowDimensions from "../../../../hooks/useWidowDimensions";
import {
  CLOUDHEADS_COLLECTION_ADDRESS,
  COMMUNITY_COLLECTION_ADDRESS,
  DOODLEVERSE_COLLECTION_ADDRESS,
  HAPPY_SUN_COLLECTION_ADDRESS,
  JOEPEGS_COLLECTION_ADDRESS,
  MORE_SATOS_COLLECTION_ADDRESS,
  VIN_TAGE_TAPE_COLLECTION_ADDRESS,
} from "../../../../constant/blockchain";
import { useParams } from "react-router-dom";
import RaffleTab from "./RaffleTab";
import Modal from "storybook/atom/Modal/modal";

const SellModal = ({
  isOpen,
  onClose,
  onOpenCheckoutModal,
  onOpenAuctionModal,
  token,
  setSellData,
  setAuctionData,
}) => {
  const [activeTab, setActiveTab] = useState(MODAL_TAB_MENU_ITEMS[2].value);
  const [tokenImage, setTokenImage] = useState("");
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 750;
  const params = useParams();
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
      isModalOpen={isOpen}
      handleClose={onClose}
      withCrossIcon
      className={`max-h-[530px] px-[20px] py-[40px] ${
        isMobile ? "max-w-[500px]" : "max-w-[775px]"
      }`}
    >
      <div className="sellModal__tabs">
        {MODAL_TAB_MENU_ITEMS.map((tab, key) => (
          <div
            key={key}
            className={`sellModal__tabs--item ${
              activeTab === tab.value ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {activeTab === "listing" && (
        <ListingTab
          setSellData={setSellData}
          onClose={onClose}
          onOpenCheckoutModal={onOpenCheckoutModal}
          token={token}
          image={tokenImage}
        />
      )}
      {activeTab === "auction" && (
        <AuctionTab
          setAuctionData={setAuctionData}
          onClose={onClose}
          onOpenCheckoutModal={onOpenAuctionModal}
          token={token}
          image={tokenImage}
        />
      )}

      {activeTab === "raffle" && <RaffleTab />}
    </Modal>
  );
};

export default SellModal;
