import React from "react";
import "./style.scss";
import { useCountdown } from "hooks/useCountdown";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import Button from "storybook/atom/Button/button";

const TimedMarketplaceButton = ({
  isInsufficientBalance,
  onClick,
  disabled,
  currentLevel,
  hours,
  minutes,
  seconds,
  isTimeToUpgrade,
  isUpgrade,
}) => {
  return (
    <>
      {isInsufficientBalance && (
        <Button label={"Insufficient balance"} disabled />
      )}
      {isTimeToUpgrade && (
        <Button
          label={`Time to upgrade: ${hours}:${minutes}:${seconds}`}
          disabled
        />
      )}
      {isUpgrade && (
        <div className="timed__marketplace__upgradeButton">
          <Tooltip title={"Upgrade Key Level by Burning $SMRTR"}>
            <Button
              label={currentLevel >= 150 ? "Max level" : "Upgrade"}
              onClick={onClick}
              disabled={disabled}
            />
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default TimedMarketplaceButton;
