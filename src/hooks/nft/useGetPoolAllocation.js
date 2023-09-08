import { useContractTresrCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";

export default function useGetPoolAllocation() {
  const dispatch = useDispatch();
  const handleContractTresrCoinWithSigner = useContractTresrCoinWithSigner();
  const getPoolAllocation = async () => {
    return;
    const contractTresrCoinWithSigner = await handleContractTresrCoinWithSigner;
    contractTresrCoinWithSigner
      .poolAllocation()
      .then((tx) => console.log("poolAllocation", tx));

    return contractTresrCoinWithSigner
      .poolAllocation()
      .then((tx) => {
        ACTIONS.SET_POOL_ALLOCATION(dispatch, hexToNumber(tx?._hex) / 10 ** 18);
      })
      .catch(() => null);
  };
  return { getPoolAllocation };
}
