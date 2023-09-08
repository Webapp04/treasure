import { useContractDailyBonusRewardsWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetVeTresrBonusRewardPerSecond() {
  const user = useSelector(selectUser);
  const handleContractDailyBonusRewardsWithSigner =
    useContractDailyBonusRewardsWithSigner();

  const getVeTresrBonusRewardPerSecond = async (
    setVeTresrBonusRewardPerSecond
  ) => {
    if (!user?.wallet_id) return;
    const contractDailyBonusRewardsWithSigner =
      await handleContractDailyBonusRewardsWithSigner;
    return contractDailyBonusRewardsWithSigner
      .getVeTresrBonusRewardPerSecond()
      .then((tx) =>
        setVeTresrBonusRewardPerSecond(hexToNumber(tx?._hex) / 10 ** 18)
      )
      .catch(() => null);
  };
  return { getVeTresrBonusRewardPerSecond };
}
