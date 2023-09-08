import "./style.scss";
import { useEffect, useState } from "react";
import { MAX_CHEST_TIER } from "../../../../constant/blockchain";
import SmallKeyTimer from "../../../common/SmallKeyTimer";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import { compareUnixDates } from "../../../../utils";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { selectTimeTresrToUnlockBalance } from "redux/slice/balanceSlice";
import ACTIONS from "redux/action";
import { selectNftList, selectNftSelected } from "redux/slice/nftSlice";

export default function NFKey({
  index,
  tier,
  tierTresr,
  tierExpireTime,
  tokenId,
  contractAddress,
  spaceThumbnailSmall,
  isAnimated,
  level,
  staked,
}) {
  const nftSelected = useSelector(selectNftSelected);
  const nftLists = useSelector(selectNftList);
  const dispatch = useDispatch();
  const timeTresrToUnlockBalance = useSelector(selectTimeTresrToUnlockBalance);
  const handleNFT = useHandleNFT();
  const [timeToTreasureAvailable, setTimeToTreasureAvailable] = useState(0);
  const [timeToUpgrade, setTimeToUpgrade] = useState(0);
  const [startUpgradeDelay, setStartUpgradeDelay] = useState(0);
  const [percentToUpgrade, setPercentToUpgrade] = useState(0);
  const [timerID, setTimerID] = useState(0);
  const isActive = tokenId === nftSelected?.tokenId;

  const chestProgressLine = MAX_CHEST_TIER / tierTresr;
  const chestProgressLineWidth =
    chestProgressLine <= 1 ? 100 : 100 / chestProgressLine;

  const onNFKey = () => {
    if (!isActive) {
      const findToken = nftLists?.find(
        (item) =>
          item?.tokenId === tokenId && item?.contractAddress === contractAddress
      );
      if (findToken && findToken != nftSelected) {
        ACTIONS.SET_COMPONENT_LOADER(dispatch, true);
        ACTIONS.SET_NFT_SELECTED(dispatch, findToken);
      }
    }
  };

  useEffect(() => {
    if (isActive) {
      // handleNFT.timeToTreasureAvailable(tokenId).then((res) => {
      //   setTimeToTreasureAvailable(res);
      // });
    }
  }, [timeTresrToUnlockBalance]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // if (token?.selected?.tokenId !== tokenId) return;
    // handleNFT
    //   .timeToTreasureAvailable(tokenId)
    //   .then((res) => setTimeToTreasureAvailable(res));
    // handleNFT.getUpgradeDelay(tokenId).then((res) => setTimeToUpgrade(res));
    // handleNFT
    //   .getStartUpgradeDelay(tokenId)
    //   .then((res) => setStartUpgradeDelay(res));
  }, [tokenId, tier, nftSelected?.level]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    clearInterval(timerID);

    if (compareUnixDates(new Date().getTime() / 1000, timeToUpgrade)) {
      setPercentToUpgrade(100);
    } else {
      // const timer = setInterval(() => {
      //   setPercentToUpgrade(() => {
      //     const percent =
      //       100 -
      //       ((timeToUpgrade - moment().unix()) * 100) /
      //         (timeToUpgrade - startUpgradeDelay);
      //     if (percent >= 100) return 100;
      //     return percent;
      //   });
      // }, 1000);
      // setTimerID(timer);
    }

    return () => clearInterval(timerID);
  }, [timeToUpgrade, startUpgradeDelay]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`NFKey ${isActive ? "active" : ""} hover:border-[#2D46D6]`}
      onClick={onNFKey}
    >
      <div
        className="NFKey__image"
        style={{
          background: `linear-gradient(45.44deg, #4964FE ${percentToUpgrade}%, rgba(73, 100, 254, 0) 48.31%)`,
        }}
      >
        <img src={spaceThumbnailSmall} alt="" />
      </div>
      {isAnimated ? (
        <></>
      ) : (
        <div className="NFKey__info">
          <div className="NFKey__info--title">
            <div
              className={`NFKey__info--title__name ${
                isActive ? "NFKey__info--title__name--active" : ""
              }`}
            >
              Founder’s Key #{tokenId}
            </div>
            <div
              className={`NFKey__info--title__count ${
                isActive ? "NFKey__info--title__count--active" : ""
              }`}
            >
              Level {tier}
            </div>
          </div>
          {staked ? (
            <div className="NFKey__info--wrapper">
              <div className="NFKey__info--progressLine">
                <div
                  className={`NFKey__info--progressLine__bar yellow ${
                    isActive ? "yellow__active" : ""
                  }`}
                  style={{ width: `${chestProgressLineWidth}%` }}
                ></div>
                {/* <div className={`text-center text-[10px] ${tierTresr > 4 ? 'text-black': ''}`}>
                                    Tier {tierTresr}/{MAX_CHEST_TIER}
                                </div> */}
                <div
                  className={`text-center text-[10px] text-[#FEF9EC]`}
                  style={{ mixBlendMode: "difference" }}
                >
                  Tier {tierTresr}/{MAX_CHEST_TIER}
                </div>
              </div>
              {/* {isActive && (
                <SmallKeyTimer
                  targetDate={timeToTreasureAvailable}
                  setTimeToTreasureAvailable={setTimeToTreasureAvailable}
                  isActive={isActive}
                  tokenId={tokenId}
                  contractAddress={contractAddress}
                />
              )} */}
              <SmallKeyTimer
                tokenId={tokenId}
                tierTresr={tierTresr}
                targetDate={tierExpireTime}
                isActive={isActive}
              />
            </div>
          ) : (
            <div
              className={`NFKey__info--inactive ${
                isActive ? "NFKey__info--inactive__active" : ""
              }`}
            >
              inactive
            </div>
          )}
        </div>
      )}
    </div>
  );
}
