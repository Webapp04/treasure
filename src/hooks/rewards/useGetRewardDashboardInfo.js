import { useContractTresrStakingCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetRewardDashboardInfo() {
  const handleContractTresrStakingCoinWithSigner =
    useContractTresrStakingCoinWithSigner();

  const getRewardDashboardInfo = async (address) => {
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return Promise.all([
      contractTresrStakingCoinWithSigner
        .getRewardPerSecond(address)
        .then((tx) => hexToNumber(tx?._hex) / 10 ** 18),
      contractTresrStakingCoinWithSigner.pendingVeTresr(address),
      contractTresrStakingCoinWithSigner
        .getStaked(address)
        .then((tx) => hexToNumber(tx?._hex) / 10 ** 18),
      contractTresrStakingCoinWithSigner
        .totalStaked()
        .then((tx) => hexToNumber(tx?._hex) / 10 ** 18),
      contractTresrStakingCoinWithSigner
        .veTresrPerHour(address)
        .then((tx) => hexToNumber(tx?._hex) / 10 ** 18),
      contractTresrStakingCoinWithSigner
        .maxVeTresr(address)
        .then((tx) => hexToNumber(tx?._hex) / 10 ** 18),
      contractTresrStakingCoinWithSigner
        .daysToMax(address)
        .then((tx) => hexToNumber(tx?._hex) / 10 ** 18),
    ]);
  };
  return { getRewardDashboardInfo };
}
