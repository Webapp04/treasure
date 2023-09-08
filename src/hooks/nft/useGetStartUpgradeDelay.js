import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetStartUpgradeDelay() {
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const getStartUpgradeDelay = async (tokenID, count = 3) => {
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .getUpgradeStart(tokenID)
      .then((tx) => hexToNumber(tx?._hex))
      .catch(() => (count ? getStartUpgradeDelay(tokenID, count - 1) : null));
  };
  return { getStartUpgradeDelay };
}
