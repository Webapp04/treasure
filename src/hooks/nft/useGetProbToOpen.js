import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetProbToOpen() {
  const nftSelected = useSelector(selectNftSelected);
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const getProbToOpen = async (tokenId, count = 3) => {
    if (!nftSelected?.staked) return null;
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .calcBaseProbToOpen(tokenId)
      .then((tx) => hexToNumber(tx?._hex) / 10)
      .catch(() => (count ? getProbToOpen(tokenId, count - 1) : null));
  };
  return { getProbToOpen };
}
