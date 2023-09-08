import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useCalcRewardPerSecond() {
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const calcRewardsPerSecond = async (tokenID, count = 3) => {
    return handleContractNFKeyStakingWithSigner
      ?.calcRewardsPerSecond(tokenID)
      .then(
        (tx) => +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
      )
      .catch(() => (count ? calcRewardsPerSecond(count - 1) : null));
  };
  return { calcRewardsPerSecond };
}
