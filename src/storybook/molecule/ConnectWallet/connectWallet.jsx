import React from "react";
import "./style.scss";

const ConnectWallet = ({
  isLoading,
  isMobile,
  isNotConnected,
  openConnectWalletModal,
}) => {
  return (
    <div className="homePage__info">
      {!isLoading && (
        <div className="homePage__info-buttonBlock">
          <button
            className={
              isNotConnected ? "button not-connected_button" : "button"
            }
            onClick={openConnectWalletModal}
          >
            {isNotConnected
              ? isMobile
                ? "Connect Wallet"
                : "Connect Wallet and Mint your Key"
              : "Connect Wallet"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
