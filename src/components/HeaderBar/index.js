import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.scss";
import useHandleAuth from "../../hooks/auth/useHandleAuth";
import useHandleTheme from "../../hooks/theme/useHandleTheme";
import useCommon from "../../hooks/useCommon";
import useHandleLoader from "../../hooks/loader/useHandleLoader";
import useHandleModal from "../../hooks/dom/useHandleModal";
import WalletConnectModal from "../common/Modals/WalletConnectModal";
import { useWeb3React } from "@web3-react/core";
import { walletconnect } from "../../utils/connectors";
import { toast } from "react-toastify";
import useFaucet from "hooks/blockchain/useFaucet";

import { useSelector } from "react-redux";
import {
  selectAvaxBalance,
  selectLpSMRTRAVAXBalance,
  selectLpTRESRAVAXBalance,
  selectSmrtrBalance,
  selectTresrBalance,
} from "redux/slice/balanceSlice";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import Navbar from "storybook/molecule/Navbar/navbar";
import { selectLoaderComponentActive } from "redux/slice/loaderSlice";

export default function HeaderBar({ setIsAccountOpen, isAccountOpen }) {
  const [totalTRESRBalance, setTotalTRESRBalance] = useState(0);
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  const loaderComponentActive = useSelector(selectLoaderComponentActive);
  const avaxBalance = useSelector(selectAvaxBalance);
  const smrtrBalance = useSelector(selectSmrtrBalance);
  const tresrBalance = useSelector(selectTresrBalance);
  const lpSMRTRAVAXBalance = useSelector(selectLpSMRTRAVAXBalance);
  const lpTRESRAVAXBalance = useSelector(selectLpTRESRAVAXBalance);
  const handleWalletConnectModal = useHandleModal();
  const faucet = useFaucet();
  const handleTransactionLoadingModal = useHandleModal();
  const context = useWeb3React();
  const { library, activate, deactivate } = context;
  const isDark = theme === "dark";
  const navigate = useNavigate();

  useEffect(() => {
    //FIXME: check if this is correct practice
    if (window?.localStorage?.getItem("isWalletConnected") === "true") {
      handleWalletConnect();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let closeBtn = document.querySelector(
      ".walletconnect-modal__close__wrapper"
    );
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        deactivate();
        window?.localStorage?.removeItem("isWalletConnected");
      });
    }
  }, [document.querySelector(".walletconnect-modal__close__wrapper")]); // eslint-disable-line react-hooks/exhaustive-deps

  // const isAccountPage = location?.pathname?.includes('account');
  // const isGame = location?.pathname?.includes('/game');
  // const isMint = location?.pathname === '/';

  const { americanFormatNumber } = useCommon();
  const handleAuth = useHandleAuth();
  const handleTheme = useHandleTheme();
  const handleLoader = useHandleLoader();
  const balanceAvax = americanFormatNumber(avaxBalance, 3);
  const balanceSmrtr = americanFormatNumber(smrtrBalance, 3);
  const balanceTresr = americanFormatNumber(tresrBalance, 3);
  const [veClaimedTresr, setVeClaimedTresr] = useState(0);
  const balanceLpSMRTRAVAX = americanFormatNumber(lpSMRTRAVAXBalance, 3);
  const balanceLpTRESRAVAX = americanFormatNumber(lpTRESRAVAXBalance, 3);
  const titleWalletAddress = `${user?.wallet_id?.substr(
    0,
    6
  )}...${user?.wallet_id?.substr(-4)}`;
  // const filterNavigationList = NAVIGATION_LIST?.filter(item => item?.isUser ? user?._id : true);

  const onConnectWallet = () => handleLoader.loaderWrapper(handleAuth.login, 2);

  const onGetTresr = () => {
    handleTransactionLoadingModal.open();
    faucet.getTRESR().finally(() => handleTransactionLoadingModal.close());
  };
  const onGetSmrtr = () => {
    handleTransactionLoadingModal.open();
    faucet.getSMRTR().finally(() => handleTransactionLoadingModal.close());
  };
  const onGetTresrLP = () => {
    handleTransactionLoadingModal.open();
    faucet.getTRESRLP().finally(() => handleTransactionLoadingModal.close());
  };
  const onGetSmrtrLP = () => {
    handleTransactionLoadingModal.open();
    faucet.getSMRTRLP().finally(() => handleTransactionLoadingModal.close());
  };
  const navigateToAccount = () => {
    setIsAccountOpen(false);
    navigate(`/account/${user?.wallet_id}`);
  };
  const onDisconnect = () => {
    setIsAccountOpen(false);
    handleAuth.logout();
  };

  const handleWalletConnect = async () => {
    await activate(
      walletconnect,
      (error) => {
        handleWalletConnectModal.close();
        toast.error(error.message);
        handleAuth.logout();
      },
      false
    );
  };

  const openConnectWalletModal = () => {
    handleWalletConnectModal.open();
  };

  useEffect(() => {
    if (library) {
      onConnectWallet();
      localStorage.setItem("isWalletConnected", "true");
    }
  }, [library]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Header_wrapper">
      <Navbar
        theme={theme}
        totalTRESRBalance={totalTRESRBalance}
        loaderComponentActive={loaderComponentActive}
        user={user}
        isDark={isDark}
        balanceAvax={balanceAvax}
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
        onGetTresr={onGetTresr}
        onGetSmrtr={onGetSmrtr}
        onGetTresrLP={onGetTresrLP}
        onGetSmrtrLP={onGetSmrtrLP}
        handleLoader={handleLoader}
        handleAuth={handleAuth}
      />
      {handleWalletConnectModal.isActive && (
        <WalletConnectModal
          isOpen={handleWalletConnectModal.isActive}
          onClose={handleWalletConnectModal.close}
          connectMetamask={onConnectWallet}
          connectWalletConnect={handleWalletConnect}
        />
      )}
    </div>
  );
}
