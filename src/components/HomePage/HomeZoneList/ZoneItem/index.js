import React, { useEffect, useState } from "react";
import "./style.scss";
import MarketplaceButton from "../../../common/MarketplaceButton";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import TransactionLoadingModal from "../../../common/Modals/TransactionLoadingModal";
import useHandleModal from "../../../../hooks/dom/useHandleModal";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function ZoneItem({
  zone,
  amountMintZone,
  setAmountMintZone,
  onChangeCodeInput,
}) {
  const user = useSelector(selectUser);
  const handleNFT = useHandleNFT();
  const handleTransactionLoadingModal = useHandleModal();

  const [status, setStatus] = useState(false);
  const [price, setPrice] = useState(0);

  const onMint = () => {
    handleTransactionLoadingModal.open();
    handleNFT
      .mint(zone?.id, +amountMintZone || 1)
      .finally(() => handleTransactionLoadingModal.close());
  };

  const onChangeAmount = (event) => {
    if (!isNaN(+event?.target?.value)) {
      setAmountMintZone(event?.target?.value);
    }
  };

  useEffect(() => {
    if (zone?.id === 5) setStatus(true);
    else
      handleNFT
        .getAccountZone(user?.wallet_id, zone?.id)
        .then((res) => setStatus(res));

    handleNFT
      .getZoneCommission(user?.wallet_id, zone?.id)
      .then((res) => res && setPrice(res / 10 ** 18));
  }, [user?.wallet_id, zone?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="zoneItem">
      <p>{zone?.title}</p>
      {zone?.withInput && (
        <input
          className="modal__input modal__input--createPage zoneItem__input"
          placeholder="Tokens"
          disabled={!status}
          value={amountMintZone || "1"}
          onChange={onChangeAmount}
        />
      )}
      <div className={"zoneItem__mintButton"}>
        <MarketplaceButton
          title={`Mint ${
            price ? `/ ${price * (+amountMintZone || 1)} AVAX` : ""
          }`}
          disabled={!status}
          onClick={onMint}
        />
      </div>
      {handleTransactionLoadingModal.isActive && (
        <TransactionLoadingModal
          isOpen={handleTransactionLoadingModal.isActive}
        />
      )}
    </div>
  );
}
