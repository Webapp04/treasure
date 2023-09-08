import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  CLAIM_FOUNDERS_REWARDS_ALERT,
} from "constant/alert";
import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import useHandleNFT from "hooks/blockchain/useHandleNFT";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftList, selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";

export default function useClaimAllBase() {
  const nftSelected = useSelector(selectNftSelected);
  const nftLists = useSelector(selectNftList);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleNFT = useHandleNFT();
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const claimAllBase = async () => {
    if (!user?.wallet_id) return;
    if (!nftSelected?.tokenId) return;

    const tokenIdList = nftLists
      ?.filter((item) => item?.staked == true)
      ?.map((item) => item.tokenId);
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .claimAllBaseReward(tokenIdList)
      .then(async (tx) => {
        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);

        handleNFT.getRewardsReleased();
        handleNFT.balanceOfTRESR(user?.wallet_id);
        handleNFT.getAVAXBalance(user?.wallet_id);
        handleNFT.getPoolAllocation();
        handleNFT.getPendingAllBaseReward(tokenIdList);

        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          CLAIM_FOUNDERS_REWARDS_ALERT(true)
        );
      })
      .catch((err) => {
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          CLAIM_FOUNDERS_REWARDS_ALERT(false)
        );

        return null;
      });
  };
  return { claimAllBase };
}
