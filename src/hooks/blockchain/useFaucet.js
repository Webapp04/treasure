import useHandleNFT from "./useHandleNFT";
import useHandleLpStaking from "./useHandleLpStaking";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import {
  useContractLpCoinSMRTRAVAXWithSigner,
  useContractLpCoinTRESRAVAXWithSigner,
  useContractSmarterCoinWithSigner,
  useContractTresrCoinWithSigner,
} from "./useHandleContracts";

export default function useGetTokenPrice() {
  const user = useSelector(selectUser);
  const handleNFT = useHandleNFT();
  const handleLpStaking = useHandleLpStaking();
  const handleContractLpCoinSMRTRAVAXWithSigner =
    useContractLpCoinSMRTRAVAXWithSigner();
  const handleContractLpCoinTRESRAVAXWithSigner =
    useContractLpCoinTRESRAVAXWithSigner();
  const handleContractSmarterCoinWithSigner =
    useContractSmarterCoinWithSigner();
  const handleContractTresrCoinWithSigner = useContractTresrCoinWithSigner();

  const getSMRTR = async () => {
    const contractSmarterCoinWithSigner =
      await handleContractSmarterCoinWithSigner;
    return contractSmarterCoinWithSigner
      .faucet(user?.wallet_id)
      .then(async (tx) => {
        await tx.wait();
        await handleNFT.balanceOfSMRTR(user?.wallet_id);
      });
  };

  const getTRESR = async () => {
    const contractTresrCoinWithSigner = await handleContractTresrCoinWithSigner;
    return contractTresrCoinWithSigner
      .faucet(user?.wallet_id)
      .then(async (tx) => {
        await tx.wait();
        await handleNFT.balanceOfTRESR(user?.wallet_id);
      });
  };

  const getSMRTRLP = async () => {
    const contractLpCoinSMRTRAVAXWithSigner =
      await handleContractLpCoinSMRTRAVAXWithSigner;
    return contractLpCoinSMRTRAVAXWithSigner
      .faucet(user?.wallet_id)
      .then(async (tx) => {
        await tx.wait();
        await handleLpStaking.balanceOfLp(user?.wallet_id);
      });
  };

  const getTRESRLP = async () => {
    const contractLpCoinTRESRAVAXWithSigner =
      await handleContractLpCoinTRESRAVAXWithSigner;
    return contractLpCoinTRESRAVAXWithSigner
      .faucet(user?.wallet_id)
      .then(async (tx) => {
        await tx.wait();
        await handleLpStaking.balanceOfLp(user?.wallet_id);
      });
  };

  return {
    getSMRTR,
    getTRESR,
    getSMRTRLP,
    getTRESRLP,
  };
}
