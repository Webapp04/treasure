import AirdropApi from "api/AirdropApi";
import {
  ACTIVATE_KEY_ALERT,
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
} from "constant/alert";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import useHandleToken from "hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";

export default function useStake() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const nftSelected = useSelector(selectNftSelected);
  const handleToken = useHandleToken();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();

  const stake = async () => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    await contractNFKeyStakingWithSigner
      .stake(nftSelected?.tokenId)
      .then(async (tx) => {
        await new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "stakeNFT",
          description: `tokenId: ${nftSelected?.tokenId}`,
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        await handleToken.getcheckTxEvent(tx?.hash, "Staked");
        const _token = await handleToken.checkToken(nftSelected?.tokenId);
        if (!_token) return;
        ACTIONS.SET_NFT_LIST_ITEM(dispatch, _token);
        ACTIONS.SET_NFT_SELECTED(dispatch, _token);
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          ACTIVATE_KEY_ALERT(nftSelected?.tokenId, true)
        );
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "stakeNFT",
          description: `tokenId: ${nftSelected?.tokenId}`,
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
  return { stake };
}
