import { useState } from "react";
import useUpdateClaimableBonusRewardBalance from "hooks/rewards/useUpdateClaimableBonusRewardBalance";
import useGetRewardDashboardInfo from "hooks/rewards/useGetRewardDashboardInfo";
import useGetVeTresrBonusRewards from "hooks/rewards/useGetVeTresrBonusRewards";
import useGetJlpTresrBonusReward from "hooks/rewards/useGetJlpTresrBonusReward";
import useGetJlpSmrtBonusReward from "hooks/rewards/useGetJlpSmrtBonusReward";
import useGetKeyLevelBonusReward from "hooks/rewards/useGetKeyLevelBonusReward";
import useGetJlpTresrBonusRewardPerSecond from "hooks/rewards/useGetJlpTresrBonusRewardPerSecond";
import useGetVeTresrPerHour from "hooks/rewards/useGetVeTresrPerHour";
import useGetMaxVeTresr from "hooks/rewards/useGetMaxVeTresr";
import useGetDaysToMax from "hooks/rewards/useGetDaysToMax";
import useUpdateBurnedEmissionInfo from "hooks/rewards/useUpdateBurnedEmissionInfo";
import useGetBurned from "hooks/rewards/useGetBurned";
import useGetEmission from "hooks/rewards/useGetEmission";
import useGetCumulativeLevels from "hooks/rewards/useGetCumulativeLevels";
import useGetPenddingBonusReward from "hooks/rewards/useGetPenddingBonusReward";
import useGetPendingTotalRewards from "hooks/rewards/useGetPendingTotalRewards";
import useGetJlpSmrtBonusRewardPerSecond from "hooks/rewards/useGetJlpSmrtBonusRewardPerSecond";
import useGetVeTresrBonusRewardPerSecond from "hooks/rewards/useGetVeTresrBonusRewardPerSecond";
import useGetKeyLevelBonusRewardPerSecond from "hooks/rewards/useGetKeyLevelBonusRewardPerSecond";
import useGetTotalRewards from "hooks/rewards/useGetTotalRewards";
import useGetPendingVeTresr from "hooks/rewards/useGetPendingVeTresr";
import useGetClaimedVeTresr from "hooks/rewards/useGetClaimedVeTresr";
import useClaimVeTresr from "hooks/rewards/useClaimVeTresr";
import useClaimBonus from "hooks/rewards/useClaimBonus";
import useClaimBase from "hooks/rewards/useClaimBase";
import useClaimAllBase from "hooks/rewards/useClaimAllBase";
import useClaimAll from "hooks/rewards/useClaimAll";
import useGetMasterChefRewards from "hooks/rewards/useGetMasterChefRewards";
import useDepositMasterChef from "hooks/rewards/useDepositMasterChef";
import useWithdrawMasterChef from "hooks/rewards/useWithdrawMasterChef";

