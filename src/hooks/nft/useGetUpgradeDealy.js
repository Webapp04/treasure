import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetUpgradeDelay() {
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const getUpgradeDelay = async (tokenID, count = 3) => {
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .getUpgradeDelay(tokenID)
      .then((tx) => hexToNumber(tx?._hex))
      .catch(() => (count ? getUpgradeDelay(tokenID, count - 1) : null));
  };
  return { getUpgradeDelay };
}
