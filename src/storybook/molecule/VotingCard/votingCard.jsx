import React from "react";
import "./style.scss";
import VotingEsCrow from "../VotingESCrow/votinEsCrow";
import PoolReward from "../PoolReward/poolReward";

const VotingCard = ({
  flag = true,
  isDark = true,
  onClickStake = () => {},
  onClickUnStake = () => {},
  stakedAll = 0,
  tresrBalance = 0,
  tresrStakedAllBalance = 0,
  balanceEstDailyVeTRESR = 0,
  onclaimVeTresr = () => {},
  veTresrBalance = 0,
  veClaimedTresr = 0,
  balanceVeTresrPerHour = 0,
  balanceMaxAvailable = 0,
  balanceEstDaysToMax = 0,
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
