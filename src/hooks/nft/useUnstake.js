import AirdropApi from "api/AirdropApi";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  DEACTIVATE_KEY_ALERT,
} from "constant/alert";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import useHandleToken from "hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";

export default function useUnstake() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const nftSelected = useSelector(selectNftSelected);
  const handleToken = useHandleToken();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();

  const unstake = async () => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    await contractNFKeyStakingWithSigner
      .unstake(nftSelected?.tokenId)
      .then(async (tx) => {
        await new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "unstakeNFT",
          description: `tokenId: ${nftSelected?.tokenId}`,
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        const _token = await handleToken.checkToken(nftSelected?.tokenId);
        if (!_token) return;
        ACTIONS.SET_NFT_LIST_ITEM(dispatch, _token);
        ACTIONS.SET_NFT_SELECTED(dispatch, _token);
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          DEACTIVATE_KEY_ALERT(nftSelected?.tokenId, true)
        );
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "unstakeNFT",
          description: `tokenId: ${nftSelected?.tokenId}`,
          error: JSON.stringify(err),
        });
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          DEACTIVATE_KEY_ALERT(nftSelected?.tokenId, false)
        );
        return null;
      });
  };
  return { unstake };
}
