import React, { useState, useEffect } from "react";
import "./style.scss";
import useHandleAuction from "../../../../hooks/blockchain/useHandleAuction";
import { ALERT_STATUS_SUCCESS } from "../../../../constant/alert";
import CurrencyInput from "../../Inputs/CurrencyInput";
import { AVAILABLE_CURRENCY } from "../../../../constant/singleNFTPage";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import useCommon from "../../../../hooks/useCommon";
import useHandleLoader from "../../../../hooks/loader/useHandleLoader";
import {
  COMMUNITY_COLLECTION_ADDRESS,
  NFKEY_COLLECTION_ADDRESS,
} from "../../../../constant/blockchain";
import moment from "moment";
import MarketplaceButton from "../../MarketplaceButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAvaxBalance } from "redux/slice/balanceSlice";
import { selectUser } from "redux/slice/userSlice";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";

const TABS = {
  INFO: "info",
  PLACE_BID: "placeBid",
};

const PlaceBidModal = ({
  isOpen,
  onClose,
  auction,
  token,
  lastBid,
  onCloseTransactionLoadingModal,
  onOpenTransactionLoadingModal,
  totalCollectionAmount,
}) => {
  const dispatch = useDispatch();
  const { startPrice, bidStep } = auction;
  const { addCommasToNumber } = useCommon();
  const handleAuction = useHandleAuction();
  const handleNFT = useHandleNFT();
  const handleLoader = useHandleLoader();
  const user = useSelector(selectUser);
  const avaxBalance = useSelector(selectAvaxBalance);
  const [tokenImage, setTokenImage] = useState("");
  const params = useParams();
  const isNFKeyCollection =
    params?.contractAddress === NFKEY_COLLECTION_ADDRESS;
  const isCommunityCollection =
    params?.contractAddress === COMMUNITY_COLLECTION_ADDRESS;

  const [price, setPrice] = useState("0.00");
  const [activeTab, setActiveTab] = useState(TABS.PLACE_BID);
  const [selectedCurrency, setSelectedCurrency] = useState(
    AVAILABLE_CURRENCY[0]
  );
  const [tokenBalance, setTokenBalance] = useState("0");
  const AUCTION_MESSAGE_SUCCESS = `Your bid for NFT#${
    token?.tokenId || token?.tokenID
  } has been submitted`;

  const selectedCurrencyValue = () =>
    AVAILABLE_CURRENCY.filter(
      (currency) => currency.address === auction.tokenAddress
    )[0];

  useEffect(() => {
    if (auction?.tokenAddress !== selectedCurrency?.tokenAddress)
      setSelectedCurrency(selectedCurrencyValue());
    balanceOfERC20Token();
  }, [token, auction]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeModal = () => {
    setActiveTab(TABS.PLACE_BID);
    onClose();
  };

  const nextStep = () => setActiveTab(TABS.PLACE_BID);

  const onChangePrice = (event) => {
    if (+event?.target?.value || "0") setPrice(event?.target?.value);
  };

  const balanceOfERC20Token = async () => {
    const balanceERC20 = await handleNFT.balanceOfERC20(
      user?.wallet_id,
      auction?.tokenAddress
    );
    setTokenBalance(balanceERC20);
  };

  const placeBid = () => {
    /* global BigInt */
    const value = BigInt(price * 10 ** 18).toString();
    closeModal();
    onOpenTransactionLoadingModal();

    if (!auction.isToken) {
      handleAuction
        .bid(token.contractAddress, token.tokenId, value)
        .then(() => {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_SUCCESS,
            AUCTION_MESSAGE_SUCCESS,
            token?.image
          );
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
        });
    } else {
      handleNFT
        .approveSMRTRtoContract(
          process.env.REACT_APP_MARKETPLACE_AUCTION_ADDRESS,
          value
        )
        .then(() => {
          handleAuction
            .bidToken(token.contractAddress, token.tokenId, value)
            .then(() => {
              ACTIONS.SET_ALERT(
                dispatch,
                true,
                ALERT_STATUS_SUCCESS,
                AUCTION_MESSAGE_SUCCESS,
                token?.image
              );
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
            });
        });
    }
  };

  useEffect(() => {
    if (isCommunityCollection)
      setTokenImage(
        token?.fileLinkCDN?.length ? token?.fileLinkCDN : token?.metadata?.image
      );
  }, [params?.contractAddress, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      handleClose={closeModal}
      isModalOpen={isOpen}
      withCrossIcon
      className={`max-w-[778px] ${
        activeTab === TABS.PLACE_BID ? "max-h-[500px]" : "max-h-[600px]"
      } px-[20px] py-[40px]`}
    >
      <div className={"placeBidModal"}>
        {activeTab === TABS.INFO && (
          <>
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
                <p className={"modal__text buyModal__text"}>Symbol</p>
                <p className={"modal__text modal__text--blue"}>
                  {isNFKeyCollection ? "NFKEY" : "testC"}
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
              <MarketplaceButton
                title={"Decline"}
                isWhite
                onClick={closeModal}
              />
              <MarketplaceButton title={"Accept"} isBlue onClick={nextStep} />
            </div>
          </>
        )}
        {activeTab === TABS.PLACE_BID && (
          <>
            <p className="modal__title">Place a bid</p>
            <div className="placeBidModal__bid">
              <div className={"listingTab__nft"}>
                {isNFKeyCollection ? (
                  <img
                    src={token?.spaceThumbnail}
                    className={"listingTab__nft--image"}
                    alt={""}
                  />
                ) : (
                  <img
                    src={tokenImage}
                    alt={""}
                    className="listingTab__nft--image"
                  />
                )}
                <p className={"modal__boldText"}>
                  {token?.metadata?.name} #{token?.tokenId || token?.tokenID}
                </p>
                <p className={"listingTab__nft--desc"}>{token?.name}</p>
              </div>

              <div className="placeBidModal__bid--form">
                <div className="placeBidModal__bid--form__header">
                  <p className="modal__text">Offer amount</p>
                  <p className="modal__text modal__text--small">
                    Balance:
                    {selectedCurrency?.label === "AVAX" ? (
                      <>{avaxBalance.toFixed(4)} AVAX</>
                    ) : (
                      <>
                        {addCommasToNumber(tokenBalance)}{" "}
                        {selectedCurrency?.label}
                      </>
                    )}
                  </p>
                </div>
                {selectedCurrency?.label && (
                  <CurrencyInput
                    selectedCurrency={selectedCurrency}
                    isOpenCurrencyList={false}
                    price={price}
                    hideCurrencyList={true}
                    onChangePrice={onChangePrice}
                  />
                )}
                <div className="placeBidModal__bid--form__minBid">
                  Minimum bid:{" "}
                  {lastBid.price === 0
                    ? addCommasToNumber(startPrice)
                    : addCommasToNumber(lastBid.price + bidStep)}{" "}
                  {selectedCurrency?.label}
                </div>
                <div className="placeBidModal__bid--form__minBid">
                  Bid step: {addCommasToNumber(bidStep)}{" "}
                  {selectedCurrency?.label}
                </div>
                <div className="placeBidModal__bid--form__buttons">
                  <MarketplaceButton onClick={closeModal} title="Cancel" />
                  <MarketplaceButton
                    onClick={placeBid}
                    title="Place a bid"
                    isBlue
                    disabled={Number(price) <= 0}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PlaceBidModal;
