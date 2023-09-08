import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetKeyLevelBonusRewardPerSecond() {
  const user = useSelector(selectUser);
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const getKeyLevelBonusRewardPerSecond = async (
    setKeyLevelBonusRewardPerSecond
  ) => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .getKeyLevelBonusRewardPerSecond()
      .then((tx) =>
        setKeyLevelBonusRewardPerSecond(hexToNumber(tx?._hex) / 10 ** 18)
      )
      .catch(() => null);
  };
  return { getKeyLevelBonusRewardPerSecond };
}
