import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetBonousReward() {
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const getBonusReward = async (tokenList, count = 3) => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .getBonusReward(tokenList)
      .then(
        (tx) => +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
      )
      .catch(() => (count ? getBonusReward(tokenList, count - 1) : null));
  };
  return { getBonusReward };
}
