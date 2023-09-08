import React from "react";
import "./style.scss";
import MarketplaceButton from ".";
import Tooltip from "../../common/Tooltip";

import { useCountdown } from "../../../hooks/useCountdown";

const TimedMarketplaceButton = ({
  isInsufficientBalance,
  onClick,
  targetUpgradeDate,
  disabled = false,
  currentLevel,
}) => {
  const [hours, minutes, seconds, hoursValue, minutesValue, secondsValue] =
    useCountdown(targetUpgradeDate);
  const isTimeToUpgrade =
    !isInsufficientBalance &&
    (hoursValue > 0 || minutesValue > 0 || secondsValue > 0);
  const isUpgrade = !isInsufficientBalance && !isTimeToUpgrade;

  return (
    <>
      {isInsufficientBalance && (
        <MarketplaceButton title={"Insufficient balance"} disabled isBlue />
      )}
      {isTimeToUpgrade && (
        <MarketplaceButton
          title={`Time to upgrade: ${hours}:${minutes}:${seconds}`}
          isBlue
          disabled
        />
      )}
      {isUpgrade && (
        <div className="dashboard__data__content--form__selectedToken--info__upgradeButton">
          <Tooltip tooltipText={"Upgrade Key Level by Burning $SMRTR"}>
            <MarketplaceButton
              title={currentLevel >= 150 ? "Max level" : "Upgrade"}
              onClick={onClick}
              disabled={disabled}
              isBlue
            />
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default TimedMarketplaceButton;
