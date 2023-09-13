import React from "react";
import "./style.scss";
import VotingEsCrow from "../VotingESCrow/votinEsCrow";
import PoolReward from "../PoolReward/poolReward";

const VotingCard = ({
  flag,
  isDark,
  onClickStake,
  onClickUnStake,
  stakedAll,
  tresrBalance,
  tresrStakedAllBalance,
  balanceEstDailyVeTRESR,
  onclaimVeTresr,
  veTresrBalance,
  veClaimedTresr,
  balanceVeTresrPerHour,
  balanceMaxAvailable,
  balanceEstDaysToMax,
}) => {
  return (
    <div className="votingEscrow">
      <VotingEsCrow
        flag={flag}
        isDark={isDark}
        onClickStake={onClickStake}
        onClickUnStake={onClickUnStake}
        stakedAll={stakedAll}
        tresrBalance={tresrBalance}
        tresrStakedAllBalance={tresrStakedAllBalance}
        balanceEstDailyVeTRESR={balanceEstDailyVeTRESR}
      />
      <PoolReward
        flag={flag}
        isDark={isDark}
        onclaimVeTresr={onclaimVeTresr}
        veTresrBalance={veTresrBalance}
        veClaimedTresr={veClaimedTresr}
        balanceVeTresrPerHour={balanceVeTresrPerHour}
        balanceMaxAvailable={balanceMaxAvailable}
        balanceEstDaysToMax={balanceEstDaysToMax}
      />
    </div>
  );
};

export default VotingCard;
