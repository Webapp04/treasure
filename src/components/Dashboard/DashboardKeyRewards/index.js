import React, { useEffect, useState } from "react";
import "./style.scss";
import { formatterUS } from "../../../utils";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import { selectLoaderComponentActive } from "redux/slice/loaderSlice";
import {
  selectClaimedBonusTotalReward,
  selectTotalTresrRewardsPerSec,
  selectTresrRewards,
  selectTresrRewardsPerSec,
} from "redux/slice/rewardSlice";
import KeyRewardCard from "storybook/molecule/KeyRewardCard/keyRewardCard";

const DashboardKeyRewards = ({
  onConnectWallet,
  onClaimBase,
  onClaimAllBase,
  isAnimated,
  isMobile,
}) => {
  const user = useSelector(selectUser);
  const loaderComponentActive = useSelector(selectLoaderComponentActive);
  const nftSelected = useSelector(selectNftSelected);
  const claimableTresrRewardsPerSec = useSelector(selectTresrRewardsPerSec);
  const claimableTotalTresrRewardsPerSec = useSelector(
    selectTotalTresrRewardsPerSec
  );
  const claimableTresrRewards = useSelector(selectTresrRewards);
  const claimedBonusTotalReward = useSelector(selectClaimedBonusTotalReward);

  const [balanceTresrRewards, setBalanceTresrRewards] = useState(0);
  const balanceMonthlyTresr = claimableTresrRewardsPerSec
    ? claimableTresrRewardsPerSec * 24 * 3600 * 30
    : 0;
  const totalMonthlyBaseReward = claimableTotalTresrRewardsPerSec
    ? claimableTotalTresrRewardsPerSec * 24 * 3600 * 30
    : 0;

  const tokenID = formatterUS(nftSelected?.tokenId, 0);

  const onClickClaimBaseRewards = () =>
    !user?.wallet_id ? onConnectWallet() : onClaimBase();

  const onClickClaimAllBaseRewards = () =>
    !user?.wallet_id ? onConnectWallet() : onClaimAllBase();

  useEffect(() => {
    setBalanceTresrRewards(+claimableTresrRewards);
    //setBalanceTresrRewardsAll(+allNfkeyStaked);
  }, [claimableTresrRewards]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`dashboardKeyRewards ${
        isAnimated
          ? "nft__image--placeholder dashboardKeyRewards__isAnimated"
          : ""
      }`}
    >
      {!isAnimated && (
        <KeyRewardCard
          isMobile={isMobile}
          nftSelected={nftSelected}
          tokenID={tokenID}
          loaderComponentActive={loaderComponentActive}
          totalMonthlyBaseReward={totalMonthlyBaseReward}
          claimedBonusTotalReward={claimedBonusTotalReward}
          onClickClaimAllBaseRewards={onClickClaimAllBaseRewards}
          balanceMonthlyTresr={balanceMonthlyTresr}
          balanceTresrRewards={balanceTresrRewards}
          onClickClaimBaseRewards={onClickClaimBaseRewards}
        />
      )}
    </div>
  );
};

export default DashboardKeyRewards;
