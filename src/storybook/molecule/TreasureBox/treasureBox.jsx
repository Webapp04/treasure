import React from "react";
import "./style.scss";
import { MAX_CHEST_TIER } from "constant/blockchain";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import treasureImg from "../../atom/Icon/svg/treasure.png";
import { TreasureTire } from "../TreasureTier/treasureTier.stories";
import Timer from "../Timer/timer";

const TreasureBox = ({
  isAnimated,
  nftSelected,
  openAttemptTitle = "0 TRESER",
  nextTierEstTitle = "0 TRESER",
  progressWidth,
  onAction,
  hours,
  minutes,
  seconds,
  days,
}) => {
  return (
    <div
      className={`treasure-tile ${
        isAnimated ? "nft__image--placeholder treasure-tile__isAnimated" : ""
      }`}
    >
      {!isAnimated && (
        <div className="treasure-tile__left">
          {!nftSelected && <div className="treasure-tile__blurred" />}
          {!!(nftSelected?.staked || !nftSelected) ? (
            nftSelected?.tierTresr != 0 ? (
              <>
                <div className="treasure-tile__left__title">
                  Treasure Tier expires in
                </div>
                <Timer
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                  days={days}
                />
              </>
            ) : (
              <>
                <div className="treasure-tile__left__title text-center">
                  Unlock a Treasure Box to Start Earning $TRESR
                </div>
              </>
            )
          ) : (
            <div className="treasure-tile__left__title">
              Need to Activate Founder's Key
            </div>
          )}
          <div className="treasure-tile__left__description">
            <span className="-mt-1">Open Attempt</span>
            <Tooltip title={"Burn $TRESR to attempt Unlock"}>
              <div className="flex">
                <div className="-mt-1">{openAttemptTitle}</div>
                <div className="w-[23px] ml-[5px] -mr-[35px]"></div>
              </div>
            </Tooltip>
          </div>

          <div className="treasure-tile__left__description treasure-tile__left__description--bottom">
            <span className="-mt-1">Next Tier Est. Monthly</span>
            <div className="flex">
              <div className="-mt-1">{nextTierEstTitle}</div>
              <div className="w-[23px] ml-[5px] -mr-[35px]"></div>
            </div>
          </div>
          <TreasureTire
            progressWidth={progressWidth}
            nftSelected={nftSelected}
          />
        </div>
      )}
      <div className="treasure-tile__right">
        <div className="treasure-tile__right__wrapper">
          <img src={treasureImg} alt="" />
          <button className={`button active`} onClick={onAction}>
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreasureBox;
