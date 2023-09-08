import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetJlpTresrBonusRewardPerSecond() {
  const user = useSelector(selectUser);
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const getJlpTresrBonusRewardPerSecond = async (
    setJlpTresrBonusRewardPerSecond
  ) => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .getJlpTresrBonusRewardPerSecond()
      .then((tx) =>
        setJlpTresrBonusRewardPerSecond(hexToNumber(tx?._hex) / 10 ** 18)
      )
      .catch(() => null);
  };
  return { getJlpTresrBonusRewardPerSecond };
}
