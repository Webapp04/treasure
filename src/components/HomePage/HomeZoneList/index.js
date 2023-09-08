import React, { useEffect, useState } from "react";
import { ZONE_LIST } from "../../../constant/blockchain";
import ZoneItem from "./ZoneItem";
import CustomerApi from "../../../api/CustomerApi";
import useHandleNFT from "../../../hooks/blockchain/useHandleNFT";
import useHandleModal from "../../../hooks/dom/useHandleModal";
import MarketplaceButton from "../../common/MarketplaceButton";
import TransactionLoadingModal from "../../common/Modals/TransactionLoadingModal";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function HomeZoneList() {
  const user = useSelector(selectUser);

  const [availableZoneList, setAvailableZoneList] = useState([]);
  const [amountMintZoneList, setAmountMintZoneList] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const handleNFT = useHandleNFT();
  const handleTransactionLoadingModal = useHandleModal();

  const getAvailableZoneList = async () => {
    const zoneList = [5];
    const initAmountZoneList = { 5: "" };

    const merkle_data = await handleCustomer.getMerkleTree(user?.wallet_id);
    const merkle_proof = merkle_data[0].proof;
    const merkle_wl = {
      whitelistAddress: merkle_data[0].whitelistAddress,
      level: merkle_data[0].level,
      zone1: merkle_data[0].zone1,
      zone2: merkle_data[0].zone2,
      zone3: merkle_data[0].zone3,
      zone4: merkle_data[0].zone4,
    };
    for (const zone of ZONE_LIST) {
      const isZone = await handleNFT.getAccountZone(
        user?.wallet_id,
        zone?.id,
        merkle_proof,
        merkle_wl
      );
      if (isZone) {
        zoneList.push(zone?.id);
        initAmountZoneList[zone?.id] = "";
      }
    }

    setAvailableZoneList(zoneList);
    setAmountMintZoneList(initAmountZoneList);
  };

  const onMintAll = async () => {
    handleTransactionLoadingModal.open();
    await Promise.all(
      availableZoneList.map((zone) =>
        handleNFT.mint(zone, +amountMintZoneList[zone] || 1)
      )
    ).finally(() => handleTransactionLoadingModal.close());
    getAvailableZoneList();
  };

  const getTotalAmount = async () => {
    let zoneAmount = 0;
    for (const index in amountMintZoneList) {
      zoneAmount =
        zoneAmount +
        (await handleNFT
          .getZoneCommission(user?.wallet_id, index)
          .then((res) =>
            res ? (res / 10 ** 18) * (+amountMintZoneList[index] || 1) : 0
          ));
    }

    setTotalAmount(zoneAmount);
  };

  const onChangeAmountMintAll = (value, zone) =>
    setAmountMintZoneList({ ...amountMintZoneList, [zone]: value });

  useEffect(() => {
    getAvailableZoneList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getTotalAmount();
  }, [amountMintZoneList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="homeZoneList">
      {ZONE_LIST.map((item, key) => (
        <ZoneItem
          key={key}
          zone={item}
          setAmountMintZone={(value) => onChangeAmountMintAll(value, item?.id)}
          amountMintZone={amountMintZoneList[item.id]}
          onChangeCodeInput={onChangeCodeInput}
        />
      ))}
      <div className="mintAll">
        <MarketplaceButton
          title={`Mint All ${totalAmount ? `/ ${totalAmount} AVAX` : ""}`}
          disabled={!availableZoneList?.length}
          onClick={onMintAll}
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
