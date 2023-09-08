import React, { useEffect, useState } from "react";
import useHandleRewards from "../../../hooks/blockchain/useHandleRewards";
import MarketplaceButton from "../../common/MarketplaceButton";
import infoImg from "../../../assets/images/info_img.svg";
import infoImgDark from "../../../assets/images/info_img_dark.svg";
import { formatterUS } from "../../../utils";
import Tooltip from "components/common/Tooltip";
import { ClipLoader } from "react-spinners";
import useWindowDimensions from "hooks/useWidowDimensions";
import useHandleNFT from "hooks/blockchain/useHandleNFT";
import useHandleTresrStaking from "hooks/blockchain/useHandleTresrStaking";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLpTotalStakedSMRTRAVAXBalance,
  selectLpTotalStakedTRESRAVAXBalance,
  selectKeyLevelPBalance,
  selectVeTresrSharePBalance,
} from "redux/slice/balanceSlice";
import { selectTheme } from "redux/slice/themeSlice";
import {
  selectBonusJlpSmartrReward,
  selectBonusJlpTresrReward,
  selectBonusKeyLevelReward,
  selectBonusTotalReward,
  selectBonusVeTresrReward,
} from "redux/slice/rewardSlice";
import ACTIONS from "redux/action";
import BonusCard from "storybook/molecule/BonusCard/bonusCard";

const DashboardBonusCard = ({ onClaimBonus }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const claimableBonusJlpTresrReward = useSelector(selectBonusJlpTresrReward);
  const claimableBonusJlpSmartrReward = useSelector(selectBonusJlpSmartrReward);
  const claimableBonusTotalReward = useSelector(selectBonusTotalReward);
  const veTresrSharePBalance = useSelector(selectVeTresrSharePBalance);
  const claimableBonusVeTresrReward = useSelector(selectBonusVeTresrReward);
  const lpTotalStakedSMRTRAVAXBalance = useSelector(
    selectLpTotalStakedSMRTRAVAXBalance
  );
  const lpTotalStakedTRESRAVAXBalance = useSelector(
    selectLpTotalStakedTRESRAVAXBalance
  );
  const keyLevelPBalance = useSelector(selectKeyLevelPBalance);
  const claimableBonusKeyLevelReward = useSelector(selectBonusKeyLevelReward);
  const handleRewards = useHandleRewards();
  const handleTresrStaking = useHandleTresrStaking();
  const handleNFT = useHandleNFT();
  const [comulativeKeyLevel, setcomulativeKeyLevel] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [timerID, setTimerID] = useState(0);
  const [flag, setFlag] = useState(false);
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 640;

  const isDark = theme === "dark";

  const balanceBonusAll = formatterUS(
    +claimableBonusJlpTresrReward + +claimableBonusJlpSmartrReward
  );

  useEffect(() => {
    // handleRewards.getMasterChefRewards(0);
    // handleRewards.getMasterChefRewards(1);
    handleRewards
      .getCumulativeLevels()
      .then((res) => setcomulativeKeyLevel(res));
    handleNFT.getkeyLevelP();
    handleTresrStaking.getveTresrShareP();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    clearInterval(timerID);
    setFlag(true);
    const timer = setInterval(async () => {
      setTotalRewards(await handleRewards.getPenddingBonusRewards());
      ACTIONS.SET_BONUS_TOTAL_REWARDS(
        dispatch,
        await handleRewards.getTotalRewards()
      );
      setFlag(false);
    }, 1000);
    setTimerID(timer);

    return () => clearInterval(timerID);
  }, []);

  return (
    <BonusCard
      isDark={isDark}
      isMobile={isMobile}
      totalRewards={totalRewards}
      onClaimBonus={onClaimBonus}
      claimableBonusTotalReward={claimableBonusTotalReward}
      comulativeKeyLevel={comulativeKeyLevel}
      veTresrSharePBalance={veTresrSharePBalance}
      claimableBonusVeTresrReward={claimableBonusVeTresrReward}
      lpTotalStakedSMRTRAVAXBalance={lpTotalStakedSMRTRAVAXBalance}
      claimableBonusJlpSmartrReward={claimableBonusJlpSmartrReward}
      lpTotalStakedTRESRAVAXBalance={lpTotalStakedTRESRAVAXBalance}
      claimableBonusJlpTresrReward={claimableBonusJlpTresrReward}
      keyLevelPBalance={keyLevelPBalance}
      claimableBonusKeyLevelReward={claimableBonusKeyLevelReward}
    />
  );
};

export default DashboardBonusCard;
