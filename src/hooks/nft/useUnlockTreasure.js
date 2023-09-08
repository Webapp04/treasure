import AirdropApi from "api/AirdropApi";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import useHandleToken from "hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";

export default function useUnlockTreasure() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const nftSelected = useSelector(selectNftSelected);
  const handleToken = useHandleToken();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();

  const unlockTreasure = async () => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .openChest(nftSelected?.tokenId)
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "openChest",
          description: `tokenId: ${nftSelected?.tokenId}`,
          tx: JSON.stringify(tx),
        });
        const transaction = await tx.wait();
        await handleToken.getcheckTxEvent(tx?.hash, "Opened");
        const _token = await handleToken.checkToken(nftSelected?.tokenId);
        if (!_token) return;
        ACTIONS.SET_NFT_LIST_ITEM(dispatch, _token);
        ACTIONS.SET_NFT_SELECTED(dispatch, _token);
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        const event = transaction?.events?.find(
          (item) => item?.event === "Opened"
        );
        const statusChest = event?.args[2];
        return statusChest;
      })
      .catch(async (err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "openChest",
          description: `tokenId: ${nftSelected?.tokenId}`,
          error: JSON.stringify(err),
        });

        const _token = await handleToken.checkToken(nftSelected?.tokenId);
        if (!_token) return;
        ACTIONS.SET_NFT_LIST_ITEM(dispatch, _token);
        ACTIONS.SET_NFT_SELECTED(dispatch, _token);
        throw err;
      });
  };
  return { unlockTreasure };
}
