import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function useDepositMasterChef() {
  const user = useSelector(selectUser);

  const depositMasterChef = async (id, amount) => {
    if (!user?.wallet_id) return;
    // const amountEther = parseEther(amount?.toString()).toString();
    // return handleContractMasterChefWithSigner
    //     .deposit(id, amountEther)
    //     .then(async (tx) => {
    //         await tx.wait();
    //          ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
    //         // await sleep(15);

    //         getMasterChefRewards(id);
    //     })
    //     .catch(() => null);
  };
  return { depositMasterChef };
}
