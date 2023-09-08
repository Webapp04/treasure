import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";
import BonusRewardCard from "storybook/molecule/BonusRewardCard/bonusRewardCard";

const DashboardTresrSmartrAvaxStaking = ({
  isTRESR,
  balanceLP,
  onClickStake,
  onClickUnStake,
  balanceLPStaked,
  poolShareCalc,
  communityLPStaked,
}) => {
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";

  return (
    <BonusRewardCard
      isTRESR={isTRESR}
      isDark={isDark}
      balanceLPStaked={balanceLPStaked}
      onClickStake={onClickStake}
      onClickUnStake={onClickUnStake}
      balanceLP={balanceLP}
      poolShareCalc={poolShareCalc}
      communityLPStaked={communityLPStaked}
    />
  );
};

export default DashboardTresrSmartrAvaxStaking;
