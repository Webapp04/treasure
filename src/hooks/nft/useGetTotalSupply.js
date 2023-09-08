import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetTotalSupply() {
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const getTotalSupply = async (count = 3) => {
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .totalSupply()
      .then((res) => hexToNumber(res?._hex))
      .catch(() => (count ? getTotalSupply(count - 1) : null));
  };
  return { getTotalSupply };
}
