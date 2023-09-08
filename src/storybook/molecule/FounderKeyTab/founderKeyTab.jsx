import React, { useEffect, useState } from "react";
import "./style.scss";
import { MAX_CHEST_TIER } from "constant/blockchain";
import SmallKeyTimer from "../SmallKeyTimer/smallKeyTimer";
import { compareUnixDates } from "utils";

const FounderKeyTab = ({
  tokenId = 0,
  tier = 0,
  tierTresr,
  staked = true,
  isAnimated,
  contractAddress,
  onNFKey = () => {},
  spaceThumbnailSmall = "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg",
  days,
  hours,
  minutes,
  seconds,
  nftSelected,
}) => {
  const [timeToUpgrade, setTimeToUpgrade] = useState(0);
  const [startUpgradeDelay, setStartUpgradeDelay] = useState(0);
  const [percentToUpgrade, setPercentToUpgrade] = useState(0);
  const [timerID, setTimerID] = useState(0);
  const chestProgressLine = MAX_CHEST_TIER / tierTresr;
  const chestProgressLineWidth =
    chestProgressLine <= 1 ? 100 : 100 / chestProgressLine;
  const isActive = tokenId === nftSelected?.tokenId;

  useEffect(() => {
    clearInterval(timerID);
    if (compareUnixDates(new Date().getTime() / 1000, timeToUpgrade)) {
      setPercentToUpgrade(100);
    } else {
    }
    return () => clearInterval(timerID);
  }, [timeToUpgrade, startUpgradeDelay]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`NFFounderKeyTab ${
        isActive ? "active" : ""
      } hover:border-[#2D46D6]`}
      onClick={() => {
        !isActive && onNFKey(tokenId, contractAddress);
      }}
    >
      <div
        className="NFFounderKeyTab__image"
        style={{
          background: `linear-gradient(45.44deg, #4964FE ${percentToUpgrade}%, rgba(73, 100, 254, 0) 48.31%)`,
        }}
      >
        <img src={spaceThumbnailSmall} alt="" />
      </div>
      {isAnimated ? (
        <></>
      ) : (
        <div className="NFFounderKeyTab__info">
          <div className="NFFounderKeyTab__info--title">
            <div
              className={`NFFounderKeyTab__info--title__name ${
                isActive ? "NFFounderKeyTab__info--title__name--active" : ""
              }`}
            >
              Founder’s Key #{tokenId}
            </div>
            <div
              className={`NFFounderKeyTab__info--title__count ${
                isActive ? "NFFounderKeyTab__info--title__count--active" : ""
              }`}
            >
              Level {tier}
            </div>
          </div>
          {staked ? (
            <div className="NFFounderKeyTab__info--wrapper">
              <div className="NFFounderKeyTab__info--progressLine">
                <div
                  className={`NFFounderKeyTab__info--progressLine__bar yellow ${
                    isActive ? "yellow__active" : ""
                  }`}
                  style={{ width: `${chestProgressLineWidth}%` }}
                ></div>
                <div
                  className="progressLine__text"
                  style={{ mixBlendMode: "difference" }}
                >
                  Tier {tierTresr}/{MAX_CHEST_TIER}
                </div>
              </div>
              <SmallKeyTimer
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                isActive={isActive}
              />
            </div>
          ) : (
            <div
              className={`NFFounderKeyTab__info--inactive ${
                isActive ? "NFFounderKeyTab__info--inactive__active" : ""
              }`}
            >
              inactive
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FounderKeyTab;
