import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";

export default function useTimeToTreasureAvailable() {
  const dispatch = useDispatch();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const timeToTreasureAvailable = async (tokenId, count = 3) => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .getTimeToTreasureUnlock(tokenId)
      .then((tx) => {
        //FIXME: 100->1000
        ACTIONS.SET_BALANCE_TRESR_TIME_UNLOCK(
          dispatch,
          hexToNumber(tx?._hex) * 1000
        );
        return hexToNumber(tx?._hex);
      })
      .catch(() =>
        count ? timeToTreasureAvailable(tokenId, count - 1) : null
      );
  };
  return { timeToTreasureAvailable };
}
