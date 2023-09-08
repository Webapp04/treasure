import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./style.scss";
import useCommon from "hooks/useCommon";
import avatarPlaceholder from "../../../assets/images/marketplace/avatar.jpg";
import smrtrImg from "../../../assets/images/smrtr.png";
import smrtrLpImg from "../../../assets/images/smrtr_lp.png";
import Icon from "storybook/atom/Icon/icon";

const AccountCard = ({
  isDark,
  isMobile,
  user,
  isAccountOpen,
  navigateToAccount,
  balanceAvax,
  balanceSmrtr,
  balanceTresr,
  veClaimedTresr,
  balanceLpSMRTRAVAX,
  balanceLpTRESRAVAX,
  onDisconnect,
}) => {
  const textRef = useRef();
  const { americanFormatNumber } = useCommon();
  const [isCopied, setIsCopied] = useState(false);
  const [timerID, setTimerID] = useState(0);

  useEffect(() => {
    clearInterval(timerID);
    return () => clearInterval(timerID);
  }, []);

  const onCopyImg = () => {
    navigator.clipboard.writeText(textRef?.current?.value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    });
  };
  return (
    <div
      className={`profileBarAccountOpen ${
        isAccountOpen ? "profileBarAccountOpen__visible" : ""
      } ${isMobile ? "profileBarAccountOpen_mobile" : ""}`}
    >
      {isMobile ? (
        <></>
      ) : (
        <div className="profileBarAccountOpen__arrow">
          <img
            src="http://localhost:3001/static/media/account_arrow_dark.d951b561d097e36393b52d02ebf92b9e.svg"
            alt=""
          />
        </div>
      )}
      <p style={{ color: "#fff" }}>sdkhvbkh</p>
      <div className="profileBarAccountOpen__account">
        <img
          className="profileBarAccountOpen__avatar"
          src={user?.avatar ? user?.avatar : avatarPlaceholder}
          alt=""
        />
        <div>
          <p className="profileBarAccountOpen__network">Avalanche</p>
          <div
            className="profileBarAccountOpen__address--container"
            onClick={onCopyImg}
          >
            <span
              className={`profileBarAccountOpen__address ${
                isCopied && "profileBarAccountOpen__address--copied"
              }`}
            >
              {isCopied
                ? "Copied to Clipboard"
                : user?.wallet_id?.slice(0, 9) +
                  "..." +
                  user?.wallet_id?.slice(-5)}
            </span>
            <input
              value={user?.wallet_id}
              ref={textRef}
              hidden
              onChange={() => {}}
            />
            <div
              className={`profileBarAccountOpen__address--img 
                ${isCopied && "profileBarAccountOpen__address--imgCopied"}`}
            />
          </div>
        </div>
      </div>
      <div
        className="profileBarAccountOpen__profileIcon"
        onClick={navigateToAccount}
      >
        <Icon iconName={isDark ? "userLight" : "userDark"} />
      </div>
      <div className="profileBarAccountOpen__wallet">
        <div className="profileBarAccountOpen__profile">
          <Icon iconName={"avaxImg"} />
          <p className="profileBarAccountOpen__network">{balanceAvax} AVAX</p>
        </div>
        <div className="profileBarAccountOpen__profile">
          <img src={smrtrImg} alt="smrtrImg" />
          <p className="profileBarAccountOpen__network">{balanceSmrtr} SMRTR</p>
        </div>
        <div className="profileBarAccountOpen__profile">
          <Icon iconName={"tresrImg"} />
          <p className="profileBarAccountOpen__network">{balanceTresr} TRESR</p>
        </div>
        <div className="profileBarAccountOpen__profile">
          <Icon iconName={"tresrImg"} />
          <p className="profileBarAccountOpen__network">
            {americanFormatNumber(veClaimedTresr, 3)} veTRESR
          </p>
        </div>
        <div className="profileBarAccountOpen__profile">
          <img src={smrtrLpImg} alt="smrtrLpImg" />
          <p className="profileBarAccountOpen__network profileBarAccountOpen__network--lp">
            {balanceLpSMRTRAVAX} SMRTR AVAX LP
          </p>
        </div>
        <div className="profileBarAccountOpen__profile">
          <Icon iconName={"tresrLPImg"} />
          <p className="profileBarAccountOpen__network profileBarAccountOpen__network--lp">
            {balanceLpTRESRAVAX} TRESR AVAX LP
          </p>
        </div>
      </div>
      <div
        className="profileBarAccountOpen__profile profileBarAccountOpen__disconnect"
        onClick={onDisconnect}
      >
        <Icon iconName={isDark ? "disconnectLight" : "disconnectDark"} />
        <p className="profileBarAccountOpen__address">Disconnect</p>
      </div>
    </div>
  );
};

export default AccountCard;
