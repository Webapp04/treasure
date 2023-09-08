import { useContractDailyBonusRewards } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetCumulativeLevels() {
  const user = useSelector(selectUser);
  const handleContractDailyBonusRewards = useContractDailyBonusRewards();

  const getCumulativeLevels = async () => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewards = await handleContractDailyBonusRewards;
    return contractDailyBonusRewards
      .cumulatedKeys(user.wallet_id)
      .then((res) => {
        // TODO: set cumulated levels value
        return hexToNumber(res._hex);
      })
      .catch(() => null);
  };
  return { getCumulativeLevels };
}
