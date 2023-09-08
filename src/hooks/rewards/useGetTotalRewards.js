import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function useGetTotalRewards() {
  const user = useSelector(selectUser);
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const getTotalRewards = async () => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .totalPortion(user?.wallet_id)
      .then(async (res) => {
        // Todo: set unclaimable veTresr Balance
        return res._hex / 1e34;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { getTotalRewards };
}
