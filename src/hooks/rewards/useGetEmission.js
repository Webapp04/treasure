import { useContractDailyBonusRewards } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";

export default function useGetEmission() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleContractDailyBonusRewards = useContractDailyBonusRewards();

  const getEmission = async () => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewards = await handleContractDailyBonusRewards;
    return contractDailyBonusRewards
      .emission()
      .then((res) => {
        // TODO: set Base & Bonus pool Tresr emission value
        ACTIONS.SET_POOL_ALLOCATION(dispatch, res[0]._hex / 1e18);
        ACTIONS.SET_BONUS_POOL_ALLOCATION(dispatch, res[1]._hex / 1e18);
        return res;
      })
      .catch(() => null);
  };
  return { getEmission };
}
