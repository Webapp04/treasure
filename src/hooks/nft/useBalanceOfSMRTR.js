import { useContractSmarterCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";

export default function useBalanceOfSMRTR() {
  const dispatch = useDispatch();
  const handleContractSmarterCoinWithSigner =
    useContractSmarterCoinWithSigner();

  const balanceOfSMRTR = async (address, count = 3) => {
    const contractSmarterCoinWithSigner =
      await handleContractSmarterCoinWithSigner;
    return contractSmarterCoinWithSigner
      .balanceOf(address)
      .then((tx) => {
        ACTIONS.SET_BALANCE_SMRTR(
          dispatch,
          hexToNumber(tx._hex) / Math.pow(10, 18)
        );
      })
      .catch(() => (count ? balanceOfSMRTR(address, count - 1) : null));
  };
  return { balanceOfSMRTR };
}
