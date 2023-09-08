import AirdropApi from "api/AirdropApi";
import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import useHandleNFT from "hooks/blockchain/useHandleNFT";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftList } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import useGetKeyLevelBonusReward from "./useGetKeyLevelBonusReward";
import useGetJlpSmrtBonusReward from "./useGetJlpSmrtBonusReward";
import useGetJlpTresrBonusReward from "./useGetJlpTresrBonusReward";
import useGetVeTresrBonusRewards from "./useGetVeTresrBonusRewards";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  CLAIM_ALL_REWARDS_ALERT,
} from "constant/alert";

export default function useClaimAll() {
  const nftLists = useSelector(selectNftList);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleNFT = useHandleNFT();
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();
  const handleGetKeyLevelBonusReward = useGetKeyLevelBonusReward();
  const handleGetJlpSmrtBonusReward = useGetJlpSmrtBonusReward();
  const handleGetJlpTresrBonusReward = useGetJlpTresrBonusReward();
  const handleGetVeTresrBonusRewards = useGetVeTresrBonusRewards();

  const claimAll = async () => {
    if (!user?.wallet_id) return;

    const ownTokenList = nftLists
      ?.filter((item) => item?.owner === user?.wallet_id)
      ?.filter((item) => item?.staked == true)
      ?.map((item) => +item?.tokenId);
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .claimAll(ownTokenList)
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "claimAll",
          description: `Claimed all`,
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        // await sleep(15);
        handleNFT.getRewardsReleased();
        handleNFT.balanceOfTRESR(user?.wallet_id);
        handleNFT.getAVAXBalance(user?.wallet_id);
        handleNFT.getBonusPoolAllocation();
        handleNFT.getPoolAllocation();
        handleNFT.getTresrRewardsBalance();
        handleGetKeyLevelBonusReward.getKeyLevelBonusReward();
        handleGetJlpSmrtBonusReward.getJlpSmrtBonusReward();
        handleGetJlpTresrBonusReward.getJlpTresrBonusReward();
        handleGetVeTresrBonusRewards.getVeTresrBonusReward();
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          CLAIM_ALL_REWARDS_ALERT(true)
        );
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "claimAll",
          description: `Claimed all`,
          error: JSON.stringify(err),
        });
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          CLAIM_ALL_REWARDS_ALERT(false)
        );
        return null;
      });
  };
  return { claimAll };
}
