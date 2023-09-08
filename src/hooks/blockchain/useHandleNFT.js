import useGetNFkeyInfo from "hooks/nft/useGetNFkeyInfo";
import useUpdateProfileBalance from "hooks/nft/useUpdateProfileBalance";
import useGetAVAXBalance from "hooks/nft/useGetAVAXBalance";
import useClaimTresrRewards from "hooks/nft/useClaimTresrRewards";
import useGetFreeSMRTR from "hooks/nft/useGetFreeSMRTR";
import useApproveSMRTRtoContract from "hooks/nft/useApproveSMRTRtoContract";
import useApproveSMRTRByAmount from "hooks/nft/useApproveSMRTRByAmount";
import useApproveSMRTR from "hooks/nft/useApproveSMRTR";
import useUpgradeKey from "hooks/nft/useUpgradeKey";
import useBulkUpgradeKeys from "hooks/nft/useBulkUpgradeKeys";
import useBatchMint from "hooks/nft/useBatchMint";
import useMint from "hooks/nft/useMint";
import useBulkStake from "hooks/nft/useBulkStake";
import useStake from "hooks/nft/useStake";
import useUnstake from "hooks/nft/useUnstake";
import useUnlockTreasure from "hooks/nft/useUnlockTreasure";
import useReloadNFTItemBalance from "hooks/nft/useReloadNFTItemBalance";
import useLoadNFTBalance from "hooks/nft/useLoadNFTBalance";
import useGetZoneCommission from "hooks/nft/useGetZoneCommission";
import useGetTresrRewardsBalance from "hooks/nft/useGetTresrRewardsBalance";
import useBalanceOfTRESR from "hooks/nft/useBalanceOfTRESR";
import useGetRewardsReleased from "hooks/nft/useGetRewardsReleased";
import useBalanceOfSMRTR from "hooks/nft/useBalanceOfSMRTR";
import useGetKeyLevelP from "hooks/nft/useGetKeyLevelP";
import useGetBonousPoolAllocation from "hooks/nft/useGetBonousPoolAllocation";
import useGetPoolAllocation from "hooks/nft/useGetPoolAllocation";
import useGetBurnedTresr from "hooks/nft/useGetBurnedTresr";
import useGetBurnedSmarter from "hooks/nft/useGetBurnedSmarter";
import useGetAccountZone from "hooks/nft/useGetAccountZone";
import useGetTotalSupply from "hooks/nft/useGetTotalSupply";
import useBalanceOfERC20 from "hooks/nft/useBalanceOfERC20";
import useTargetUpgradeDate from "hooks/nft/useTargetUpgradeDate";
import useGetUpgradeDelay from "hooks/nft/useGetUpgradeDealy";
import useGetStartUpgradeDelay from "hooks/nft/useGetStartUpgradeDelay";
import useGetBonousReward from "hooks/nft/useGetBonousReward";
import useGetPendingAllBaseReward from "hooks/nft/useGetPendingAllBaseReward";
import useGetBonousRewardPerSecond from "hooks/nft/useGetBonousRewardPerSecond";
import useCalcRewards from "hooks/nft/useCalcRewards";
import useCalcRewardByTokens from "hooks/nft/useCalcRewardByTokens";
import useCalcRewardList from "hooks/nft/useCalcRewardList";
import useCalcRewardPerSecond from "hooks/nft/useCalcRewardPerSecond";
import useCalcRewardsListPerSecond from "hooks/nft/useCalcRewardsListPerSecond";
import useGetAmountUpgradeKey from "hooks/nft/useGetAmountUpgradeKey";
import useGetUnlockCost from "hooks/nft/useGetUnlockCost";
import useTimeToTreasureAvailable from "hooks/nft/useTimeToTreasureAvailable";
import useGetProbToOpen from "hooks/nft/useGetProbToOpen";

