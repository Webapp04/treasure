import { useEffect, useState } from "react";
import {
  ALERT_STATUS_INFO,
  AUCTION_CANCELED,
  AUCTION_CREATED,
  AUCTION_FINALIZED,
  BID_SUCCESS,
  LISTING_BUYING,
  LISTING_CANCELED,
  LISTING_CHANGED,
  LISTING_CREATED,
  OFFER_ACCEPTED,
  OFFER_CANCELED,
  OFFER_CREATED,
  TRANSFER_EVENT,
} from "../../constant/alert";
import { useLocation } from "react-router-dom";
import useHandleNFT from "../blockchain/useHandleNFT";
import {
  EVENT_ACCEPT_OFFER,
  EVENT_AUCTION_CANCELED,
  EVENT_AUCTION_CREATED,
  EVENT_AUCTION_FINALIZED,
  EVENT_BID_SUCCESS,
  EVENT_BUYING_LISTING,
  EVENT_CANCEL_LISTING,
  EVENT_CANCELED_OFFER,
  EVENT_CHANGED_LISTING,
  EVENT_CREATED_LISTING,
  EVENT_CREATED_OFFER,
  EVENT_TRANSFER,
} from "../../constant/blockchain";
import { useDispatch, useSelector } from "react-redux";
import { selectNftList } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import ACTIONS from "redux/action";
import { selectProvider } from "redux/slice/providerSlice";

