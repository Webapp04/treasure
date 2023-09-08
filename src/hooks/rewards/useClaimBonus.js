import AirdropApi from "api/AirdropApi";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  CLAIM_BONUS_REWARDS_ALERT,
} from "constant/alert";
import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import useHandleNFT from "hooks/blockchain/useHandleNFT";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";
import useGetKeyLevelBonusReward from "./useGetKeyLevelBonusReward";
import useGetJlpSmrtBonusReward from "./useGetJlpSmrtBonusReward";
import useGetJlpTresrBonusReward from "./useGetJlpTresrBonusReward";
import useGetVeTresrBonusRewards from "./useGetVeTresrBonusRewards";

export default function useClaimBonus() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();
  const handleNFT = useHandleNFT();
  const handleGetKeyLevelBonusReward = useGetKeyLevelBonusReward();
  const handleGetJlpSmrtBonusReward = useGetJlpSmrtBonusReward();
  const handleGetJlpTresrBonusReward = useGetJlpTresrBonusReward();
  const handleGetVeTresrBonusRewards = useGetVeTresrBonusRewards();

  const claimBonus = async () => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .claimBonusReward()
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "claimBonus",
          description: `Claimed bonus`,
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        // await sleep(15);
        handleNFT.balanceOfTRESR(user?.wallet_id);
        handleNFT.getAVAXBalance(user?.wallet_id);
        handleNFT.getBonusPoolAllocation();
        handleGetKeyLevelBonusReward.getKeyLevelBonusReward();
        handleGetJlpSmrtBonusReward.getJlpSmrtBonusReward();
        handleGetJlpTresrBonusReward.getJlpTresrBonusReward();
        handleGetVeTresrBonusRewards.getVeTresrBonusReward();
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          CLAIM_BONUS_REWARDS_ALERT(true)
        );
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "claimBonus",
          description: `Claimed bonus`,
          error: JSON.stringify(err),
        });
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          CLAIM_BONUS_REWARDS_ALERT(false)
        );
        return null;
      });
  };
  return { claimBonus };
}
