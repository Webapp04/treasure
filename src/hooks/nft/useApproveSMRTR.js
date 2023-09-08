import AirdropApi from "api/AirdropApi";
import {
  useContractNFKeyWithSigner,
  useContractSmarterCoinWithSigner,
} from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";

export default function useApproveSMRTR() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const nftSelected = useSelector(selectNftSelected);
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const handleContractSmarterCoinWithSigner =
    useContractSmarterCoinWithSigner();

  const approveSMRTR = async () => {
    if (!nftSelected?.tier) return;
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    const contractSmarterCoinWithSigner =
      await handleContractSmarterCoinWithSigner;

    const amountUpgradeKey = contractNFKeyWithSigner
      .getAmountUpgradeKey(+nftSelected?.tier)
      .then((tx) => tx?._hex);
    if (!amountUpgradeKey) return;

    return contractSmarterCoinWithSigner
      .approve(process.env.REACT_APP_NFKEY_ADDRESS, amountUpgradeKey)
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

        throw err;
      });
  };
  return { approveSMRTR };
}
