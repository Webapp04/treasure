import { useContractTresrCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";

export default function useGetBonousPoolAllocation() {
  const dispatch = useDispatch();
  const handleContractTresrCoinWithSigner = useContractTresrCoinWithSigner();
  const getBonusPoolAllocation = async () => {
    return;
    const contractTresrCoinWithSigner = await handleContractTresrCoinWithSigner;
    return contractTresrCoinWithSigner
      .bonusPoolAllocation()
      .then((tx) => {
        ACTIONS.SET_BONUS_POOL_ALLOCATION(
          dispatch,
          hexToNumber(tx?._hex) / 10 ** 18
        );
      })
      .catch(() => null);
  };
  return { getBonusPoolAllocation };
}
