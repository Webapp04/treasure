import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetKeyLevelP() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const getkeyLevelP = async () => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    return contractNFKeyStakingWithSigner
      .portion(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_KEYLEVEL_P(dispatch, hexToNumber(tx?._hex) / 1e34);
      })
      .catch(() => null);
  };
  return { getkeyLevelP };
}
