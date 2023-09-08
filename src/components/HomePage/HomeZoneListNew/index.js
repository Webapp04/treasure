import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../hooks/useWidowDimensions";
import useHandleNFT from "../../../hooks/blockchain/useHandleNFT";
import TransactionLoadingModal from "../../common/Modals/TransactionLoadingModal";
import useHandleModal from "../../../hooks/dom/useHandleModal";
import SuccessMintModal from "../../common/Modals/SuccessMintModal";
import useGetTokenPrice from "hooks/blockchain/useGetTokenPrice";
import useHandleCustomer from "../../../hooks/customer/useHandleCustomer";
import MintConfirmationModal from "components/common/Modals/MintConfirmationModal";
import { useSelector } from "react-redux";
import { selectAvaxBalance } from "redux/slice/balanceSlice";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import HomeZoneListsNew from "storybook/molecule/HomeZoneListNew/homeZoneListNew";
import "./style.scss";

const HomeZoneListNew = ({ animationCallback, isLoadedList }) => {
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const avaxBalance = useSelector(selectAvaxBalance);

  const [isZone1, setIsZone1] = useState(false);
  const [isZone2, setIsZone2] = useState(false);
  const [isZone3, setIsZone3] = useState(false);
  const [isZone4, setIsZone4] = useState(false);

  const [zone1Commission, setZone1Commission] = useState(0);
  const [zone2Commission, setZone2Commission] = useState(0);
  const [zone3Commission, setZone3Commission] = useState(0);
  const [zone4Commission, setZone4Commission] = useState(0);
  const [zone5Commission, setZone5Commission] = useState(0);

  const [zoneSumAmount, setZoneSumAmount] = useState(0);
  const [zoneSumCommission, setZoneSumCommission] = useState(0);
  const [zoneChecked, setZoneChecked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [zoneAmount, setZoneAmount] = useState([1, 1, 1, 1, 1]);
  const [mintedTokensList, setMintedTokensList] = useState([]);

  const windowDimensions = useWindowDimensions();
  const handleNFT = useHandleNFT();
  const handleCustomer = useHandleCustomer();
  const handleTransactionLoadingModal = useHandleModal();
  const handleSuccessMintModal = useHandleModal();
  const handleMintConfirmationModal = useHandleModal();

  const isMobile = windowDimensions?.width <= 1000;
  const isDark = theme === "dark";
  const MAX_TOKEN_PER_MINT = 40;
  const [enoughFlag, setEnoughFlag] = useState(false);
  const { getTokenPrice } = useGetTokenPrice();
  const [AVAXPrice, setAVAXPrice] = useState(0);
  const getAVAXPrice = async () => {
    const auctionTokenRes = await getTokenPrice({
      label: "AVAX",
      value: "avax",
      address: "0x0000000000000000000000000000000000000000",
      coingecko_id: "avalanche-2",
    });
    setAVAXPrice(auctionTokenRes.price);
  };

  const getUserZones = async () => {
    const merkle_data = await handleCustomer.getMerkleTree(user?.wallet_id);
    const merkle_proof = merkle_data[0]?.proof;
    const merkle_wl = {
      whitelistAddress: merkle_data[0]?.whitelistAddress,
      level: merkle_data[0]?.level,
      zone1: merkle_data[0]?.zone1,
      zone2: merkle_data[0]?.zone2,
      zone3: merkle_data[0]?.zone3,
      zone4: merkle_data[0]?.zone4,
    };

    handleNFT
      .getAccountZone(user?.wallet_id, 1, merkle_proof, merkle_wl)
      .then((res) => setIsZone1(res));
    handleNFT
      .getAccountZone(user?.wallet_id, 2, merkle_proof, merkle_wl)
      .then((res) => setIsZone2(res));
    handleNFT
      .getAccountZone(user?.wallet_id, 3, merkle_proof, merkle_wl)
      .then((res) => setIsZone3(res));
    handleNFT
      .getAccountZone(user?.wallet_id, 4, merkle_proof, merkle_wl)
      .then((res) => setIsZone4(res));
    handleNFT
      .getAccountZone(user?.wallet_id, 1, merkle_proof, merkle_wl)
      .then((res) => console.log("zone1", res));

    handleNFT
      .getZoneCommission(user?.wallet_id, 1)
      .then((res) => setZone1Commission(res / 10 ** 18));
    handleNFT
      .getZoneCommission(user?.wallet_id, 2)
      .then((res) => setZone2Commission(res / 10 ** 18));
    handleNFT
      .getZoneCommission(user?.wallet_id, 3)
      .then((res) => setZone3Commission(res / 10 ** 18));
    handleNFT
      .getZoneCommission(user?.wallet_id, 4)
      .then((res) => setZone4Commission(res / 10 ** 18));
    handleNFT
      .getZoneCommission(user?.wallet_id, 5)
      .then((res) => setZone5Commission(res / 10 ** 18));

    animationCallback();
  };

  const calcSumCommission = () => {
    return zoneAmount
      ?.map((item, key) => {
        if (key === 0) return +(item * zone1Commission).toFixed(2);
        if (key === 1) return +(item * zone2Commission).toFixed(2);
        if (key === 2) return +(item * zone3Commission).toFixed(2);
        if (key === 3) return +(item * zone4Commission).toFixed(2);
        if (key === 4) return +(item * zone5Commission).toFixed(2);
        else return 0;
      })
      ?.filter((_, key) => zoneChecked[key])
      ?.reduce((acc, val) => +(acc + val).toFixed(2), 0);
  };

  const calcSumAmount = () => {
    return zoneAmount
      ?.filter((_, key) => zoneChecked[key])
      ?.reduce((acc, val) => acc + val, 0);
  };

  const onMint = async () => {
    handleMintConfirmationModal.close();

    if (zoneSumCommission * AVAXPrice > avaxBalance * AVAXPrice) {
      setEnoughFlag(false);
      handleSuccessMintModal.open();
    } else {
      setEnoughFlag(true);
      handleTransactionLoadingModal.open();

      const promiseList = [
        { zone: 1, amount: zoneAmount[0] },
        { zone: 2, amount: zoneAmount[1] },
        { zone: 3, amount: zoneAmount[2] },
        { zone: 4, amount: zoneAmount[3] },
        { zone: 5, amount: zoneAmount[4] },
      ].filter((item, key) => zoneChecked[key]);

      // TODO: change this to invoke batchMint
      // getcommission
      let zones = promiseList.map((item) => item.zone);
      let amounts = promiseList.map((item) => item.amount);

      handleNFT
        .batchMint(zones, amounts)
        .then((res) => {
          setMintedTokensList(
            res
              ?.flat(1)
              ?.map((item) => parseInt(item?.topics[3], 16))
              ?.filter((item) => !Number.isNaN(item))
          );
        })
        .catch(() => null)
        .finally(() => handleTransactionLoadingModal.close());

      getUserZones();
    }
  };

  useEffect(() => {
    if (mintedTokensList?.length > 0) {
      // TODO: should generalize if user addrses is explicitly
      // given or get inside blockchain hook functions
      handleNFT.loadNFTBalance(user?.wallet_id);
      handleSuccessMintModal.open();
    }
  }, [mintedTokensList]);

  useEffect(() => {
    if (user?.wallet_id) getUserZones();
    getAVAXPrice();
  }, [user?.wallet_id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setZoneSumAmount(calcSumAmount());
    setZoneSumCommission(calcSumCommission());
  }, [zoneAmount, zoneChecked]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setZoneAmount([+isZone1, +isZone2, +isZone3, +isZone4, 1]);
  }, [isZone1, isZone2, isZone3, isZone4]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLoadedList) return null;
  return (
    <div className="homeZoneListNew">
      <HomeZoneListsNew
        isDark={isDark}
        isZone1={isZone1}
        isZone2={isZone2}
        isZone3={isZone3}
        isZone4={isZone4}
        zoneChecked={zoneChecked}
        setZoneChecked={setZoneChecked}
        zoneAmount={zoneAmount}
        setZoneAmount={setZoneAmount}
        zone2Commission={zone2Commission}
        zone3Commission={zone3Commission}
        zone4Commission={zone4Commission}
        zone5Commission={zone5Commission}
        zoneSumAmount={zoneSumAmount}
        zoneSumCommission={zoneSumCommission}
        handleMintConfirmationModal={handleMintConfirmationModal}
      />
      {handleTransactionLoadingModal.isActive && (
        <TransactionLoadingModal
          isOpen={handleTransactionLoadingModal.isActive}
        />
      )}
      {handleMintConfirmationModal.isActive && (
        <MintConfirmationModal
          isOpen={handleMintConfirmationModal.isActive}
          onClose={handleMintConfirmationModal.close}
          onMint={onMint}
        />
      )}
      {handleSuccessMintModal.isActive && (
        <SuccessMintModal
          isOpen={handleSuccessMintModal.isActive}
          onClose={() => {
            handleSuccessMintModal.close();
            //if (enoughFlag) navigate("/game");
          }}
          AVAXPrice={AVAXPrice}
          enoughFlag={enoughFlag}
          tokenIdList={mintedTokensList}
          sumCommission={zoneSumCommission}
          curAVAX={avaxBalance.toFixed(2)}
        />
      )}
    </div>
  );
};

export default HomeZoneListNew;
