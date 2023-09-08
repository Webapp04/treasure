import React from "react";
import "./style.scss";
import MarketplaceButton from "../../MarketplaceButton";
import { useNavigate } from "react-router-dom";
import useHandleRewards from "../../../../hooks/blockchain/useHandleRewards";
import useWindowDimensions from "../../../../hooks/useWidowDimensions";
import { useSelector } from "react-redux";
import { selectTresrRewards } from "redux/slice/rewardSlice";
import Modal from "storybook/atom/Modal/modal";

const WarningModal = ({
  isOpen,
  onClose,
  isTransfer,
  onOpenSellModal,
  onOpenTransferModal,
  onCloseTransactionLoadingModal,
  onOpenTransactionLoadingModal,
}) => {
  const claimableTresrRewards = useSelector(selectTresrRewards);
  const navigate = useNavigate();
  const handleRewards = useHandleRewards();
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 450;

  const onAccept = () => {
    onClose();
    isTransfer ? onOpenTransferModal() : onOpenSellModal();
  };

  const onClaimRewards = () => {
    onClose();
    onOpenTransactionLoadingModal();
    handleRewards.claimAll().finally(() => {
      onCloseTransactionLoadingModal();
      navigate("/game/dashboard");
    });
  };

  return (
    <Modal
      handleClose={onClose}
      isModalOpen={isOpen}
      withCrossIcon
      className={`px-[20px] py-[40px] max-w-[458px] ${
        isMobile ? "max-h-[330px]" : "max-h-[420px]"
      }`}
    >
      <p className="modal__title">Claim rewards before selling!</p>

      <p className="modal__text warningModal__text">
        All unclaimed rewards will be transferred together with the key to
        buyer.
      </p>

      <p className="warningModal__value">
        {claimableTresrRewards ? claimableTresrRewards?.toFixed(5) : 0}
      </p>

      <p className="modal__text warningModal__toClaim">
        Avavilable $TRESR to claim
      </p>

      <div className={"warningModal__buttons"}>
        <MarketplaceButton
          title={"Claim rewards"}
          onClick={onClaimRewards}
          isBlue
        />
        <MarketplaceButton title={"Accept"} onClick={onAccept} />
      </div>
    </Modal>
  );
};

export default WarningModal;
