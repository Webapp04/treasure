import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useCalcRewardByTokens() {
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const calcRewardByTokens = async (tokenList) => {
    if (tokenList?.length == 0) return [];
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    const rewardList =
      await contractNFKeyStakingWithSigner.pendingBaseRewardByTokens(tokenList);
    return rewardList?.map(
      (reward) =>
        +ethers.utils.formatEther(hexToNumber(reward?._hex)?.toString())
    );
  };
  return { calcRewardByTokens };
}
