import AirdropApi from "api/AirdropApi";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import useGetTresrRewardsBalance from "./useGetTresrRewardsBalance";
import useBalanceOfTRESR from "./useBalanceOfTRESR";
import useGetAVAXBalance from "./useGetAVAXBalance";
import useGetRewardsReleased from "./useGetRewardsReleased";
import { useContractNFKeyStakingWithSigner } from "hooks/blockchain/useHandleContracts";

export default function useClaimTresrRewards() {
  const dispatch = useDispatch();
  const nftSelected = useSelector(selectNftSelected);
  const user = useSelector(selectUser);
  const handleGetTresrRewardsBalance = useGetTresrRewardsBalance();
  const handleBalanceOfTRESR = useBalanceOfTRESR();
  const handleGetAVAXBalance = useGetAVAXBalance();
  const handleGetRewardsReleased = useGetRewardsReleased();
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();

  const claimTresrRewards = async () => {
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    contractNFKeyStakingWithSigner
      .withdrawTresrRewards(nftSelected?.tokenId)
      .then(async (tx) => {
        await new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          action: "claimTresrRewards",
          type: "PENDING",
          description: "Claim Tresr Rewards",
          tx: JSON.stringify(tx),
        });
        await tx.wait();
        // await sleep(15);
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        await handleGetTresrRewardsBalance.getTresrRewardsBalance(
          nftSelected?.tokenId
        );
        await handleBalanceOfTRESR.balanceOfTRESR(user?.wallet_id);
        handleGetAVAXBalance.getAVAXBalance(user?.wallet_id);
        handleGetRewardsReleased.getRewardsReleased();
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          action: "claimTresrRewards",
          type: "ERROR",
          error: JSON.stringify(err),
        });

        return null;
      });
  };
  return { claimTresrRewards };
}
