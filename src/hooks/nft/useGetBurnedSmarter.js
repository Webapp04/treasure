import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import { hexToNumber } from "utils/blockchain";
import useGetAccountZone from "./useGetAccountZone";

export default function useGetBurnedSmarter() {
  const dispatch = useDispatch();
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const handleGetAccountZone = useGetAccountZone();
  const getBurnedSmarter = async (count = 3) => {
    return;
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .burnedSmarter()
      .then((tx) => {
        ACTIONS.SET_BURNED_SMRTR(dispatch, hexToNumber(tx?._hex) / 10 ** 18);
      })
      .catch(() =>
        count ? handleGetAccountZone.getAccountZone(count - 1) : null
      );
  };
  return { getBurnedSmarter };
}
