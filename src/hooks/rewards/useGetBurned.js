import { useContractDailyBonusRewards } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";

export default function useGetBurned() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleContractDailyBonusRewards = useContractDailyBonusRewards();

  const getBurned = async () => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewards = await handleContractDailyBonusRewards;
    return contractDailyBonusRewards
      .burned()
      .then((res) => {
        // TODO: set Smtr & Tresr Burned value
        ACTIONS.SET_BURNED_SMRTR(dispatch, res[0]._hex / 1e18);
        ACTIONS.SET_BURNED_TRESR(dispatch, res[1]._hex / 1e18);
        return res;
      })
      .catch(() => null);
  };
  return { getBurned };
}
