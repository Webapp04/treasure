import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";

export default function useTargetUpgradeDate() {
  const dispatch = useDispatch();
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const targetUpgradeDate = async (tokenID, count = 3) => {
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .getUpgradeDelay(tokenID)
      .then((tx) =>
        ACTIONS.SET_TARGET_UPGRADE_DATE(dispatch, hexToNumber(tx?._hex))
      )
      .catch(() => (count ? targetUpgradeDate(tokenID, count - 1) : null));
  };
  return { targetUpgradeDate };
}
