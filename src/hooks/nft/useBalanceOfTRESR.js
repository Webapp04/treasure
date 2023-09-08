import { useContractTresrCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";

export default function useBalanceOfTRESR() {
  const dispatch = useDispatch();
  const hanldeContractTresrCoinWithSigner = useContractTresrCoinWithSigner();

  const balanceOfTRESR = async (address, count = 3) => {
    const contractTresrCoinWithSigner = await hanldeContractTresrCoinWithSigner;
    return contractTresrCoinWithSigner
      .balanceOf(address)
      .then((tx) => {
        ACTIONS.SET_BALANCE_TRESR(
          dispatch,
          hexToNumber(tx._hex) / Math.pow(10, 18)
        );
      })
      .catch(() => (count ? balanceOfTRESR(address, count - 1) : null));
  };
  return { balanceOfTRESR };
}