export default function useHandleSocket() {
  const provider = useSelector(selectProvider);
  const nftLists = useSelector(selectNftList);
  const user = useSelector(selectUser);
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const handleNFT = useHandleNFT();
  const dispatch = useDispatch();

  const init = () => ACTIONS.SET_SYNC(dispatch);

  const messageHandler = () => {
    const data = message?.data?.length
      ? JSON.parse(message?.data)
      : message?.data;
    const currentToken = nftLists?.find(
      (item) =>
        item?.contractAddress?.toLowerCase() ===
          data?.nftAddress?.toLowerCase() &&
        item?.tokenId?.toString() === data?.tokenID
    );

    if (data?.confirmed) {
      switch (message?.action) {
        case EVENT_CREATED_LISTING: {
          if (
            location.pathname?.includes(
              `${currentToken?.contractAddress}/${currentToken?.tokenId}`
            ) &&
            user?.wallet_id?.toLowerCase() !== data?.owner?.toLowerCase()
          ) {
            ACTIONS.SET_ALERT(
              dispatch,
              true,
              ALERT_STATUS_INFO,
              LISTING_CREATED(data?.tokenID),
              currentToken?.image
            );
            handleNFT.reloadNFTItemBalance(
              currentToken?.contractAddress,
              currentToken?.tokenId
            );
          }
          break;
        }

        case EVENT_BUYING_LISTING: {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_INFO,
            LISTING_BUYING(data?.tokenID),
            currentToken?.image
          );
          handleNFT.reloadNFTItemBalance(
            currentToken?.contractAddress,
            currentToken?.tokenId
          );
          break;
        }

        case EVENT_CANCEL_LISTING: {
          if (
            location.pathname?.includes(
              `${currentToken?.contractAddress}/${currentToken?.tokenId}`
            ) &&
            user?.wallet_id?.toLowerCase() !== data?.owner?.toLowerCase()
          ) {
            ACTIONS.SET_ALERT(
              dispatch,
              true,
              ALERT_STATUS_INFO,
              LISTING_CANCELED(data?.tokenID),
              currentToken?.image
            );
            handleNFT.reloadNFTItemBalance(
              currentToken?.contractAddress,
              currentToken?.tokenId
            );
          }
          break;
        }

        case EVENT_CHANGED_LISTING: {
          if (
            location.pathname?.includes(
              `${currentToken?.contractAddress}/${currentToken?.tokenId}`
            ) &&
            user?.wallet_id?.toLowerCase() !== data?.owner?.toLowerCase()
          ) {
            ACTIONS.SET_ALERT(
              dispatch,
              true,
              ALERT_STATUS_INFO,
              LISTING_CHANGED(data?.tokenID),
              currentToken?.image
            );
            handleNFT.reloadNFTItemBalance(
              currentToken?.contractAddress,
              currentToken?.tokenId
            );
          }
          break;
        }

        case EVENT_ACCEPT_OFFER: {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_INFO,
            OFFER_ACCEPTED(data?.tokenID),
            currentToken?.image
          );
          handleNFT.reloadNFTItemBalance(
            currentToken?.contractAddress,
            currentToken?.tokenId
          );
          break;
        }

        case EVENT_CREATED_OFFER: {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_INFO,
            OFFER_CREATED(data?.tokenID),
            currentToken?.image
          );
          handleNFT.reloadNFTItemBalance(
            currentToken?.contractAddress,
            currentToken?.tokenId
          );
          break;
        }

        case EVENT_CANCELED_OFFER: {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_INFO,
            OFFER_CANCELED(data?.tokenID),
            currentToken?.image
          );
          handleNFT.reloadNFTItemBalance(
            currentToken?.contractAddress,
            currentToken?.tokenId
          );
          break;
        }

        case EVENT_TRANSFER: {
          if (
            location.pathname?.includes(
              `${currentToken?.contractAddress}/${currentToken?.tokenId}`
            ) &&
            user?.wallet_id?.toLowerCase() !== data?.owner?.toLowerCase()
          ) {
            ACTIONS.SET_ALERT(
              dispatch,
              true,
              ALERT_STATUS_INFO,
              TRANSFER_EVENT(data?.tokenID),
              currentToken?.image
            );
            handleNFT.reloadNFTItemBalance(
              currentToken?.contractAddress,
              currentToken?.tokenId
            );
          }
          break;
        }

        case EVENT_AUCTION_CREATED: {
          if (
            location.pathname?.includes(
              `${currentToken?.contractAddress}/${currentToken?.tokenId}`
            ) &&
            user?.wallet_id?.toLowerCase() !== data?.owner?.toLowerCase()
          ) {
            ACTIONS.SET_ALERT(
              dispatch,
              true,
              ALERT_STATUS_INFO,
              AUCTION_CREATED(data?.tokenID),
              currentToken?.image
            );
            handleNFT.reloadNFTItemBalance(
              currentToken?.contractAddress,
              currentToken?.tokenId
            );
          }
          break;
        }

        case EVENT_AUCTION_CANCELED: {
          if (
            location.pathname?.includes(
              `${currentToken?.contractAddress}/${currentToken?.tokenId}`
            ) &&
            user?.wallet_id?.toLowerCase() !== data?.owner?.toLowerCase()
          ) {
            ACTIONS.SET_ALERT(
              dispatch,
              true,
              ALERT_STATUS_INFO,
              AUCTION_CANCELED(data?.tokenID),
              currentToken?.image
            );
            handleNFT.reloadNFTItemBalance(
              currentToken?.contractAddress,
              currentToken?.tokenId
            );
          }
          break;
        }

        case EVENT_AUCTION_FINALIZED: {
          if (
            location.pathname?.includes(
              `${currentToken?.contractAddress}/${currentToken?.tokenId}`
            ) &&
            user?.wallet_id?.toLowerCase() !== data?.owner?.toLowerCase()
          ) {
            ACTIONS.SET_ALERT(
              dispatch,
              true,
              ALERT_STATUS_INFO,
              AUCTION_FINALIZED(data?.tokenID),
              currentToken?.image
            );
            handleNFT.reloadNFTItemBalance(
              currentToken?.contractAddress,
              currentToken?.tokenId
            );
          }
          break;
        }
        case EVENT_BID_SUCCESS: {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_INFO,
            BID_SUCCESS(data?.tokenID),
            currentToken?.image
          );
          handleNFT.reloadNFTItemBalance(
            currentToken?.contractAddress,
            currentToken?.tokenId
          );
          break;
        }

        default:
          break;
      }
    }

    setMessage(null);
  };

  useEffect(() => {
    if (message?.action) messageHandler();
  }, [message]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (provider?.addListener) provider?.addListener(setMessage);
  }, [provider]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    init,
  };
}
