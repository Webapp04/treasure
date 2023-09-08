import AirdropApi from "api/AirdropApi";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  UPGRADE_KEY_ALERT,
} from "constant/alert";
import useHandleToken from "hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import useLoadNFTBalance from "./useLoadNFTBalance";
import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";

export default function useBulkUpgradeKeys() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const nftSelected = useSelector(selectNftSelected);
  const handleToken = useHandleToken();
  const handleLoadNFTBalance = useLoadNFTBalance();
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();

  const bulkUpgradeKeys = async (tokenList, amountSMRTR) => {
    // const isApprove = await approveSMRTRByAmount(amountSMRTR);
    // if (!isApprove) return null;
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .bulkUpgradeKeys(tokenList)
      .then(async (tx) => {
        await new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "bulk upgradeKey",
          description: "Bulk Upgraded",
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        await handleToken.getcheckTxEvent(tx?.hash, "BulkUpgraded");
        await handleLoadNFTBalance.loadNFTBalance(user?.wallet_id);
        for (const tokenItem of tokenList) {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_SUCCESS,
            UPGRADE_KEY_ALERT(tokenItem, true)
          );
        }
        return true;
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "upgradeKey",
          error: JSON.stringify(err),
        });
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          UPGRADE_KEY_ALERT(nftSelected?.tokenId, false)
        );
        return null;
      });
  };
  return { bulkUpgradeKeys };
}
