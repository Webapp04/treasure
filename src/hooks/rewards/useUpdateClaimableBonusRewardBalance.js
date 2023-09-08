import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useUpdateClaimableBonusRewardBalance() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const updateClaimableBonusRewardBalance = async () => {
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    Promise.all([
      contractDailyBonusRewardsWithSigner.getVeTresrBonusReward(
        user?.wallet_id
      ),
      contractDailyBonusRewardsWithSigner.getJlpSmrtBonusReward(
        user?.wallet_id
      ),
      contractDailyBonusRewardsWithSigner.getJlpTresrBonusReward(
        user?.wallet_id
      ),
      contractDailyBonusRewardsWithSigner.getKeyLevelBonusReward(
        user?.wallet_id
      ),
    ]).then((res) => {
      ACTIONS.SET_BONUS_VETRESR_REWARDS(
        dispatch,
        hexToNumber(res[0]?._hex) / 10 ** 18
      );
      ACTIONS.SET_BONUS_JLPSMARTR_REWARDS(
        dispatch,
        hexToNumber(res[1]?._hex) / 10 ** 18
      );
      ACTIONS.SET_BONUS_JLPTRESR_REWARDS(
        dispatch,
        hexToNumber(res[2]?._hex) / 10 ** 18
      );
      ACTIONS.SET_BONUS_KEY_LEVEL_REWARDS(
        dispatch,
        hexToNumber(res[3]?._hex) / 10 ** 18
      );
    });
  };
  return { updateClaimableBonusRewardBalance };
}
