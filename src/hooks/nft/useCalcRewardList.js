import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useCalcRewardList() {
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const calcRewardsList = async (tokenList) => {
    if (tokenList?.length == 0) return 0;
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    const rewardList =
      contractNFKeyStakingWithSigner.pendingBaseRewardByTokens(tokenList);
    return rewardList
      .map(
        (reward) =>
          +ethers.utils.formatEther(hexToNumber(reward?._hex)?.toString())
      )
      .reduce((acc, val) => acc + val, 0);
  };
  return { calcRewardsList };
}
