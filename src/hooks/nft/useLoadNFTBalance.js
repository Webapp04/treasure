import useHandleToken from "hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";

export default function useLoadNFTBalance() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleToken = useHandleToken();

  const loadNFTBalance = async (contractAddress) => {
    if (user?.wallet_id) {
      const tokenList = await handleToken.getTokenList(contractAddress);
      if (!tokenList?.length) return;
      ACTIONS.SET_NFT_SELECTED(
        dispatch,
        tokenList?.find((item) => item?.owner === user?.wallet_id)
      );
      ACTIONS.SET_NFT_LIST(dispatch, tokenList);
    }
  };

  return { loadNFTBalance };
}
