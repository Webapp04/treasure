import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useGetZoneCommission() {
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const getZoneCommission = async (address, zone, count = 3) => {
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .getZoneCommission(address, zone)
      .then((res) => hexToNumber(res?._hex))
      .catch(() =>
        count ? getZoneCommission(address, zone, count - 1) : null
      );
  };
  return { getZoneCommission };
}
