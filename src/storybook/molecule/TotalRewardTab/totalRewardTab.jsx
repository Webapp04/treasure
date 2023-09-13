import React from "react";
import classNames from "classnames";
import "./style.scss";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import Label from "storybook/atom/Label/label";

const TotalRewardTab = ({
  totalTRESRBalance,
  loaderComponentActive,
  tooltipTitle,
  tooltipPosition,
}) => {
  return (
    <Tooltip title={tooltipTitle} position={tooltipPosition}>
      <div className={classNames("total__reward--tab__wrapper")}>
        <Label className="text-white" label="Total Rewards:" />
        <div className={classNames("total__reward--tab__wrapper--value")}>
          {!loaderComponentActive && (
            <Label variant="secondary" label={`${totalTRESRBalance}`} />
          )}
          <Label variant="secondary" label="TRESR/MONTH" />
        </div>
      </div>
    </Tooltip>
  );
};

export default TotalRewardTab;
