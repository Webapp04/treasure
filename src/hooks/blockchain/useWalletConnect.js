import { ethers } from "ethers";
import { AVALANCHE_TESTNET_PARAMS } from "../../constant/blockchain";
import { hexToNumber, isAvalancheChain } from "../../utils/blockchain";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";
import {
  useContractNFKeyWithSigner,
  useContractWhitelistWithSigner,
} from "./useHandleContracts";

export default function useWalletConnect() {
  const dispatch = useDispatch();
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();
  const handleContractWhitelistWithSigner = useContractWhitelistWithSigner();

  const switchToAvalancheChain = async () => {
    await window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [AVALANCHE_TESTNET_PARAMS],
      })
      .catch(() => null);
  };

  const balanceOf = async (address) => {
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    await contractNFKeyWithSigner
      .balanceOf(address)
      .then((res) => ACTIONS.SET_TOKENS_COUNT(dispatch, hexToNumber(res?._hex)))
      .catch(() => null);
  };

  const ethereumListener = async (callback) => {
    try {
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (!isAvalancheChain(chainId.toString(16)))
          await switchToAvalancheChain();
        await provider.send("eth_requestAccounts", []);

        window.ethereum.on("accountsChanged", callback);
        window.ethereum.on("chainChanged", callback);
      }
    } catch (err) {}
  };

  const connectWallet = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork().catch(() => null);
    if (!network) return;

    if (!isAvalancheChain(network?.chainId?.toString(16)))
      await switchToAvalancheChain();

    await findWallet(address);
  };

  const findWallet = async (address) => {
    await balanceOf(address);
    const contractWhitelistWithSigner = await handleContractWhitelistWithSigner;
    contractWhitelistWithSigner.getAddressToWhitelist(address).then((res) =>
      ACTIONS.SET_WHITELIST_STATUS(dispatch, {
        whitelistAddress: address,
        level: hexToNumber(res?._hex),
      })
    );
  };

  return {
    connectWallet,
    ethereumListener,
  };
}
