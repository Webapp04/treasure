import { ethers } from "ethers";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";

export default function useGetPendingAllBaseReward() {
  const dispatch = useDispatch();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const getPendingAllBaseReward = async (tokenList) => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .pendingAllBaseReward(tokenList)
      .then((tx) => {
        ACTIONS.SET_CALIMED_BONUS_TOTAL(
          dispatch,
          +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
        );
      })
      .catch(() => {});
  };
  return { getPendingAllBaseReward };
}
