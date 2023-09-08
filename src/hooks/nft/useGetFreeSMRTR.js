import AirdropApi from "api/AirdropApi";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";
import useBalanceOfSMRTR from "./useBalanceOfSMRTR";
import useGetAVAXBalance from "./useGetAVAXBalance";
import { useContractSmarterCoinWithSigner } from "hooks/blockchain/useHandleContracts";

export default function useGetFreeSMRTR() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleBalanceOfSMRTR = useBalanceOfSMRTR();
  const handleGetAVAXBalance = useGetAVAXBalance();
  const handleContractSmarterCoinWithSigner =
    useContractSmarterCoinWithSigner();

  const getFreeSMRTR = async () => {
    const contractSmarterCoinWithSigner =
      await handleContractSmarterCoinWithSigner;
    await contractSmarterCoinWithSigner
      .faucet(user?.wallet_id)
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          action: "getFreeSMRTR",
          type: "PENDING",
          description: "Faucet called",
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        // await sleep(15);
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        handleBalanceOfSMRTR.balanceOfSMRTR(user?.wallet_id);
        handleGetAVAXBalance.getAVAXBalance(user?.wallet_id);
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          action: "getFreeSMRTR",
          type: "ERROR",
          error: JSON.stringify(err),
        });

        return null;
      });
  };
  return { getFreeSMRTR };
}