export default function useHandleRewards() {
  const [jlpSmrtBonusRewardPerSecond, setJlpSmrtBonusRewardPerSecond] =
    useState(0);
  const [jlpTresrBonusRewardPerSecond, setJlpTresrBonusRewardPerSecond] =
    useState(0);
  const [veTresrBonusRewardPerSecond, setVeTresrBonusRewardPerSecond] =
    useState(0);
  const [keyLevelBonusRewardPerSecond, setKeyLevelBonusRewardPerSecond] =
    useState(0);

  const handleUpdateClaimableBonusRewardBalance =
    useUpdateClaimableBonusRewardBalance();
  const handleGetRewardDashboardInfo = useGetRewardDashboardInfo();
  const handleGetVeTresrBonusRewards = useGetVeTresrBonusRewards();
  const handleGetJlpTresrBonusReward = useGetJlpTresrBonusReward();
  const handleGetJlpSmrtBonusReward = useGetJlpSmrtBonusReward();
  const handleGetKeyLevelBonusReward = useGetKeyLevelBonusReward();
  const handleGetJlpTresrBonusRewardPerSecond =
    useGetJlpTresrBonusRewardPerSecond();
  const handleGetVeTresrPerHour = useGetVeTresrPerHour();
  const handleGetMaxVeTresr = useGetMaxVeTresr();
  const handleGetDaysToMax = useGetDaysToMax();
  const handleUpdateBurnedEmissionInfo = useUpdateBurnedEmissionInfo();
  const handleGetBurned = useGetBurned();
  const handleGetEmission = useGetEmission();
  const handleGetCumulativeLevels = useGetCumulativeLevels();
  const handleGetPenddingBonusReward = useGetPenddingBonusReward();
  const handleGetPendingTotalRewards = useGetPendingTotalRewards();
  const handleGetJlpSmrtBonusRewardPerSecond =
    useGetJlpSmrtBonusRewardPerSecond();
  const handleGetVeTresrBonusRewardPerSecond =
    useGetVeTresrBonusRewardPerSecond();
  const handleGetKeyLevelBonusRewardPerSecond =
    useGetKeyLevelBonusRewardPerSecond();
  const handleGetTotalRewards = useGetTotalRewards();
  const handleGetPendingVeTresr = useGetPendingVeTresr();
  const handleGetClaimedVeTresr = useGetClaimedVeTresr();
  const handleClaimVeTresr = useClaimVeTresr();
  const handleClaimBonus = useClaimBonus();
  const handleClaimBase = useClaimBase();
  const handleClaimAllBase = useClaimAllBase();
  const handleClaimAll = useClaimAll();
  const handleGetMasterChefRewards = useGetMasterChefRewards();
  const handleDepositMasterChef = useDepositMasterChef();
  const handleWithdrawMasterChef = useWithdrawMasterChef();

  const updateClaimableBonusRewardBalance = async () => {
    await handleUpdateClaimableBonusRewardBalance.updateClaimableBonusRewardBalance();
  };
  const getRewardDashboardInfo = async (address) => {
    return await handleGetRewardDashboardInfo.getRewardDashboardInfo(address);
  };
  const getVeTresrBonusReward = async () => {
    return await handleGetVeTresrBonusRewards.getVeTresrBonusReward();
  };
  const getJlpTresrBonusReward = async () => {
    return await handleGetJlpTresrBonusReward.getJlpTresrBonusReward();
  };
  const getJlpSmrtBonusReward = async () => {
    return await handleGetJlpSmrtBonusReward.getJlpSmrtBonusReward();
  };
  const getKeyLevelBonusReward = async () => {
    return await handleGetKeyLevelBonusReward.getKeyLevelBonusReward();
  };
  const getJlpTresrBonusRewardPerSecond = async () => {
    return await handleGetJlpTresrBonusRewardPerSecond.getJlpTresrBonusRewardPerSecond(
      setJlpTresrBonusRewardPerSecond
    );
  };
  const getVeTresrPerHour = async () => {
    return await handleGetVeTresrPerHour.getVeTresrPerHour();
  };
  const getMaxVeTresr = async () => {
    return await handleGetMaxVeTresr.getMaxVeTresr();
  };
  const getDaysToMax = async () => {
    return await handleGetDaysToMax.getDaysToMax();
  };
  const updateBurnedEmissionInfo = async () => {
    return await handleUpdateBurnedEmissionInfo.updateBurnedEmissionInfo();
  };
  const getBurned = async () => {
    return await handleGetBurned.getBurned();
  };
  const getEmission = async () => {
    return await handleGetEmission.getEmission();
  };
  const getCumulativeLevels = async () => {
    return await handleGetCumulativeLevels.getCumulativeLevels();
  };
  const getPenddingBonusRewards = async () => {
    return await handleGetPenddingBonusReward.getPenddingBonusRewards();
  };
  const getPendingTotalRewards = async (count = 3) => {
    return await handleGetPendingTotalRewards.getPendingTotalRewards(count);
  };
  const getJlpSmrtBonusRewardPerSecond = async () => {
    return await handleGetJlpSmrtBonusRewardPerSecond.getJlpSmrtBonusRewardPerSecond(
      setJlpSmrtBonusRewardPerSecond
    );
  };
  const getVeTresrBonusRewardPerSecond = async () => {
    return await handleGetVeTresrBonusRewardPerSecond.getVeTresrBonusRewardPerSecond(
      setVeTresrBonusRewardPerSecond
    );
  };
  const getKeyLevelBonusRewardPerSecond = async () => {
    return await handleGetKeyLevelBonusRewardPerSecond.getKeyLevelBonusRewardPerSecond(
      setKeyLevelBonusRewardPerSecond
    );
  };
  const getTotalRewards = async () => {
    return await handleGetTotalRewards.getTotalRewards();
  };
  const getPendingVeTresr = async () => {
    return await handleGetPendingVeTresr.getPendingVeTresr();
  };
  const getClaimedVeTresr = async () => {
    return await handleGetClaimedVeTresr.getClaimedVeTresr();
  };
  const claimVeTresr = async () => {
    return await handleClaimVeTresr.claimVeTresr();
  };
  const claimBonus = async () => {
    return await handleClaimBonus.claimBonus();
  };
  const claimBase = async () => {
    return await handleClaimBase.claimBase();
  };
  const claimAllBase = async () => {
    return await handleClaimAllBase.claimAllBase();
  };
  const claimAll = async () => {
    return await handleClaimAll.claimAll();
  };
  const getMasterChefRewards = async (id) => {
    return await handleGetMasterChefRewards.getMasterChefRewards(id);
  };
  const depositMasterChef = async (id, amount) => {
    return await handleDepositMasterChef.depositMasterChef(id, amount);
  };
  const withdrawMasterChef = async (id, amount) => {
    return await handleWithdrawMasterChef.withdrawMasterChef(id, amount);
  };

  return {
    updateClaimableBonusRewardBalance,
    updateBurnedEmissionInfo,
    getRewardDashboardInfo,
    getMasterChefRewards,
    depositMasterChef,
    withdrawMasterChef,
    claimVeTresr,
    claimBonus,
    claimBase,
    claimAllBase,
    claimAll,
    getVeTresrBonusReward,
    getJlpTresrBonusReward,
    getJlpSmrtBonusReward,
    getKeyLevelBonusReward,
    getVeTresrBonusRewardPerSecond,
    getJlpTresrBonusRewardPerSecond,
    getJlpSmrtBonusRewardPerSecond,
    getKeyLevelBonusRewardPerSecond,
    getPendingVeTresr,
    getTotalRewards,
    getClaimedVeTresr,
    getVeTresrPerHour,
    getMaxVeTresr,
    getDaysToMax,
    getBurned,
    getEmission,
    getCumulativeLevels,
    getPenddingBonusRewards,
    getPendingTotalRewards,
    jlpSmrtBonusRewardPerSecond,
    jlpTresrBonusRewardPerSecond,
    veTresrBonusRewardPerSecond,
    keyLevelBonusRewardPerSecond,
  };
}
