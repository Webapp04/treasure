import "react-toastify/dist/ReactToastify.css";
import "../style.scss";
import React from "react";
import useHandleNFT from "../../../hooks/blockchain/useHandleNFT";
import { useLocation } from "react-router-dom";
import TransactionLoadingModal from "../../common/Modals/TransactionLoadingModal";
import useHandleModal from "../../../hooks/dom/useHandleModal";
import useHandleLoader from "../../../hooks/loader/useHandleLoader";
import useHandleAuth from "../../../hooks/auth/useHandleAuth";
import WalletConnectModal from "../../common/Modals/WalletConnectModal";
import { walletconnect } from "../../../utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function HomeMint() {
  const user = useSelector(selectUser);
  const location = useLocation();
  const handleLoader = useHandleLoader();
  const handleAuth = useHandleAuth();
  const handleTransactionLoadingModal = useHandleModal();
  const handleWalletConnectModal = useHandleModal();
  const isGame = location?.pathname?.includes("/game");
  const navigate = useNavigate();

  const context = useWeb3React();
  const { activate } = context;

  const handleWalletConnect = async () => {
    await activate(
      walletconnect,
      (error) => {
        console.warn(error?.message);
      },
      true
    );
  };

  const onConnectWallet = () => handleLoader.loaderWrapper(handleAuth.login, 2);
  const onOpenConnectWallet = () => handleWalletConnectModal.open();

  return (
    <>
      <div
        className={`${
          isGame
            ? "dashboard__data__content--form__selectedToken homePage__info--dashboard"
            : "homePage__info--container"
        }`}
      >
        {isGame && (
          <div
            className={"dashboard__data__content--form__selectedToken--wrapper"}
          >
            <video
              src={
                "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/10/400x400.mp4"
              }
              loop
              autoPlay
            />
          </div>
        )}

        <div
          className={`${
            isGame ? "homePage__info--container" : "homePage__info"
          }`}
        >
          <div
            className={`homePage__info-title ${
              isGame ? "homePage__info-title__dashboard" : ""
            }`}
          >
            Mint Your Founder's Key
          </div>
          {isGame ? (
            <div className="homePage__info-text">
              You have no keys. Mint your NFKey to start earning TRESR
            </div>
          ) : (
            <div className="homePage__info-count">
              Founder’s Key is a "Generation 0 Passport" that gives Diamond
              Tiers from{" "}
              <a
                href={"https://smarterswap.xyz/search"}
                target="_blank"
                rel="noreferrer"
              >
                SmarterSwap.xyz
              </a>{" "}
              early access to the NFTreasure defi loop, NFT marketplace,
              additional rewards, and marks you as a founder in the new project
              concept.
            </div>
          )}
          <div className="homePage__info-price">5 $AVAX + Gas</div>
          <div className="homePage__info--actions">
            <button
              className={`button ${isGame ? "button__dashboard" : ""}`}
              onClick={
                user?.wallet_id ? () => navigate("/") : onOpenConnectWallet
              }
            >
              {user?.wallet_id ? "Mint" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>

      {handleWalletConnectModal.isActive && (
        <WalletConnectModal
          isOpen={handleWalletConnectModal.isActive}
          onClose={handleWalletConnectModal.close}
          connectMetamask={onConnectWallet}
          connectWalletConnect={handleWalletConnect}
        />
      )}

      {handleTransactionLoadingModal.isActive && (
        <TransactionLoadingModal
          isOpen={handleTransactionLoadingModal.isActive}
        />
      )}
    </>
  );
}
