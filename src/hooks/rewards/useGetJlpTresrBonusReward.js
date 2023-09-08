import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetJlpTresrBonusReward() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const getJlpTresrBonusReward = async () => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .getJlpTresrBonusReward(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_BONUS_JLPTRESR_REWARDS(
          dispatch,
          hexToNumber(tx?._hex) / 10 ** 18
        );
      })
      .catch(() => null);
  };
  return { getJlpTresrBonusReward };
}
