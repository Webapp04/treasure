import { useContractTresrStakingCoinWithSigner } from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function useGetMaxVeTresr() {
  const user = useSelector(selectUser);
  const handleContractTresrStakingCoinWithSigner =
    useContractTresrStakingCoinWithSigner();

  const getMaxVeTresr = async () => {
    if (!user?.wallet_id) return;
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .maxVeTresr(user.wallet_id)
      .then((res) => {
        // TODO: set Max Vetresr value
        return res._hex / 1e18;
      })
      .catch(() => null);
  };
  return { getMaxVeTresr };
}
