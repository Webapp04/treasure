import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetTresrRewardsBalance() {
  const dispatch = useDispatch();
  const nftSelected = useSelector(selectNftSelected);
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();

  const getTresrRewardsBalance = async (tokenId, count = 3) => {
    if (!nftSelected?.staked) return ACTIONS.SET_TRESR_REWARDS(dispatch, 0);
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .calcRewards(tokenId)
      .then((tx) => {
        // FIXME: this is for dev
        ACTIONS.SET_TRESR_REWARDS(
          dispatch,
          +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
        );
      })
      .catch(() => (count ? getTresrRewardsBalance(tokenId, count - 1) : null));
  };
  return { getTresrRewardsBalance };
}
