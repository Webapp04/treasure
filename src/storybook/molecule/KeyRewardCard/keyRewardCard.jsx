import React from "react";
import "./style.scss";
import { formatterUS } from "utils";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import Button from "storybook/atom/Button/button";
import Label from "storybook/atom/Label/label";

const KeyRewardCard = ({
  isMobile,
  nftSelected,
  tokenID,
  loaderComponentActive,
  totalMonthlyBaseReward,
  claimedBonusTotalReward,
  onClickClaimAllBaseRewards,
  balanceMonthlyTresr,
  balanceTresrRewards,
  onClickClaimBaseRewards,
}) => {
  return (
    <>
      <div className="dashboardKeyRewards__rewards">
        <Tooltip title={"Est for All Kyes"} position="top">
          <Label
            variant="secondary"
            label={`${totalMonthlyBaseReward?.toFixed(5)} TRESR/MONTH`}
          />
          <div className="w-[23px] ml-[5px] -mr-[35px]"></div>
        </Tooltip>
        <div className="dashboardKeyRewards__title">Total Key Rewards</div>
        <div className="dashboardKeyRewards__amount">
          {!loaderComponentActive && (
            <>{formatterUS(claimedBonusTotalReward)}</>
          )}
        </div>
        <div className="dashboardKeyRewards__text">
          Available $TRESR to claim
        </div>
        <div className="dashboardKeyRewards__button">
          <Button
            label="Claim All Key Rewards"
            variant="secondary"
            size="large"
            onClick={onClickClaimAllBaseRewards}
          />
        </div>
      </div>
      {!isMobile && (
        <div className="dashboardKeyRewards__rewards">
          <Tooltip
            title={`Est. for Key #${nftSelected?.tokenId}`}
            position="top"
          >
            <Label
              variant="secondary"
              label={`${balanceMonthlyTresr.toFixed(5)} TRESR/MONTH`}
            />
            <div className="w-[23px] ml-[5px] -mr-[35px]"></div>
          </Tooltip>
          <div className="dashboardKeyRewards__title">
            Key #{nftSelected?.tokenId ? tokenID : "0"} Rewards
          </div>
          <div className="dashboardKeyRewards__amount">
            {!loaderComponentActive && (
              <>{balanceTresrRewards ? balanceTresrRewards?.toFixed(5) : 0}</>
            )}
          </div>
          <div className="dashboardKeyRewards__text">
            Available $TRESR to claim
          </div>
          <div className="dashboardKeyRewards__button">
            <Button
              label="Claim Key Rewards"
              variant="secondary"
              size="large"
              onClick={onClickClaimBaseRewards}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default KeyRewardCard;
