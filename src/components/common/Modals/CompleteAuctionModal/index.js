import React, { useEffect, useState } from "react";
import MarketplaceButton from "../../MarketplaceButton";
import "./style.scss";
import moment from "moment";
import useHandleAuction from "../../../../hooks/blockchain/useHandleAuction";
import {
  ALERT_STATUS_FAILURE,
  APPROVE_MESSAGE_FAILURE,
} from "../../../../constant/alert";
// import {convertDateToUnix} from "../../../../utils";
import useWindowDimensions from "../../../../hooks/useWidowDimensions";
import { useParams } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";

const CompleteAuctionModal = ({
  isOpen,
  onClose,
  token,
  auctionData,
  setIsApproved,
  onOpenApproveModal,
  // onCloseApproveModal,
  // onOpenSuccessModal
}) => {
  const { price, priceStep, selectedCurrency, selectedTime, selectedDate } =
    auctionData;
  const dispatch = useDispatch();
  const duration = moment(selectedDate?.to)?.diff(
    moment(selectedDate?.from),
    "days"
  );
  const startDate = moment(selectedDate?.from).format("D MMM");
  // const blockDeadline = convertDateToUnix(selectedDate?.to, selectedTime?.timeEnd)
  const handleAuction = useHandleAuction();
  const windowParams = useWindowDimensions();
  const params = useParams();
  const [tokenImage, setTokenImage] = useState("");
  const isMobile = windowParams?.width <= 750;
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

  const onApproveToken = () => {
    if (!token || !auctionData) return;
    onClose();
    onOpenApproveModal();

    handleAuction
      .approveAuction(token?.tokenId, params?.contractAddress)
      .then(async (transaction) => {
        if (transaction.status === 1) {
          setIsApproved(true);
        } else {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            APPROVE_MESSAGE_FAILURE,
            token?.image
          );
        }
      })
      .catch(() => {
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          APPROVE_MESSAGE_FAILURE,
          token?.image
        );
      });
  };

  // const onStartAuction = () => {
  //     if (!token || !auctionData) return
  //     onClose()
  //     onOpenApproveModal()
  //
  //     handleAuction
  //         .approveAuction(token?.tokenId, params?.contractAddress)
  //         .then(async (transaction) => {
  //             if (transaction.status === 1) {
  //                 setIsApproved(true)
  //
  //                 await handleAuction
  //                     .createAuction(
  //                         token?.contractAddress,
  //                         token?.tokenId || token?.tokenID,
  //                         /* global BigInt */
  //                         BigInt((price * 10 ** 18)).toString(),
  //                         BigInt((priceStep * 10 ** 18)).toString(),
  //                         blockDeadline,
  //                         selectedCurrency.value === 'avax' ? false : true,
  //                         selectedCurrency.address
  //                     )
  //                     .then(async (transaction) => {
  //                         if (transaction?.status) onOpenSuccessModal()
  //                         else ACTION.SET_ALERT(true, ALERT_STATUS_FAILURE, LISTING_MESSAGE_FAILURE, token?.image)
  //                     })
  //                     .catch((err) => {
  //                         ACTION.SET_ALERT(true, ALERT_STATUS_FAILURE, LISTING_MESSAGE_FAILURE, token?.image)
  //                     })
  //
  //
  //             } else {
  //                 ACTION.SET_ALERT(true, ALERT_STATUS_FAILURE, APPROVE_MESSAGE_FAILURE, token?.image)
  //             }
  //         })
  //         .catch(() => {
  //             ACTION.SET_ALERT(true, ALERT_STATUS_FAILURE, APPROVE_MESSAGE_FAILURE, token?.image)
  //         })
  //         .finally(() => {
  //             onCloseApproveModal()
  //             setIsApproved(false)
  //         })
  //
  // }

  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className={`max-h-[530px] px-[20px] py-[40px] ${
        isMobile ? "max-w-[500px]" : "max-w-[775px]"
      }`}
    >
      <p className={"modal__title"}>Complete auction</p>

      <div className={"auctionTab"}>
        <div className={"listingTab__nft"}>
          {isNFKeyCollection ? (
            <img
              src={token?.spaceThumbnail}
              className={"listingTab__nft--image"}
              alt={""}
            />
          ) : (
            <img src={tokenImage} alt={""} className="listingTab__nft--image" />
          )}
          <p className={"modal__boldText"}>
            NFT#{token?.tokenId || token?.tokenID}
          </p>
          <p className={"listingTab__nft--desc"}>{token?.name}</p>
        </div>

        <div className={"auctionTab__data checkout__container"}>
          <div className={"checkout__info"}>
            <div className={"checkout__data"}>
              <p className={"modal__text"}>Start date</p>
              <p
                className={"modal__boldText"}
              >{`${startDate} ${selectedTime?.timeStart}`}</p>
            </div>

            <div className={"checkout__data"}>
              <p className={"modal__text"}>Duration</p>
              <p className={"modal__boldText"}>{duration} days</p>
            </div>

            <div className={"checkout__data"}>
              <p className={"modal__text"}>Services fee</p>
              <p className={"modal__boldText"}>2.5%</p>
            </div>

            <div className={"checkout__data"}>
              <p className={"modal__text"}>Minimum bid</p>
              <p
                className={"modal__boldText"}
              >{`${price} ${selectedCurrency?.label}`}</p>
            </div>

            <div className={"checkout__data"}>
              <p className={"modal__text"}>Price step</p>
              <p
                className={"modal__boldText"}
              >{`${priceStep} ${selectedCurrency?.label}`}</p>
            </div>
          </div>

          <div className={"checkout__fee"}>
            <div className={"checkout__data"}>
              <p className={"modal__text"}>Service fee</p>
              <p className={"modal__boldText"}>2.5 WETH</p>
            </div>

            <div className={"auctionTab__buttons"}>
              <MarketplaceButton title={"Cancel"} onClick={onClose} />
              <MarketplaceButton
                title={"Continue"}
                isBlue
                onClick={onApproveToken}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CompleteAuctionModal;
