import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Icon from "storybook/atom/Icon/icon";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MARKETPLACE, NAVIGATION_LIST } from "constant/navigation";
import { setActiveNavLink } from "utils";
import Profile from "../Profile/profile";
import useWindowDimensions from "hooks/useWidowDimensions";
import logoLightIcon from "../../atom/Icon/svg/logo-dark.svg";
import logoDarkIcon from "../../atom/Icon/svg/logo-dark.svg";
import Icon_Wallet from "../../atom/Icon/svg/icon-wallet.svg";
import avatarPlaceholder from "../../atom/Icon/svg/avatar.jpg";
import AccountCard from "../AccountCard/accountCard";
import TotalRewardTab from "../TotalRewardTab/totalRewardTab";
import Faucet from "../Faucet/faucet";
import Modal from "storybook/atom/Modal/modal";

const Navbar = ({
  theme = "dark",
  totalTRESRBalance = 0,
  loaderComponentActive,
  user,
  isDark = true,
  balanceAvax = 1.969,
  openConnectWalletModal,
  titleWalletAddress = "0x8905849EAe2FE48A199009CBc8D26018e5D36627",
  navigateToAccount,
  avaxBalance = 0,
  balanceSmrtr = 0,
  balanceTresr = 0,
  veClaimedTresr = 0,
  balanceLpSMRTRAVAX = 0,
  balanceLpTRESRAVAX = 0,
  onDisconnect = () => {},
  onGetTresr = () => {},
  onGetSmrtr = () => {},
  onGetTresrLP = () => {},
  onGetSmrtrLP = () => {},
  handleLoader = () => {},
  handleAuth = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const walletRef = useRef();
  const windowDimensions = useWindowDimensions();
  const isMobile = windowDimensions?.width <= 850;
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [showFaucet, toggleFaucet] = useState(false);
  const handleToggleFaucet = () => toggleFaucet(!showFaucet);

  const onHome = () => navigate("/");

  const onToggleAccount = () => {
    if (!user?.wallet_id) handleLoader.loaderWrapper(handleAuth.login, 2);
    else setIsAccountOpen(!isAccountOpen);
  };

  useEffect(() => {
    if (window) {
      const walletContainer = document.getElementsByClassName(
        "profileBarAccountOpen"
      );
      document?.addEventListener("click", (event) => {
        if (!walletRef?.current?.contains(event?.target)) {
          setIsAccountOpen(false);
        }
      });
    }
  }, []);

  return (
    <>
      <header className="Header">
        {!isMobile && (
          <div className="Header__wrapper desktop">
            <div className="Header__Container">
              <div className="Header__nav">
                <img
                  src={theme === "dark" ? logoLightIcon : logoDarkIcon}
                  alt=""
                  onClick={onHome}
                />
                <nav>
                  {NAVIGATION_LIST?.map((link) => {
                    return (
                      <NavLink
                        className={setActiveNavLink}
                        to={link?.path}
                        key={link?.label}
                        target={
                          link?.label === MARKETPLACE ? "_blank" : "_self"
                        }
                      >
                        {link.label}
                        {location?.pathname === link?.path && (
                          <div className="Header__nav--decorator" />
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
              <div className="Header_Controls">
                {location?.pathname === "/game" && (
                  <TotalRewardTab
                    totalTRESRBalance={totalTRESRBalance}
                    loaderComponentActive={loaderComponentActive}
                    tooltipTitle="Est for all keys"
                    tooltipPosition="bottom"
                  />
                )}
                <Profile
                  user={user}
                  isDark={isDark}
                  balanceAvax={balanceAvax}
                  isAccountOpen={isAccountOpen}
                  setIsAccountOpen={setIsAccountOpen}
                  openConnectWalletModal={openConnectWalletModal}
                  titleWalletAddress={titleWalletAddress}
                  navigateToAccount={navigateToAccount}
                  avaxBalance={avaxBalance}
                  balanceSmrtr={balanceSmrtr}
                  balanceTresr={balanceTresr}
                  veClaimedTresr={veClaimedTresr}
                  balanceLpSMRTRAVAX={balanceLpSMRTRAVAX}
                  balanceLpTRESRAVAX={balanceLpTRESRAVAX}
                  onDisconnect={onDisconnect}
                />
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div className="Header__wrapper mobile">
            <div className="firstHeaderRow">
              <img
                src={theme === "dark" ? logoLightIcon : logoDarkIcon}
                alt=""
                onClick={onHome}
              />
              <div className="firstHeaderRow--controls">
                <div className={"Header__balance--container"} ref={walletRef}>
                  <button
                    className={`${user?.wallet_id ? "connected" : ""} button`}
                    style={{ background: "none" }}
                    onClick={onToggleAccount}
                  >
                    {!!user ? (
                      <img
                        src={!!user?.avatar ? user?.avatar : avatarPlaceholder}
                        className={"Header__avatar"}
                        alt={""}
                      />
                    ) : (
                      <img
                        src={Icon_Wallet}
                        className={"Header__avatar"}
                        alt={""}
                      />
                    )}
                  </button>
                </div>
                <div
                  className="burger-menu"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <Icon
                    iconName={theme === "dark" ? "burgerDark" : "burgerLight"}
                    alt=""
                  />
                </div>
              </div>
            </div>
            {showSidebar && (
              <div className="Header__sidebar">
                <nav>
                  {NAVIGATION_LIST.map((item, key) => (
                    <NavLink
                      className={setActiveNavLink}
                      to={item.path}
                      key={key}
                      onClick={() => setShowSidebar(!showSidebar)}
                      target={item?.label === MARKETPLACE ? "_blank" : "_self"}
                    >
                      <div className="flex flex-grow">
                        <span className="mr-8"></span>
                        {item.label}
                      </div>
                    </NavLink>
                  ))}
                </nav>
                <Faucet
                  user={user}
                  showFaucet={showFaucet}
                  handleToggleFaucet={handleToggleFaucet}
                  onGetTresr={onGetTresr}
                  onGetSmrtr={onGetSmrtr}
                  onGetTresrLP={onGetTresrLP}
                  onGetSmrtrLP={onGetSmrtrLP}
                />
              </div>
            )}
          </div>
        )}
      </header>
      {isMobile && (
        <Modal
          isModalOpen={isAccountOpen}
          handleClose={() => setIsAccountOpen(false)}
        >
          <AccountCard
            isDark={isDark}
            isMobile={isMobile}
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
        </Modal>
      )}
    </>
  );
};

export default Navbar;
