import { useContractTresrCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";

export default function useGetBurnedTresr() {
  const dispatch = useDispatch();
  const handleContractTresrCoinWithSigner = useContractTresrCoinWithSigner();
  const getBurnedTresr = async () => {
    return;
    const contractTresrCoinWithSigner = await handleContractTresrCoinWithSigner;
    return contractTresrCoinWithSigner
      .burned()
      .then((tx) => {
        ACTIONS.SET_BURNED_TRESR(dispatch, hexToNumber(tx?._hex) / 10 ** 18);
      })
      .catch(() => null);
  };
  return { getBurnedTresr };
}
