import { useMemo } from "react";
import { ethers } from "ethers";
import AirdropApi from "../../api/AirdropApi";
import useHandleToastAlert from "../alert/useHandleToastAlert";
import { hexToNumber } from "../../utils/blockchain";
import { nowUnix, sleep } from "../../utils";
import useHandleNFT from "./useHandleNFT";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  STAKE_TRESR,
  UNSTAKE_TRESR,
} from "../../constant/alert";
import useHandleRewards from "./useHandleRewards";
import ACTIONS from "redux/action";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTresrBalance,
  selectTresrStakedBalance,
} from "redux/slice/balanceSlice";
import { selectUser } from "redux/slice/userSlice";
import {
  useContractTresrCoinWithSigner,
  useContractTresrStakingCoinWithSigner,
} from "./useHandleContracts";

export default function useHandleTresrStaking() {
  const user = useSelector(selectUser);
  const tresrBalance = useSelector(selectTresrBalance);
  const tresrStakedBalance = useSelector(selectTresrStakedBalance);
  const dispatch = useDispatch();

  const handleToastAlert = useHandleToastAlert();
  const handleNFT = useHandleNFT();
  const handleRewards = useHandleRewards();
  const handleContractTresrCoinWithSigner = useContractTresrCoinWithSigner();
  const handleContractTresrStakingCoinWithSigner =
    useContractTresrStakingCoinWithSigner();

  const approveTRESR = async (value) => {
    if (value > tresrBalance) return handleToastAlert.error("Empty balance");

    const balanceWei = ethers.utils.parseUnits(value.toString(), "ether");
    if (!+balanceWei) return handleToastAlert.error("Empty balance");
    const contractTresrCoinWithSigner = await handleContractTresrCoinWithSigner;
    return contractTresrCoinWithSigner
      .approve(process.env.REACT_APP_TRESR_STAKING_ADDRESS, balanceWei)
      .then(async (tx) => {
        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        return true;
      })
      .catch((err) => {
        throw err;
      });
  };

  const getTresrStaked = async () => {
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .getStaked(user?.wallet_id)
      .then((tx) => hexToNumber(tx?._hex) / 10 ** 18)
      .then((balance) => {
        ACTIONS.SET_BALANCE_TRESR_STAKED(dispatch, balance);
        return balance;
      })
      .catch(() => null);
  };

  const getTresrTotalStaked = async () => {
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .totalStaked()
      .then((tx) => hexToNumber(tx?._hex) / 10 ** 18)
      .then((balance) => {
        ACTIONS.SET_BALANCE_TRESR_STAKED_ALL(dispatch, balance);
        return balance;
      })
      .catch(() => null);
  };

  const getTresrRewardsPerSec = async () => {
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .getRewardPerSecond(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_TRESR_REWARDS_PER_SEC(
          dispatch,
          ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
        );
      })
      .catch(() => null);
  };

  const getTresrStakedAll = async () => {
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .getStakedAll()
      .then((tx) => hexToNumber(tx?._hex) / 10 ** 18)
      .catch(() => null);
  };

  const getveTresrShareP = async () => {
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .portion(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_VETRESR_SHARE_P(dispatch, hexToNumber(tx?._hex) / 1e34);
      })
      .catch(() => null);
  };

  const getTotalEarned = async () => {
    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .getReward(nowUnix())
      .then((tx) => {
        ACTIONS.SET_BALANCE_TOTAL_EARNED(
          dispatch,
          +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
        );
      })
      .catch(() => null);
  };

  const stakeTresr = async (value) => {
    if (value > tresrBalance) return handleToastAlert.error("Empty balance");

    const balanceWei = ethers.utils.parseUnits(value.toString(), "ether");
    if (!+balanceWei) return handleToastAlert.error("Empty balance");

    // const isApprove = await approveTRESR(balanceWei);
    // if (!isApprove) return null;

    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .stake(balanceWei)
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "stakeTRESR",
          description: "stakeTRESR",
          tx: JSON.stringify(tx),
        });

        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        // await sleep(15);

        getTresrStaked();
        getTresrRewardsPerSec();
        getTotalEarned();
        getveTresrShareP();
        handleRewards.getVeTresrBonusReward();
        handleNFT.balanceOfTRESR(user?.wallet_id);

        handleToastAlert.success("$TRESR staked");

        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          STAKE_TRESR(true, value)
        );
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "stakeTRESR",
          error: JSON.stringify(err),
        });

        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          STAKE_TRESR(false, value)
        );

        return null;
      });
  };

  const unstakeTresr = async (value) => {
    if (value > tresrStakedBalance)
      return handleToastAlert.error("Empty staking balance");

    const amountWei = ethers.utils.parseUnits(value.toString(), "ether");
    if (!+amountWei) return handleToastAlert.error("Empty staking balance");

    const contractTresrStakingCoinWithSigner =
      await handleContractTresrStakingCoinWithSigner;
    return contractTresrStakingCoinWithSigner
      .unstake(amountWei)
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "unstakeTRESR",
          description: "unstakeTRESR",
          tx: JSON.stringify(tx),
        });

        await tx.wait();
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        // await sleep(15);

        getTresrStaked();
        getTresrRewardsPerSec();
        getTotalEarned();
        getveTresrShareP();
        handleRewards.getVeTresrBonusReward();
        handleNFT.balanceOfTRESR(user?.wallet_id);

        handleToastAlert.success("$TRESR unstaked");

        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_SUCCESS,
          UNSTAKE_TRESR(true, value)
        );
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "unstakeTRESR",
          error: JSON.stringify(err),
        });

        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          UNSTAKE_TRESR(false, value)
        );

        return null;
      });
  };

  return {
    getTresrStaked,
    getTresrTotalStaked,
    getTresrRewardsPerSec,
    getTotalEarned,
    getTresrStakedAll,
    stakeTresr,
    unstakeTresr,
    approveTRESR,
    getveTresrShareP,
  };
}
