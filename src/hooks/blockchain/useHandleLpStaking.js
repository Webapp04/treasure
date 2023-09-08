import { useMemo } from "react";
import { parseEther } from "ethers/lib/utils";
import { hexToNumber } from "../../utils/blockchain";
import useHandleRewards from "./useHandleRewards";
import AirdropApi from "api/AirdropApi";
import {
  ALERT_STATUS_FAILURE,
  ALERT_STATUS_SUCCESS,
  STAKE_SMRTR_LP_ALERT,
  STAKE_TRESR_LP_ALERT,
  UNSTAKE_SMRTR_LP_ALERT,
  UNSTAKE_TRESR_LP_ALERT,
} from "constant/alert";
import ACTIONS from "redux/action";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import {
  useContractLpCoinSMRTRAVAXWithSigner,
  useContractLpCoinTRESRAVAXWithSigner,
  useContractLpStakingSMRTRAVAXWithSigner,
  useContractLpStakingTRESRAVAXWithSigner,
} from "./useHandleContracts";

export default function useHandleLpStaking() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleContractLpCoinSMRTRAVAXWithSigner =
    useContractLpCoinSMRTRAVAXWithSigner();
  const handleContractLpCoinTRESRAVAXWithSigner =
    useContractLpCoinTRESRAVAXWithSigner();
  const handleContractLpStakingSMRTRAVAXWithSigner =
    useContractLpStakingSMRTRAVAXWithSigner();
  const handleContractLpStakingTRESRAVAXWithSigner =
    useContractLpStakingTRESRAVAXWithSigner();
  const handleRewards = useHandleRewards();

  const approveLP = async (balance, isTRESR = true) => {
    if (isTRESR) {
      const contractLpCoinTRESRAVAXWithSigner =
        await handleContractLpCoinTRESRAVAXWithSigner;
      return contractLpCoinTRESRAVAXWithSigner
        .approve(
          process.env.REACT_APP_LP_TRESRAVAX_STAKING_ADDRESS,
          parseEther(balance?.toString()).toString()
        )
        .then(async (tx) => {
          await tx.wait();
          ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
          return true;
        })
        .catch((err) => {
          throw err;
        });
    } else {
      const contractLpCoinSMRTRAVAXWithSigner =
        await handleContractLpCoinSMRTRAVAXWithSigner;
      return contractLpCoinSMRTRAVAXWithSigner
        .approve(
          process.env.REACT_APP_LP_SMRTRAVAX_STAKING_ADDRESS,
          parseEther(balance?.toString()).toString()
        )
        .then(async (tx) => {
          await tx.wait();
          ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
          return true;
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const balanceOfLp = async () => {
    const contractLpCoinTRESRAVAXWithSigner =
      await handleContractLpCoinTRESRAVAXWithSigner;
    contractLpCoinTRESRAVAXWithSigner
      .balanceOf(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_BALANCE_LP_TRESRAVAX(
          dispatch,
          hexToNumber(tx._hex) / Math.pow(10, 18)
        );
      })
      .catch(() => null);

    const contractLpCoinSMRTRAVAXWithSigner =
      await handleContractLpCoinSMRTRAVAXWithSigner;
    contractLpCoinSMRTRAVAXWithSigner
      ?.balanceOf(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_BALANCE_LP_SMRTRAVAX(
          dispatch,
          hexToNumber(tx._hex) / Math.pow(10, 18)
        );
      })
      .catch(() => null);
  };

  const balanceOfStakedLp = async () => {
    if (!user?.wallet_id) return;
    const contractLpStakingSMRTRAVAXWithSigner =
      await handleContractLpStakingSMRTRAVAXWithSigner;
    const contractLpStakingTRESRAVAXWithSigner =
      await handleContractLpStakingTRESRAVAXWithSigner;
    contractLpStakingTRESRAVAXWithSigner
      ?.stakedBalanceOf(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_BALANCE_LP_STAKED_TRESRAVAX(
          dispatch,
          hexToNumber(tx._hex) / Math.pow(10, 18)
        );
      })
      .catch(() => null);

    contractLpStakingTRESRAVAXWithSigner
      ?.portion(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_BALANCE_LP_TOTAL_STAKED_TRESRAVAX(
          dispatch,
          hexToNumber(tx._hex) / 1e34
        );
      })
      .catch(() => null);

    contractLpStakingTRESRAVAXWithSigner
      ?.totalStaked()
      .then((tx) => {
        ACTIONS.SET_BALANCE_LP_COMMUNITY_STAKED_TRESRAVAX(
          dispatch,
          hexToNumber(tx._hex) / Math.pow(10, 18)
        );
      })
      .catch(() => null);

    contractLpStakingSMRTRAVAXWithSigner
      ?.stakedBalanceOf(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_BALANCE_LP_STAKED_SMRTRAVAX(
          dispatch,
          hexToNumber(tx._hex) / Math.pow(10, 18)
        );
      })
      .catch(() => null);

    contractLpStakingSMRTRAVAXWithSigner
      ?.portion(user?.wallet_id)
      .then((tx) => {
        ACTIONS.SET_BALANCE_LP_TOTAL_STAKED_SMRTRAVAX(
          dispatch,
          hexToNumber(tx._hex) / 1e34
        );
      })
      .catch(() => null);

    contractLpStakingSMRTRAVAXWithSigner
      ?.totalStaked()
      .then((tx) => {
        ACTIONS.SET_BALANCE_LP_COMMUNITY_STAKED_SMRTRAVAX(
          dispatch,
          hexToNumber(tx._hex) / Math.pow(10, 18)
        );
      })
      .catch(() => null);
  };

  const stake = async (amount, isTRESR = true) => {
    await handleRewards.depositMasterChef(isTRESR ? 1 : 0, amount);

    // const isApprove = await approveLP(amount, isTRESR);
    // if (!isApprove) return null;

    if (isTRESR) {
      const contractLpStakingTRESRAVAXWithSigner =
        await handleContractLpStakingTRESRAVAXWithSigner;
      contractLpStakingTRESRAVAXWithSigner
        ?.deposit(parseEther(amount?.toString())?.toString())
        .then(async (tx) => {
          new AirdropApi().logger({
            wallet_id: user?.wallet_id,
            type: "PENDING",
            action: "stakeTresrAvaxLP",
            description: "stakeTresrAvaxLP",
            tx: JSON.stringify(tx),
          });

          await tx.wait();
          ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
          await balanceOfStakedLp();
          await balanceOfLp();
          await handleRewards.getJlpTresrBonusReward();

          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_SUCCESS,
            STAKE_TRESR_LP_ALERT(true, amount)
          );

          return true;
        })
        .catch(() => {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            STAKE_TRESR_LP_ALERT(false, amount)
          );
          return null;
        });
    } else {
      const contractLpStakingSMRTRAVAXWithSigner =
        await handleContractLpStakingSMRTRAVAXWithSigner;
      contractLpStakingSMRTRAVAXWithSigner
        ?.deposit(parseEther(amount?.toString())?.toString())
        .then(async (tx) => {
          new AirdropApi().logger({
            wallet_id: user?.wallet_id,
            type: "PENDING",
            action: "stakeSmrtrAvaxLP",
            description: "stakeSmrtrAvaxLP",
            tx: JSON.stringify(tx),
          });

          await tx.wait();
          ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
          await balanceOfStakedLp();
          await balanceOfLp();
          await handleRewards.getJlpSmrtBonusReward();

          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_SUCCESS,
            STAKE_SMRTR_LP_ALERT(true, amount)
          );

          return true;
        })
        .catch(() => {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            STAKE_SMRTR_LP_ALERT(false, amount)
          );
          return null;
        });
    }
  };

  const unstake = async (amount, isTRESR = true) => {
    await handleRewards.withdrawMasterChef(isTRESR ? 1 : 0, amount);

    const valueToUnstake = parseEther(amount?.toString())?.toString();

    if (isTRESR) {
      const contractLpStakingTRESRAVAXWithSigner =
        await handleContractLpStakingTRESRAVAXWithSigner;
      return contractLpStakingTRESRAVAXWithSigner
        ?.withdraw(valueToUnstake)
        .then(async (tx) => {
          new AirdropApi().logger({
            wallet_id: user?.wallet_id,
            type: "PENDING",
            action: "unstakeTresrAvaxLP",
            description: "unstakeTresrAvaxLP",
            tx: JSON.stringify(tx),
          });

          await tx.wait();
          ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
          await balanceOfStakedLp();
          await balanceOfLp();
          await handleRewards.getJlpTresrBonusReward();

          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_SUCCESS,
            UNSTAKE_TRESR_LP_ALERT(true, amount)
          );
        })
        .catch(() => {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            UNSTAKE_TRESR_LP_ALERT(false, amount)
          );
          return null;
        });
    } else {
      const contractLpStakingSMRTRAVAXWithSigner =
        await handleContractLpStakingSMRTRAVAXWithSigner;
      return contractLpStakingSMRTRAVAXWithSigner()
        ?.withdraw(valueToUnstake)
        .then(async (tx) => {
          new AirdropApi().logger({
            wallet_id: user?.wallet_id,
            type: "PENDING",
            action: "unstakeSmrtrAvaxLP",
            description: "unstakeSmrtrAvaxLP",
            tx: JSON.stringify(tx),
          });

          await tx.wait();
          ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
          await balanceOfStakedLp();
          await balanceOfLp();
          await handleRewards.getJlpSmrtBonusReward();

          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_SUCCESS,
            UNSTAKE_SMRTR_LP_ALERT(true, amount)
          );
        })
        .catch(() => {
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            UNSTAKE_SMRTR_LP_ALERT(false, amount)
          );
          return null;
        });
    }
  };

  return {
    approveLP,
    balanceOfLp,
    balanceOfStakedLp,
    stake,
    unstake,
  };
}
