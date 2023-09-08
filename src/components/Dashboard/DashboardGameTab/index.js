import React, { useState } from "react";
import { useCountdown } from "../../../hooks/useCountdown";
import DashboardTreasureTile from "../DashboardTreasureTile";
import useWindowDimensions from "../../../hooks/useWidowDimensions";
import DashboardNotWhitelisted from "../DashboardNotWhitelisted";
import HomeMint from "../../HomePage/HomeMint";
import useHandleNFT from "../../../hooks/blockchain/useHandleNFT";
import { BASE_REWARD, MAX_LEVEL } from "../../../constant/blockchain";
import DashboardKeyRewards from "../DashboardKeyRewards";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectSmrtrBalance,
  selectPoolAllocationBalance,
} from "redux/slice/balanceSlice";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import { selectLoaderComponentActive } from "redux/slice/loaderSlice";
import { selectTargetUpgradeDate } from "redux/slice/targetSlice";
import { selectWhitelist } from "redux/slice/whiteListSlice";
import RewardBox from "storybook/molecule/RewardBox/rewardBox";

const DashboardGameTab = ({
  probToOpen,
  onView,
  amountUpgradeKey,
  handleUpgradeModal,
  handleTreasureModal,
  handleTreasureWarningModal,
  amountOpenChest,
  onOpenDeactivateKeyModal,
  onOpenActivateKeyModal,
  onClaimBase,
  onClaimAllBase,
  onConnectWallet,
  onViewTokenPage,
  isAnimated,
  setIsMaxUpgrades,
  filterTokenList,
  handleTransactionLoadingModal,
  onClose,
  onOpenWarningModal,
}) => {
  const user = useSelector(selectUser);
  const whitelist = useSelector(selectWhitelist);
  const targetUpgradeDate = useSelector(selectTargetUpgradeDate);
  const loaderComponentActive = useSelector(selectLoaderComponentActive);
  const nftSelected = useSelector(selectNftSelected);
  const smrtrBalance = useSelector(selectSmrtrBalance);
  const poolAllocationBalance = useSelector(selectPoolAllocationBalance);
  const theme = useSelector(selectTheme);
  // const [hours, minutes, seconds, hoursValue, minutesValue, secondsValue] =
  //   useCountdown(targetUpgradeDate * 1000);
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const windowParams = useWindowDimensions();
  const handleNFT = useHandleNFT();

  const isMobile = windowParams?.width <= 640;
  const isActive = !!nftSelected?.staked;
  const balanceMonthlyTresr = nftSelected?.staked
    ? +nftSelected?.tier * nftSelected?.tierTresr * BASE_REWARD * 30
    : 0;
  const lineWidth = (nftSelected?.tier / MAX_LEVEL) * 100;
  const lineWidthPer = `${lineWidth}%`;
  const isInsufficientBalance = smrtrBalance < amountUpgradeKey;
  // const isTimeToUpgrade =
  //   !isInsufficientBalance &&
  //   !!(hoursValue > 0 || minutesValue > 0 || secondsValue > 0);
  // const isUpgrade = !isInsufficientBalance && !isTimeToUpgrade;
  const [totalTRESRBalance, setTotalTRESRBalance] = useState(0);

  const [hours, minutes, seconds, hoursValue, minutesValue, secondsValue] =
    useCountdown(targetUpgradeDate);
  const isTimeToUpgrade =
    !isInsufficientBalance &&
    (hoursValue > 0 || minutesValue > 0 || secondsValue > 0);
  const isUpgrade = !isInsufficientBalance && !isTimeToUpgrade;

  const dashboardMintContent = () => {
    if (!user?.wallet_id) return <HomeMint />;
    if (!whitelist?.level || handleNFT.activeZone === null)
      return <DashboardNotWhitelisted />;
    // TODO: should figure out this part
    // if (
    //   handleNFT.activeZone >= 4 ||
    //   handleNFT.activeZone >= handleNFT?.accountZone
    // ) {
    //   return <HomeMint activeZone={handleNFT.activeZone} />;
    // }

    return <HomeMint />;

    return <DashboardNotWhitelisted />;
  };

  // useEffect(() => {
  //   return;
  //   //FIXME: this might be code  dashboar
  //   // let temp = 0;
  //   // token?.list?.map((val) => {
  //   //   temp += val?.staked ? +val?.tier * val?.tierTresr * BASE_REWARD * 30 : 0;
  //   // });
  //   // setTotalTRESRBalance(temp);
  //   // if (
  //   //   +hoursValue === -1 &&
  //   //   +minutesValue === -1 &&
  //   //   +secondsValue === -10 &&
  //   //   filterTokenList?.length
  //   // ) {
  //   //   setIsMaxUpgrades(
  //   //     filterTokenList?.some((item, key) =>
  //   //       compareUnixDates(new Date().getTime() / 1000, item.upgradeToDelay)
  //   //     )
  //   //   );

  //   // Promise.all(
  //   //   filterTokenList?.map((item) => handleNFT.getUpgradeDelay(item?.tokenId))
  //   // ).then((res) =>
  //   //   // FIXME: duplicated code at Dashboard/index.js
  //   //   setIsMaxUpgrades(
  //   //     filterTokenList?.some((item, key) =>
  //   //       compareUnixDates(new Date().getTime() / 1000, res[key])
  //   //     )
  //   //   )
  //   // );
  //   // }
  // }, [hoursValue, minutesValue, secondsValue, filterTokenList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <RewardBox
        nftSelected={nftSelected}
        dashboardMintContent={dashboardMintContent}
        isAnimated={isAnimated}
        isActive={isActive}
        isMobile={isMobile}
        onClose={onClose}
        handleTransactionLoadingModal={handleTransactionLoadingModal}
        handleNFT={handleNFT}
        probToOpen={probToOpen}
        loaderComponentActive={loaderComponentActive}
        totalTRESRBalance={totalTRESRBalance}
        amountUpgradeKey={amountUpgradeKey}
        lineWidthPer={lineWidthPer}
        onOpenDeactivateKeyModal={onOpenDeactivateKeyModal}
        handleUpgradeModal={handleUpgradeModal}
        handleTreasureWarningModal={handleTreasureWarningModal}
        isInsufficientBalance={isInsufficientBalance}
        targetUpgradeDate={targetUpgradeDate}
        onOpenActivateKeyModal={onOpenActivateKeyModal}
        onView={onView}
        onViewTokenPage={onViewTokenPage}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        isUpgrade={isUpgrade}
        isTimeToUpgrade={isTimeToUpgrade}
      />

      <DashboardTreasureTile
        isAnimated={isAnimated}
        onOpenModal={handleTreasureModal.open}
        onOpenWarningModal={handleTreasureWarningModal.open}
        amountOpenChest={amountOpenChest}
        isDark={isDark}
      />

      {!!(nftSelected?.tokenId && poolAllocationBalance) && (
        <DashboardKeyRewards
          onConnectWallet={onConnectWallet}
          onClaimBase={onClaimBase}
          onClaimAllBase={onClaimAllBase}
          isAnimated={isAnimated}
          isDark={isDark}
          isMobile={isMobile}
        />
      )}
    </>
  );
};
export default DashboardGameTab;
