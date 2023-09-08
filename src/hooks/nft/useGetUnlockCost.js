import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetUnlockCost() {
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const getUnlockCost = async (tokenID, count = 3) => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .calcUnlockCost(tokenID)
      .then(
        (tx) => +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
      )
      .catch(() => (count ? getUnlockCost(tokenID, count - 1) : 0));
  };
  return { getUnlockCost };
}
