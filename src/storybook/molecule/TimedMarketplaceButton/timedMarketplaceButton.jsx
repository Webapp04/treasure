import React from "react";
import "./style.scss";
import { useCountdown } from "hooks/useCountdown";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import Button from "storybook/atom/Button/button";

const TimedMarketplaceButton = ({
  isInsufficientBalance = true,
  onClick = () => {},
  disabled = false,
  currentLevel,
  hours = 0,
  minutes = 0,
  seconds = 0,
  isTimeToUpgrade = false,
  isUpgrade = false,
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
              size="medium"
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
