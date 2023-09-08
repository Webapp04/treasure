import React from "react";
import DashboardVotingEscrow from "../DashboardVotingEscrow";
import DashboardBonusCard from "../DashboardBonusCard";
import DashboardTotalPoolReward from "../DashboardTotalPoolReward";
import DashboardTresrSmartrAvaxStakingWrapper from "../DashboardTresrSmartrAvaxStakingWrapper";
import { useSelector } from "react-redux";
import { selectPoolAllocationBalance } from "redux/slice/balanceSlice";
import { selectBonusPoolAllocation } from "redux/slice/rewardSlice";

const DashboardTab = ({
  onStakeTresr,
  onUnstakeTresr,
  onClaimBonus,
  onClaimAll,
  onConnectWallet,
  onStakeLP,
  onUnstakeLP,
  onApprove,
  onclaimVeTresr,
}) => {
  const poolAllocationBalance = useSelector(selectPoolAllocationBalance);
  const claimableBonusPoolAllocationReward = useSelector(
    selectBonusPoolAllocation
  );

  return (
    <div className="learMoreWrapper">
      <div className="learMoreWrapper__leftBlock">
        {!!(poolAllocationBalance && claimableBonusPoolAllocationReward) && (
          <DashboardTotalPoolReward onClaimAll={onClaimAll} />
        )}
        {!!claimableBonusPoolAllocationReward && (
          <DashboardBonusCard onClaimBonus={onClaimBonus} />
        )}
      </div>

      <div className="learMoreWrapper__rightBlock">
        <DashboardVotingEscrow
          onStakeTresr={onStakeTresr}
          onUnstakeTresr={onUnstakeTresr}
          onclaimVeTresr={onclaimVeTresr}
        />
        <DashboardTresrSmartrAvaxStakingWrapper
          onConnectWallet={onConnectWallet}
          onStakeLP={onStakeLP}
          onUnstakeLP={onUnstakeLP}
          onApprove={onApprove}
        />
      </div>
    </div>
  );
};

export default DashboardTab;
