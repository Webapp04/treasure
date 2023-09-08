import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetAmountUpgradeKey() {
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const getAmountUpgradeKey = async (currentTier, count = 3) => {
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .getAmountUpgradeKey(currentTier)
      .then((tx) => hexToNumber(tx?._hex)?.toString() / 10 ** 18)
      .then((res) => Math.ceil(+res))
      .catch(() => (count ? getAmountUpgradeKey(currentTier, count - 1) : 0));
  };
  return { getAmountUpgradeKey };
}
