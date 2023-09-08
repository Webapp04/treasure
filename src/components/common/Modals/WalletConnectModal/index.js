import React from "react";
import "./style.scss";
import metamaskImg from "../../../../assets/images/metamask.svg";
import walletConnectImg from "../../../../assets/images/walletConnect.svg";
import avaxImg from "../../../../assets/images/avax_blue_img.svg";
import useWindowDimensions from "hooks/useWidowDimensions";
import Modal from "storybook/atom/Modal/modal";

const WalletConnectModal = ({
  isOpen,
  onClose,
  connectMetamask,
  connectWalletConnect,
}) => {
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 750;
  const handleConnectMetamask = () => {
    connectMetamask();
    onClose();
  };

  const handleConnectWalletConnect = () => {
    connectWalletConnect();
    onClose();
  };

  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className="px-[20px] py-[40px] h-[370px] max-h-[366px] max-w-[458px]"
    >
      <p className="walletConnect__title">Connect your wallet</p>

      <div className="walletConnect">
        <button onClick={handleConnectMetamask}>
          <img src={metamaskImg} alt="" />
          MetaMask
        </button>
        <button onClick={handleConnectMetamask}>
          <img src={avaxImg} alt={""} />
          Avalanche Core
        </button>
        <button onClick={handleConnectWalletConnect}>
          <img src={walletConnectImg} alt={""} />
          WalletConnect
        </button>
      </div>
    </Modal>
  );
};

export default WalletConnectModal;
