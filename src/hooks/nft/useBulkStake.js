import AirdropApi from "api/AirdropApi";
import {
  ACTIVATE_KEY_ALERT,
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
} from "constant/alert";
import useHandleToken from "hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import useLoadNFTBalance from "./useLoadNFTBalance";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";

export default function useBulkStake() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const nftSelected = useSelector(selectNftSelected);
  const handleToken = useHandleToken();
  const handleLoadNFTBalance = useLoadNFTBalance();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();

  const bulkStake = async (tokenList) => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    contractNFKeyStakingWithSigner
      .bulkStake(tokenList)
      .then(async (tx) => {
        await new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "bulkStakeNFT",
          description: `tokenIds: ${tokenList?.join(",")}`,
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        await handleToken.getcheckTxEvent(tx?.hash, "BulkStaked");
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        await handleLoadNFTBalance.loadNFTBalance(user?.wallet_id);
        for (const tokenItem of tokenList) {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_SUCCESS,
            ACTIVATE_KEY_ALERT(tokenItem, true)
          );
        }
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "bulkStakeNFT",
          description: `tokenIds: ${tokenList?.join(",")}`,
          error: JSON.stringify(err),
        });
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          ACTIVATE_KEY_ALERT(nftSelected?.tokenId, false)
        );
        return null;
      });
  };
  return { bulkStake };
}
