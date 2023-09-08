import AirdropApi from "api/AirdropApi";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  CLAIM_FOUNDERS_REWARDS_ALERT,
} from "constant/alert";
import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import useHandleNFT from "hooks/blockchain/useHandleNFT";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";

export default function useClaimBase() {
  const nftSelected = useSelector(selectNftSelected);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleNFT = useHandleNFT();
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const claimBase = async () => {
    if (!user?.wallet_id) return;
    if (!nftSelected?.tokenId) return;

    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .claimBase(nftSelected?.tokenId)
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "claimBase",
          description: `Claimed base`,
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        // await sleep(15);

        handleNFT.getRewardsReleased();
        handleNFT.balanceOfTRESR(user?.wallet_id);
        handleNFT.getAVAXBalance(user?.wallet_id);
        handleNFT.getPoolAllocation();

        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          CLAIM_FOUNDERS_REWARDS_ALERT(true)
        );
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "claimBase",
          description: `Claimed base`,
          error: JSON.stringify(err),
        });

        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          CLAIM_FOUNDERS_REWARDS_ALERT(false)
        );

        return null;
      });
  };
  return { claimBase };
}
