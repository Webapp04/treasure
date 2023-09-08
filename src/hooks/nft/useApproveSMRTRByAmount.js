import AirdropApi from "api/AirdropApi";
import { useContractSmarterCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";

/* global BigInt */

export default function useApproveSMRTRByAmount() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleContractSmarterCoinWithSigner =
    useContractSmarterCoinWithSigner();

  const approveSMRTRByAmount = async (amount) => {
    const sumToApprove = BigInt(amount * Math.pow(10, 18));
    const contractSmarterCoinWithSigner =
      await handleContractSmarterCoinWithSigner;

    return contractSmarterCoinWithSigner
      .approve(process.env.REACT_APP_NFKEY_ADDRESS, sumToApprove)
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "approveSMRTR",
          description: "approveSMRTR",
          tx: JSON.stringify(tx),
        });

        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        return true;
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "approveSMRTR",
          error: JSON.stringify(err),
        });

        return err;
      });
  };
  return { approveSMRTRByAmount };
}
