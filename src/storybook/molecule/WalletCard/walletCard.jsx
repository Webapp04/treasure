import React, { useState } from "react";
import classNames from "classnames";
import "./style.scss";
import Icon from "storybook/atom/Icon/icon";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import { FOOTER_WALLET_ADDRESS } from "constant/singleNFTPage";

const WalletCard = ({ isMobile }) => {
  const [isCopied, setIsCopied] = useState(-1);
  const [isCopiedWallet, setIsCopiedWallet] = useState(-1);

  const onCopyImg = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(index);
      setTimeout(() => setIsCopied(-1), 3000);
    });
  };

  const onCopyImgWallet = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopiedWallet(index);
      setTimeout(() => setIsCopiedWallet(-1), 3000);
    });
  };

  console.log(FOOTER_WALLET_ADDRESS, "kkk");
  return (
    <div className="wallet__card--wrapper">
      {FOOTER_WALLET_ADDRESS?.map((item, key) => (
        <div key={key} className="card__view">
          <p>{item.label}</p>
          <div className="wallet-tab">
            <div className="wallet_tab--copytext">
              <Tooltip
                className={classNames("", {
                  copied: isCopied === key,
                  not__copied: isCopied !== key,
                })}
                title={isCopied === key ? "Copied  ✓" : "Copy contract address"}
              >
                <div onClick={() => onCopyImg(item.addr, key)} className="">
                  {item.addr.slice(0, 4) + "..." + item.addr.slice(-4)}
                </div>
              </Tooltip>
            </div>
            <div className="wallet_tab--icon">
              <Tooltip title="View on Snowtrace.io">
                <a
                  href={`https://testnet.snowtrace.io/address/${item.addr}`}
                  target="_blank"
                >
                  <Icon iconName={"eye"} />
                </a>
              </Tooltip>
            </div>

            {item.addable && (
              <div className="wallet_tab--icon">
                <Tooltip
                  className={classNames("", {
                    copied: isCopied === key,
                    not__copied: isCopied !== key,
                  })}
                  title={
                    isCopiedWallet === key
                      ? "Copied  ✓"
                      : "Copy contract address"
                  }
                >
                  <span
                    className="wallet_walletIcon"
                    onClick={() => onCopyImgWallet(item.addr, key)}
                  >
                    <Icon iconName={"wallet"} />
                  </span>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletCard;
