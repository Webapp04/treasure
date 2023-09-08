import { useContractDailyBonusRewards } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectNftList } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetPendingTotalRewards() {
  const nftLists = useSelector(selectNftList);
  const user = useSelector(selectUser);
  const handleContractDailyBonusRewards = useContractDailyBonusRewards();

  const getPendingTotalRewards = async (count = 3) => {
    if (!user?.wallet_id) return;
    if (nftLists?.length == 0) return 0;
    const ownTokenList = nftLists
      ?.filter((item) => item?.owner === user?.wallet_id)
      ?.map((item) => +item?.tokenId);
    const contractDailyBonusRewards = await handleContractDailyBonusRewards;
    return contractDailyBonusRewards
      .pendingTotalReward(user?.wallet_id, ownTokenList)
      .then((res) => hexToNumber(res?._hex) / 1e18)
      .catch(() => (count ? getPendingTotalRewards(count - 1) : null));
  };
  return { getPendingTotalRewards };
}
