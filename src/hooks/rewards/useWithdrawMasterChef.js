import { parseEther } from "ethers/lib/utils";
import { useContractMasterChefWithSigner } from "hooks/blockchain/useHandleContracts";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";
import useGetMasterChefRewards from "./useGetMasterChefRewards";

export default function useWithdrawMasterChef() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleContractMasterChefWithSigner = useContractMasterChefWithSigner();
  const handleGetMasterChefRewards = useGetMasterChefRewards();

  const withdrawMasterChef = async (id, amount) => {
    if (!user?.wallet_id) return;
    const amountEther = parseEther(amount?.toString()).toString();
    const contractMasterChefWithSigner =
      await handleContractMasterChefWithSigner;
    return contractMasterChefWithSigner
      .withdraw(id, amountEther)
      .then(async (tx) => {
        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        // await sleep(15);
        handleGetMasterChefRewards.getMasterChefRewards(id);
      })
      .catch(() => null);
  };
  return { withdrawMasterChef };
}
