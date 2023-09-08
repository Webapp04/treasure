import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetJlpSmrtBonusRewardPerSecond() {
  const user = useSelector(selectUser);
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const getJlpSmrtBonusRewardPerSecond = async (
    setJlpSmrtBonusRewardPerSecond
  ) => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .getJlpSmrtBonusRewardPerSecond()
      .then((tx) =>
        setJlpSmrtBonusRewardPerSecond(hexToNumber(tx?._hex) / 10 ** 18)
      )
      .catch(() => null);
  };
  return { getJlpSmrtBonusRewardPerSecond };
}
