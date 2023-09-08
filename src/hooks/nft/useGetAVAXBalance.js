import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";

export default function useGetAVAXBalance() {
  const dispatch = useDispatch();

  const getAVAXBalance = async (address, count = 3) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider
      .getBalance(address)
      .then((balance) => {
        ACTIONS.SET_BALANCE_AVAX(dispatch, +ethers.utils.formatEther(balance));
      })
      .catch(() => (count ? getAVAXBalance(address, count - 1) : null));
  };

  return { getAVAXBalance };
}
