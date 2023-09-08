import React, { useState } from "react";
import classNames from "classnames";
import avatarPlaceholder from "../../atom/Icon/svg/avatar.jpg";
import "./style.scss";
import AccountCard from "../AccountCard/accountCard";

const Profile = ({
  user,
  isDark = true,
  balanceAvax = 1.969,
  isAccountOpen = true,
  setIsAccountOpen = () => {},
  openConnectWalletModal,
  titleWalletAddress = "0x8905849EAe2FE48A199009CBc8D26018e5D36627",
  navigateToAccount,
  avaxBalance = 0,
  balanceSmrtr = 0,
  balanceTresr = 0,
  veClaimedTresr = 0,
  balanceLpSMRTRAVAX = 0,
  balanceLpTRESRAVAX = 0,
  onDisconnect,
}) => {
  const onShowAccount = () => {
    if (!user?.wallet_id) return null;
    else setIsAccountOpen(true);
  };

  const onHideAccount = () => {
    setIsAccountOpen(false);
  };

  return (
    <div className="profile__controls">
      <div className="profile__balance--container">
        {!!user?.wallet_id && (
          <div className="profile__balance">{`${balanceAvax} AVAX`}</div>
        )}
        <div
          className="profileBarAccountOpen__container"
          onMouseEnter={onShowAccount}
          onMouseLeave={onHideAccount}
        >
          <button
            className={`${
              user?.wallet_id ? "connected" : "notconnected"
            } button`}
            onClick={!user?.wallet_id ? openConnectWalletModal : null}
          >
            {!!user?.wallet_id ? titleWalletAddress : "Connect wallet"}
            {!!user && (
              <img
                src={!!user?.avatar ? user?.avatar : avatarPlaceholder}
                className={"profile__avatar"}
                alt={""}
              />
            )}
          </button>
          {user && (
            <AccountCard
              isDark={isDark}
              user={user}
              isAccountOpen={isAccountOpen}
              navigateToAccount={navigateToAccount}
              balanceAvax={avaxBalance}
              balanceSmrtr={balanceSmrtr}
              balanceTresr={balanceTresr}
              veClaimedTresr={veClaimedTresr}
              balanceLpSMRTRAVAX={balanceLpSMRTRAVAX}
              balanceLpTRESRAVAX={balanceLpTRESRAVAX}
              onDisconnect={onDisconnect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
