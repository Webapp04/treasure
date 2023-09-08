import useHandleToken from "hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";

export default function useReloadNFTItemBalance() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleToken = useHandleToken();

  const reloadNFTItemBalance = async (contractAddress, tokenID) => {
    if (!user?.wallet_id) return;
    const isKeyContract =
      contractAddress?.toLowerCase() ===
      process.env.REACT_APP_NFKEY_ADDRESS?.toLowerCase();

    const token = await handleToken.checkToken(tokenID);
    if (!token) return;
    ACTIONS.SET_NFT_LIST_ITEM(dispatch, token);
    ACTIONS.SET_CURRENT_TOKEN(dispatch, token);
    if (token?.owner === user?.wallet_id) {
      ACTIONS.SET_NFT_SELECTED(dispatch, token);
    }
  };

  return { reloadNFTItemBalance };
}
