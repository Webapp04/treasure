import { useContractDailyBonusRewards } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";

export default function useUpdateBurnedEmissionInfo() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleContractDailyBonusRewards = useContractDailyBonusRewards();

  const updateBurnedEmissionInfo = async () => {
    // return;
    if (!user?.wallet_id) return;
    const contractDailyBonusRewards = await handleContractDailyBonusRewards;
    Promise.all([
      contractDailyBonusRewards.burned(),
      contractDailyBonusRewards.emission(),
    ]).then((res) => {
      ACTIONS.SET_BURNED_SMRTR(dispatch, res[0][0]._hex / 1e18);
      ACTIONS.SET_BURNED_TRESR(dispatch, res[0][1]._hex / 1e18);
      ACTIONS.SET_POOL_ALLOCATION(dispatch, res[1][0]._hex / 1e18);
      ACTIONS.SET_BONUS_POOL_ALLOCATION(dispatch, res[1][1]._hex / 1e18);
      return res;
    });
  };
  return { updateBurnedEmissionInfo };
}
