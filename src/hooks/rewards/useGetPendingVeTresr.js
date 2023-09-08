import { useContractTresrStakingCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function useGetPendingVeTresr() {
  const user = useSelector(selectUser);
  const handleContractTresrStakingCoinWithSigner =
    useContractTresrStakingCoinWithSigner();

  const getPendingVeTresr = async () => {
    if (!user?.wallet_id) return;
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .pendingVeTresr(user?.wallet_id)
      .then(async (res) => {
        // Todo: set unclaimable veTresr Balance
        return res._hex / 1e18;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { getPendingVeTresr };
}
