import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";
import useGetTresrRewardsBalance from "./useGetTresrRewardsBalance";

export default function useCalcRewards() {
  const handleGetTresrRewardsBalance = useGetTresrRewardsBalance();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const calcRewards = async (tokenId, count = 3) => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .calcRewards(tokenId)
      .then(
        (tx) => +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
      )
      .catch(() =>
        count
          ? handleGetTresrRewardsBalance.getTresrRewardsBalance(
              tokenId,
              count - 1
            )
          : null
      );
  };
  return { calcRewards };
}
