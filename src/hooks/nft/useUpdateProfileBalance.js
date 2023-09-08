import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";
import {
  useContractLpCoinTRESRAVAXWithSigner,
  useContractLpStakingTRESRAVAXWithSigner,
  useContractSmarterCoinWithSigner,
  useContractTresrCoinWithSigner,
} from "hooks/blockchain/useHandleContracts";

export default function useUpdateProfileBalance() {
  const dispatch = useDispatch();
  const handleContractLpCoinTRESRAVAXWithSigner =
    useContractLpCoinTRESRAVAXWithSigner();
  const handleContractLpStakingTRESRAVAXWithSigner =
    useContractLpStakingTRESRAVAXWithSigner();
  const handleContractSmarterCoinWithSigner =
    useContractSmarterCoinWithSigner();
  const handleContractTresrCoinWithSigner = useContractTresrCoinWithSigner();

  const updateProfileBalance = async (address, count = 3) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractSmarterCoinWithSigner =
      await handleContractSmarterCoinWithSigner;
    const contractTresrCoinWithSigner = await handleContractTresrCoinWithSigner;
    const contractLpCoinTRESRAVAXWithSigner =
      await handleContractLpCoinTRESRAVAXWithSigner;
    const contractLpStakingTRESRAVAXWithSigner =
      await handleContractLpStakingTRESRAVAXWithSigner;
    Promise.all([
      contractSmarterCoinWithSigner.balanceOf(address),
      contractTresrCoinWithSigner.balanceOf(address),
      provider.getBalance(address),
      contractLpCoinTRESRAVAXWithSigner.balanceOf(address),
      contractLpStakingTRESRAVAXWithSigner.stakedBalanceOf(address),
    ]).then((res) => {
      ACTIONS.SET_BALANCE_SMRTR(
        dispatch,
        hexToNumber(res[0]._hex) / Math.pow(10, 18)
      );
      ACTIONS.SET_BALANCE_TRESR(
        dispatch,
        hexToNumber(res[1]._hex) / Math.pow(10, 18)
      );
      ACTIONS.SET_BALANCE_AVAX(dispatch, +ethers.utils.formatEther(res[2]));
      ACTIONS.SET_BALANCE_LP_TRESRAVAX(
        dispatch,
        hexToNumber(res[3]._hex) / Math.pow(10, 18)
      );
      ACTIONS.SET_BALANCE_LP_STAKED_TRESRAVAX(
        dispatch,
        hexToNumber(res[4]._hex) / Math.pow(10, 18)
      );
    });
  };
  return { updateProfileBalance };
}
