import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function useGetMasterChefRewards() {
  const user = useSelector(selectUser);

  const getMasterChefRewards = async (id) => {
    if (!user?.wallet_id) return;

    // const time = nowUnix() + 400;

    // return handleContractMasterChefWithSigner
    //   .pendingTokens(id, user?.wallet_id, time)
    //   .then((tx) => {
    //     const res = hexToNumber(tx?.result?._hex) / 10 ** 18;

    //     if (id === 0) ACTIONS.SET_BONUS_JLPSMARTR_REWARDS(dispatch, res);
    //     else if (id === 1) ACTIONS.SET_BONUS_JLPTRESR_REWARDS(dispatch, res);

    //     return res;
    //   })
    //   .catch(() => null);
  };

  return { getMasterChefRewards };
}
