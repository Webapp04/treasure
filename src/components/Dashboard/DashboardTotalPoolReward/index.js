import { useEffect, useState } from "react";
import useHandleRewards from "../../../hooks/blockchain/useHandleRewards";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNftList, selectNftSelected } from "redux/slice/nftSlice";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import {
  selectBonusJlpSmartrReward,
  selectBonusJlpTresrReward,
  selectBonusKeyLevelReward,
  selectBonusVeTresrReward,
  selectTresrRewards,
} from "redux/slice/rewardSlice";
import TotalPoolReward from "storybook/molecule/TotalPoolReward/totalPoolReward";
import useHandleNFT from "hooks/blockchain/useHandleNFT";

export default function DashboardTotalPoolReward({
  onClaimAll,
  onConnectWallet,
}) {
  const nftSelected = useSelector(selectNftSelected);
  const nftLists = useSelector(selectNftList);
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const claimableTresrRewards = useSelector(selectTresrRewards);
  const claimableBonusVeTresrReward = useSelector(selectBonusVeTresrReward);
  const claimableBonusJlpTresrReward = useSelector(selectBonusJlpTresrReward);
  const claimableBonusJlpSmartrReward = useSelector(selectBonusJlpSmartrReward);
  const claimableBonusKeyLevelReward = useSelector(selectBonusKeyLevelReward);
  const handleRewards = useHandleRewards();

  const [allNfkeyStaked, setAllNfkeyStaked] = useState(0);
  const [ownTokenRewardList, setOwnTokenRewardList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [timerID, setTimerID] = useState(0);
  const [veTresrBalance, setVeTresrBalance] = useState(0);
  const [jlpTresrBonusRewardBalance, setJlpTresrBonusRewardBalance] =
    useState(0);
  const [jlpSmartrBonusRewardBalance, setJlpSmartrBonusRewardBalance] =
    useState(0);
  const [keyLevelBonusRewardBalance, setKeyLevelBonusRewardBalance] =
    useState(0);
  const [tresrRewardsPerSecAll, setTresrRewardsPerSecAll] = useState(0);
  const [balanceTresrRewardsAll, setBalanceTresrRewardsAll] = useState(0);
  const [balanceAll, setBalanceAll] = useState(0);
  const [balanceBonusAll, setBalanceBonusAll] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleNFT = useHandleNFT();
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const onClickClaimAllRewards = () =>
    !user?.wallet_id ? onConnectWallet() : onClaimAll();
  const onToggleDetails = async () => {
    setIsOpen(!isOpen);
    setBalanceBonusAll(await handleRewards.getPenddingBonusRewards());
  };

  useEffect(() => {
    if (nftLists?.length) {
      const tokenIdList = nftLists?.map((item) => +item?.tokenId);

      if (tokenIdList?.length) {
        handleNFT.calcRewardByTokens(tokenIdList).then((res) => {
          setOwnTokenRewardList(
            tokenIdList?.map((item, key) => ({
              tokenID: item,
              reward: res[key] ? res[key] : 0,
            }))
          );
        });
        // handleNFT
        //   .getBonusReward(ownTokenList)
        //   .then((res) => setAllNfkeyStaked(res));
        // handleNFT
        //   .getBonusRewardPerSecond(ownTokenList)
        //   .then((res) => setTresrRewardsPerSecAll(res));
      }
    }
  }, [
    user?.wallet_id,
    nftLists,
    nftSelected?.tier,
    nftSelected?.tierTresr,
    claimableTresrRewards,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    clearInterval(timerID);
    setFlag(true);
    handleRewards.getPendingTotalRewards().then((res) => {
      setBalanceAll(res);
      setFlag(false);
    });
    // const timer = setInterval(async () => {
    //   const temp = await handleRewards.getPendingTotalRewards();
    //   setBalanceAll(temp);
    //   setFlag(false);
    // }, 1000);
    // setTimerID(timer);
    return () => clearInterval(timerID);
  }, [nftLists]);

  useEffect(() => {
    // handleRewards.getJlpTresrBonusRewardPerSecond();
    // handleRewards.getJlpSmrtBonusRewardPerSecond();
    // handleRewards.getKeyLevelBonusRewardPerSecond();

    setVeTresrBalance(+claimableBonusVeTresrReward);
    setJlpTresrBonusRewardBalance(+claimableBonusJlpTresrReward);
    setJlpSmartrBonusRewardBalance(+claimableBonusJlpSmartrReward);
    setKeyLevelBonusRewardBalance(+claimableBonusKeyLevelReward);
    setBalanceTresrRewardsAll(+allNfkeyStaked);
  }, [
    claimableBonusVeTresrReward,
    claimableBonusJlpTresrReward,
    claimableBonusJlpSmartrReward,
    allNfkeyStaked,
    balanceTresrRewardsAll,
    claimableBonusKeyLevelReward,
  ]); // eslint-disable-line react-hooks/exhaustive-deps
  // }, [allNfkeyStaked, balanceTresrRewardsAll])// eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   setBalanceAll(
  //     +balanceTresrRewardsAll +
  //       veTresrBalance +
  //       jlpSmartrBonusRewardBalance +
  //       jlpTresrBonusRewardBalance +
  //       keyLevelBonusRewardBalance
  //   );
  //   // setBalanceAll(+balanceTresrRewardsAll)
  //   setBalanceBonusAll(
  //     +veTresrBalance +
  //       jlpSmartrBonusRewardBalance +
  //       jlpTresrBonusRewardBalance +
  //       keyLevelBonusRewardBalance
  //   );
  // }, [
  //   balanceTresrRewardsAll,
  //   veTresrBalance,
  //   jlpSmartrBonusRewardBalance,
  //   jlpTresrBonusRewardBalance,
  //   keyLevelBonusRewardBalance,
  // ]); // eslint-disable-line react-hooks/exhaustive-deps
  // }, [balanceTresrRewardsAll])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TotalPoolReward
      isOpen={isOpen}
      isDark={isDark}
      flag={flag}
      onToggleDetails={onToggleDetails}
      balanceAll={balanceAll}
      ownTokenRewardList={ownTokenRewardList}
      balanceBonusAll={balanceBonusAll}
      onClickClaimAllRewards={onClickClaimAllRewards}
    />
  );
}
