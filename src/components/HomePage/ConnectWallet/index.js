import "react-toastify/dist/ReactToastify.css";
import "../style.scss";
import useHandleAuth from "../../../hooks/auth/useHandleAuth";
import useHandleLoader from "../../../hooks/loader/useHandleLoader";
import useHandleModal from "../../../hooks/dom/useHandleModal";
import WalletConnectModal from "../../common/Modals/WalletConnectModal";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { walletconnect } from "../../../utils/connectors";
import ConnectWallets from "storybook/molecule/ConnectWallet/connectWallet";

export default function ConnectWallet({
  setIsAnimated,
  isLoading,
  setIsLoading,
  setIsLoadedList,
  isNotConnected,
  isMobile,
}) {
  const handleAuth = useHandleAuth();
  const handleLoader = useHandleLoader();
  const handleWalletConnectModal = useHandleModal();

  const context = useWeb3React();
  const { activate, deactivate } = context;

  const onConnectWallet = () => handleLoader.loaderWrapper(handleAuth.login, 2);

  const handleWalletConnect = async () => {
    await activate(
      walletconnect,
      (error) => {
        console.warn(error?.message);
      },
      true
    );
  };

  const openConnectWalletModal = () => {
    handleWalletConnectModal.open();
  };

  const onCloseWalletConnectModal = () => {
    handleWalletConnectModal.close();
    setIsAnimated(false);
    setIsLoading(false);
    setIsLoadedList(false);
  };

  useEffect(() => {
    let closeBtn = document.querySelector(
      ".walletconnect-modal__close__wrapper"
    );
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        deactivate();
        localStorage.removeItem("isWalletConnected");
      });
    }
  }, [document.querySelector(".walletconnect-modal__close__wrapper")]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="homePage__info">
      <ConnectWallets
        isLoading={isLoading}
        isMobile={isMobile}
        isNotConnected={isNotConnected}
        openConnectWalletModal={openConnectWalletModal}
      />
      {handleWalletConnectModal.isActive && (
        <WalletConnectModal
          isOpen={handleWalletConnectModal.isActive}
          onClose={onCloseWalletConnectModal}
          connectMetamask={onConnectWallet}
          connectWalletConnect={handleWalletConnect}
        />
      )}
    </div>
  );
}
