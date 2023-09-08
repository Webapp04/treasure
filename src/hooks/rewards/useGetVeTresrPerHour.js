import { useContractTresrStakingCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function useGetVeTresrPerHour() {
  const user = useSelector(selectUser);
  const handleContractTresrStakingCoinWithSigner =
    useContractTresrStakingCoinWithSigner();

  const getVeTresrPerHour = async () => {
    if (!user?.wallet_id) return;
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .veTresrPerHour(user.wallet_id)
      .then((res) => {
        // TODO: set veTresr/hour value
        return res._hex / 1e18;
      })
      .catch(() => null);
  };
  return { getVeTresrPerHour };
}
