import { useContractTresrStakingCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetDaysToMax() {
  const user = useSelector(selectUser);
  const handleContractTresrStakingCoinWithSigner =
    useContractTresrStakingCoinWithSigner();

  const getDaysToMax = async () => {
    if (!user?.wallet_id) return;
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .daysToMax(user.wallet_id)
      .then((res) => {
        // TODO: set Max Vetresr value
        return hexToNumber(res._hex);
      })
      .catch(() => null);
  };
  return { getDaysToMax };
}
