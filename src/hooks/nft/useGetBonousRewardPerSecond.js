import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetBonousRewardPerSecond() {
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const getBonusRewardPerSecond = async (tokenList, count = 3) => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .getBonusRewardPerSecond(tokenList)
      .then(
        (tx) => +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
      )
      .catch(() =>
        count ? getBonusRewardPerSecond(tokenList, count - 1) : null
      );
  };
  return { getBonusRewardPerSecond };
}
