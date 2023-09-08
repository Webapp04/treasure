import { useContractWhitelistWithSigner } from "hooks/blockchain/useHandleContracts";

export default function useGetAccountZone() {
  const handleContractWhitelistWithSigner = useContractWhitelistWithSigner();
  const getAccountZone = async (address, zone, proof, wl, count = 3) => {
    const contractWhitelistWithSigner = await handleContractWhitelistWithSigner;
    return contractWhitelistWithSigner
      .getWhitelistZone(address, zone, wl, proof)
      .catch(() =>
        count ? getAccountZone(address, zone, count - 1, wl, proof) : null
      );
  };
  return { getAccountZone };
}