export default function useHandleNFT() {
  const handleGetNFkeyInfo = useGetNFkeyInfo();
  const handleUpdateProfileBalance = useUpdateProfileBalance();
  const handleGetAVAXBalance = useGetAVAXBalance();
  const handleClaimTresrRewards = useClaimTresrRewards();
  const handleGetFreeSMRTR = useGetFreeSMRTR();
  const handleApproveSMRTRtoContract = useApproveSMRTRtoContract();
  const handleApproveSMRTRByAmount = useApproveSMRTRByAmount();
  const handleApproveSMRTR = useApproveSMRTR();
  const handleUpgradeKey = useUpgradeKey();
  const handleBulkUpgradeKey = useBulkUpgradeKeys();
  const handleBatchMint = useBatchMint();
  const handleMint = useMint();
  const handleBulkStake = useBulkStake();
  const handleStake = useStake();
  const handleUnstake = useUnstake();
  const handleUnlockTreasure = useUnlockTreasure();
  const handleReloadNFTItemBalance = useReloadNFTItemBalance();
  const handleLoadNFTBalance = useLoadNFTBalance();
  const handleGetZoneCommission = useGetZoneCommission();
  const handleGetTresrRewardsBalance = useGetTresrRewardsBalance();
  const handleBalanceOfTRESR = useBalanceOfTRESR();
  const handleGetRewardsReleased = useGetRewardsReleased();
  const handleBalanceOfSMRTR = useBalanceOfSMRTR();
  const handleGetKeyLevelP = useGetKeyLevelP();
  const handleGetBonousPoolAllocation = useGetBonousPoolAllocation();
  const handleGetPoolAllocation = useGetPoolAllocation();
  const handleGetBurnedTresr = useGetBurnedTresr();
  const handleGetBurnedSmarter = useGetBurnedSmarter();
  const handleGetAccountZone = useGetAccountZone();
  const handleGetTotalSupply = useGetTotalSupply();
  const handleBalanceOfERC20 = useBalanceOfERC20();
  const handleTargetUpgradeDate = useTargetUpgradeDate();
  const handleGetUpgradeDelay = useGetUpgradeDelay();
  const handleGetStartUpgradeDelay = useGetStartUpgradeDelay();
  const handleGetBonousReward = useGetBonousReward();
  const handleGetPendingAllBaseReward = useGetPendingAllBaseReward();
  const handleGetBonousRewardPerSecond = useGetBonousRewardPerSecond();
  const handleCalcRewards = useCalcRewards();
  const handelCalcRewardByTokens = useCalcRewardByTokens();
  const handleCalcRewardList = useCalcRewardList();
  const handleCalcRewardPerSecond = useCalcRewardPerSecond();
  const handleCalcRewardsListPerSecond = useCalcRewardsListPerSecond();
  const handleGetAmountUpgradeKey = useGetAmountUpgradeKey();
  const handleGetUnlockCost = useGetUnlockCost();
  const handleTimeToTreasureAvailable = useTimeToTreasureAvailable();
  const handleGetProbToOpen = useGetProbToOpen();

  const getNFkeyInfo = async (_token) => {
    return await handleGetNFkeyInfo.getNFkeyInfo(_token);
  };
  const updateProfileBalance = async (address, count = 3) => {
    await handleUpdateProfileBalance.updateProfileBalance(address, count);
  };
  const getAVAXBalance = async (address, count = 3) => {
    return await handleGetAVAXBalance.getAVAXBalance(address, count);
  };
  const getkeyLevelP = async () => {
    return await handleGetKeyLevelP.getkeyLevelP();
  };
  const getBonusPoolAllocation = async () => {
    return await handleGetBonousPoolAllocation.getBonusPoolAllocation();
  };
  const getPoolAllocation = async () => {
    return await handleGetPoolAllocation.getPoolAllocation();
  };
  const getBurnedTresr = async () => {
    return await handleGetBurnedTresr.getBurnedTresr();
  };
  const getBurnedSmarter = async (count = 3) => {
    return await handleGetBurnedSmarter.getBurnedSmarter(count);
  };
  const getTotalSupply = async (count = 3) => {
    return await handleGetTotalSupply.getTotalSupply(count);
  };
  const balanceOfSMRTR = async (address, count = 3) => {
    return await handleBalanceOfSMRTR.balanceOfSMRTR(address, count);
  };
  const balanceOfERC20 = async (walletAddress, contractAddress, count = 3) => {
    return await handleBalanceOfERC20.balanceOfERC20(
      walletAddress,
      contractAddress,
      count
    );
  };
  const balanceOfTRESR = async (address, count = 3) => {
    return await handleBalanceOfTRESR.balanceOfTRESR(address, count);
  };
  const targetUpgradeDate = async (tokenID, count = 3) => {
    return await handleTargetUpgradeDate.targetUpgradeDate(tokenID, count);
  };
  const getUpgradeDelay = async (tokenID, count = 3) => {
    return await handleGetUpgradeDelay.getUpgradeDelay(tokenID, count);
  };
  const getStartUpgradeDelay = async (tokenID, count = 3) => {
    return await handleGetStartUpgradeDelay.getStartUpgradeDelay(
      tokenID,
      count
    );
  };
  const getBonusReward = async (tokenList, count = 3) => {
    return await handleGetBonousReward.getBonusReward(tokenList, count);
  };
  const getPendingAllBaseReward = async (tokenList) => {
    return await handleGetPendingAllBaseReward.getPendingAllBaseReward(
      tokenList
    );
  };
  const getBonusRewardPerSecond = async (tokenList, count = 3) => {
    return await handleGetBonousRewardPerSecond.getBonusRewardPerSecond(
      tokenList,
      count
    );
  };
  const getTresrRewardsBalance = async (tokenId, count = 3) => {
    return await handleGetTresrRewardsBalance.getTresrRewardsBalance(
      tokenId,
      count
    );
  };
  const calcRewards = async (tokenId, count = 3) => {
    return await handleCalcRewards.calcRewards(tokenId, count);
  };
  const calcRewardByTokens = async (tokenList) => {
    return await handelCalcRewardByTokens.calcRewardByTokens(tokenList);
  };
  const calcRewardsList = async (tokenList) => {
    return await handleCalcRewardList.calcRewardsList(tokenList);
  };
  const getRewardsReleased = async (count = 3) => {
    return await handleGetRewardsReleased.getRewardsReleased(count);
  };
  const calcRewardsPerSecond = async (tokenID, count = 3) => {
    return await handleCalcRewardPerSecond.calcRewardsPerSecond(tokenID, count);
  };
  const calcRewardsListPerSecond = async (tokenIDList) => {
    return await handleCalcRewardsListPerSecond.calcRewardsListPerSecond(
      tokenIDList
    );
  };
  const getAmountUpgradeKey = async (currentTier, count = 3) => {
    return await handleGetAmountUpgradeKey.getAmountUpgradeKey(
      currentTier,
      count
    );
  };
  const getUnlockCost = async (tokenID, count = 3) => {
    return await handleGetUnlockCost.getUnlockCost(tokenID, count);
  };
  const getAccountZone = async (address, zone, proof, wl, count = 3) => {
    return await handleGetAccountZone.getAccountZone(
      address,
      zone,
      proof,
      wl,
      count
    );
  };
  const getZoneCommission = async (address, zone, count = 3) => {
    return await handleGetZoneCommission.getZoneCommission(
      address,
      zone,
      count
    );
  };
  const timeToTreasureAvailable = async (tokenId, count = 3) => {
    return await handleTimeToTreasureAvailable.timeToTreasureAvailable(
      tokenId,
      count
    );
  };
  const getProbToOpen = async (tokenId, count = 3) => {
    return await handleGetProbToOpen.getProbToOpen(tokenId, count);
  };
  const claimTresrRewards = async () => {
    await handleClaimTresrRewards.claimTresrRewards();
  };
  const getFreeSMRTR = async () => {
    await handleGetFreeSMRTR.getFreeSMRTR();
  };
  const approveSMRTRtoContract = async (contractAddress, amount) => {
    return await handleApproveSMRTRtoContract.approveSMRTRtoContract(
      contractAddress,
      amount
    );
  };
  const approveSMRTRByAmount = async (amount) => {
    return await handleApproveSMRTRByAmount.approveSMRTRByAmount(amount);
  };
  const approveSMRTR = async () => {
    return handleApproveSMRTR.approveSMRTR();
  };
  const upgradeKey = async () => {
    return await handleUpgradeKey.upgradeKey();
  };
  const bulkUpgradeKeys = async (tokenList, amountSMRTR) => {
    return await handleBulkUpgradeKey.bulkUpgradeKeys(tokenList, amountSMRTR);
  };
  const batchMint = async (zones, amounts) => {
    return await handleBatchMint.batchMint(zones, amounts);
  };
  const mint = async (zone, amount) => {
    return await handleMint.mint(zone, amount);
  };
  const bulkStake = async (tokenList) => {
    await handleBulkStake.bulkStake(tokenList);
  };
  const stake = async () => {
    await handleStake.stake();
  };
  const unstake = async () => {
    await handleUnstake.unstake();
  };
  const unlockTreasure = async () => {
    return handleUnlockTreasure.unlockTreasure();
  };
  const reloadNFTItemBalance = async (contractAddress, tokenID) => {
    await handleReloadNFTItemBalance.reloadNFTItemBalance(
      contractAddress,
      tokenID
    );
  };
  const loadNFTBalance = async (contractAddress) => {
    await handleLoadNFTBalance.loadNFTBalance(contractAddress);
  };

  return {
    getNFkeyInfo,
    updateProfileBalance,
    getTotalSupply,
    getUnlockCost,
    getAmountUpgradeKey,
    loadNFTBalance,
    reloadNFTItemBalance,
    balanceOfSMRTR,
    balanceOfTRESR,
    getAVAXBalance,
    getFreeSMRTR,
    approveSMRTR,
    bulkUpgradeKeys,
    upgradeKey,
    timeToTreasureAvailable,
    unlockTreasure,
    stake,
    bulkStake,
    unstake,
    getTresrRewardsBalance,
    claimTresrRewards,
    getRewardsReleased,
    getProbToOpen,
    mint,
    batchMint,
    approveSMRTRtoContract,
    balanceOfERC20,
    getAccountZone,
    getZoneCommission,
    calcRewardsPerSecond,
    calcRewards,
    calcRewardByTokens,
    calcRewardsList,
    calcRewardsListPerSecond,
    getBonusReward,
    getBonusRewardPerSecond,
    getBurnedTresr,
    getBurnedSmarter,
    targetUpgradeDate,
    getBonusPoolAllocation,
    getPoolAllocation,
    getUpgradeDelay,
    getStartUpgradeDelay,
    approveSMRTRByAmount,
    getPendingAllBaseReward,
    getkeyLevelP,
  };
}
