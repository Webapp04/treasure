import AuthApi from "../../api/AuthApi";
import { localStorageRemove, localStorageSet } from "../../utils/localStorage";
import useHandleCustomer from "../customer/useHandleCustomer";
import { useNavigate } from "react-router-dom";
import useWalletConnect from "../blockchain/useWalletConnect";
import { useWeb3React } from "@web3-react/core";
import ACTIONS from "redux/action";
import { useDispatch } from "react-redux";
import useGetSigner from "hooks/blockchain/useHandleContracts";

export default function useHandleAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAdmin = useHandleCustomer();
  const walletConnect = useWalletConnect();
  const { library, deactivate } = useWeb3React();
  const handleGetSigner = useGetSigner();

  const fetchLoginMetamask = async (address, signature) => {
    return new AuthApi()
      .loginMetamask({ address, signature })
      .then((res) => (res?.status ? res?.data : null));
  };

  const login = async () => {
    ACTIONS.SET_PENDING_LOADER(dispatch, true);

    await walletConnect.ethereumListener(logout);
    let signer;

    if (library) {
      signer = library.getSigner();
    } else {
      signer = await handleGetSigner;
    }
    const address = await signer.getAddress();

    if (!address) return ACTIONS.SET_PENDING_LOADER(dispatch, false);

    const nonce = await handleAdmin.getNonce(address);
    if (!nonce) return ACTIONS.SET_PENDING_LOADER(dispatch, false);

    const signature = await signer
      .signMessage(`I am signing my one-time nonce: ${nonce}`)
      .catch(() => null);
    if (!signature) return ACTIONS.SET_PENDING_LOADER(dispatch, false);

    const loginData = await fetchLoginMetamask(address, signature);
    if (!loginData?.token || !loginData?.user)
      return ACTIONS.SET_PENDING_LOADER(dispatch, false);
    ACTIONS.SET_USER(dispatch, loginData?.user);
    localStorageSet("token", loginData?.token);
    ACTIONS.SET_PENDING_LOADER(dispatch, false);
  };

  const logout = () => {
    localStorageRemove("token");
    deactivate();
    localStorageRemove("isWalletConnected");
    ACTIONS.LOGOUT(dispatch);
    navigate("/");
  };

  return { login, logout };
}
