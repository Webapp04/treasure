import React from "react";
import "./style.scss";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import { MAX_CHEST_TIER } from "constant/blockchain";
import { position } from "tailwindcss-classnames";

const TreasureTier = ({ progressWidth = 50, nftSelected }) => {
  return (
    <Tooltip
      title={"Increase by Opening to Treasure Increase Base Rewards"}
      position="top"
    >
      <div className="treasure-tile__left__progress">
        <div
          className="treasure-tile__left__progress--line"
          style={{ width: `${progressWidth}%` }}
        />
        <div className="treasure-tile__left__progress--text">
          Treasure Tier: {nftSelected?.tierTresr}/{MAX_CHEST_TIER}
        </div>
      </div>
    </Tooltip>
  );
};

export default TreasureTier;
