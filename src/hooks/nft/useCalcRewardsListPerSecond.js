import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useCalcRewardsListPerSecond() {
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const calcRewardsListPerSecond = async (tokenIDList) => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return (
      await Promise.all(
        tokenIDList.map((item) =>
          contractNFKeyStakingWithSigner
            .calcRewardsPerSecond(item)
            .then(
              (tx) =>
                +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
            )
            .catch(() => 0)
        )
      )
    ).reduce((acc, val) => acc + val, 0);
  };
  return { calcRewardsListPerSecond };
}
