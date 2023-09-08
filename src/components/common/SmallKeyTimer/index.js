import React, { useEffect, useMemo } from "react";
import "./style.scss";
import { useCountdown } from "../../../hooks/useCountdown";
import useHandleToken from "../../../hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftList, selectNftSelected } from "redux/slice/nftSlice";
const SmallKeyTimer = ({ tokenId, tierTresr, targetDate, isActive }) => {
  const nftSelected = useSelector(selectNftSelected);
  const nftLists = useSelector(selectNftList);
  const dispatch = useDispatch();
  const handleToken = useHandleToken();
  const [
    hours,
    minutes,
    seconds,
    hoursValue,
    minutesValue,
    secondsValue,
    days,
  ] = useCountdown(targetDate);

  useEffect(() => {
    if (tierTresr != 0 && hours == 0 && minutes == 0 && seconds == 0) {
      let findToken = nftLists?.find((item) => item?.tokenId === tokenId);
      findToken = handleToken.getTierUpdatedToken(findToken);
      ACTIONS.SET_NFT_LIST_ITEM(dispatch, findToken);
      if (nftSelected?.tokenId == findToken.tokenId) {
        ACTIONS.SET_NFT_SELECTED(dispatch, findToken);
      }
    }
  }, [hours, minutes, seconds]);

  return useMemo(
    () => (
      <div
        className={`smallKeyTimer ${isActive ? "smallKeyTimer__isActive" : ""}`}
      >
        <div>{days > 0 ? days : "00"}</div>
        <div>:</div>

        <div>{hours > 0 ? hours : "00"}</div>
        <div>:</div>

        <div>{minutes > 0 ? minutes : "00"}</div>
        <div>:</div>

        <div>{seconds > 0 ? seconds : "00"}</div>
      </div>
    ),
    [days, hours, minutes, seconds]
  );
};

export default SmallKeyTimer;
