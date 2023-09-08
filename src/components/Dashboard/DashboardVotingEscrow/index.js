import React, { useEffect, useState } from "react";
import useHandleModal from "../../../hooks/dom/useHandleModal";
import useHandleTresrStaking from "../../../hooks/blockchain/useHandleTresrStaking";
import OnStakeTRESRModal from "../DashboardModals/OnStakeTRESRModal";
import OnUnstakeTRESRModal from "../DashboardModals/OnUnstakeTRESRModal";
import { formatterUS } from "../../../utils";
import { APPROVE_STAKING_TRESR } from "../../../constant/approveLoadingModal";
import ApproveLoadingModal from "../../common/Modals/ApproveLoadingModal";
import useHandleRewards from "hooks/blockchain/useHandleRewards";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import {
  selectTotalEarnedBalance,
  selectTresrBalance,
  selectTresrStakedBalance,
  selectTresrStakedAllBalance,
} from "redux/slice/balanceSlice";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import { selectTresrRewardsPerSec } from "redux/slice/rewardSlice";
import VotingCard from "storybook/molecule/VotingCard/votingCard";

export default function DashboardVotingEscrow({
  onUnstakeTresr,
  onConnectWallet,
  onclaimVeTresr,
}) {
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const totalEarnedBalance = useSelector(selectTotalEarnedBalance);
  const tresrStakedBalance = useSelector(selectTresrStakedBalance);
  const claimableTresrRewardsPerSec = useSelector(selectTresrRewardsPerSec);
  const tresrBalance = useSelector(selectTresrBalance);
  const tresrStakedAllBalance = useSelector(selectTresrStakedAllBalance);
  const dispatch = useDispatch();

  const [stake, setStake] = useState("");
  const [unstake, setUnstake] = useState("");
  const [stakedAll, setStakedAll] = useState(0);
  const [timerID, setTimerID] = useState(0);
  const [veTresrBalance, setVeTresrBalance] = useState(0);
  const [veClaimedTresr, setVeClaimedTresr] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [balanceVeTresrPerHour, setbalanceVeTresrPerHour] = useState(0);
  const [balanceMaxAvailable, setbalanceMaxAvailable] = useState(0);
  const [balanceEstDaysToMax, setbalanceEstDaysToMax] = useState(0);
  const [flag, setFlag] = useState(false);

  const isDark = theme === "dark";

  const handleStakeModal = useHandleModal();
  const handleUnstakeModal = useHandleModal();
  const handleTresrStaking = useHandleTresrStaking();
  const handleRewards = useHandleRewards();
  const handleApproveStakingTresrModal = useHandleModal();

  const balanceTotalEarned = formatterUS(+totalEarnedBalance);
  const balanceTresrStaked = formatterUS(tresrStakedBalance);
  const balanceEstDailyVeTRESR = formatterUS(
    claimableTresrRewardsPerSec * 60 * 60 * 24
  );

  const onChangeStake = (event) =>
    !isNaN(event?.target?.value) && setStake(event?.target?.value);
  const onChangeUnstake = (event) =>
    !isNaN(event?.target?.value) && setUnstake(event?.target?.value);

  const onApproveTresr = () => {
    handleStakeModal.close();
    handleApproveStakingTresrModal.open();

    handleTresrStaking
      .approveTRESR(stake)
      .then(() => setIsApproved(true))
      .catch(() => {
        setIsApproved(false);
        handleApproveStakingTresrModal.close();
        return null;
      });
  };

  const onStakeClose = () => {
    handleStakeModal.close();
    setStake("");
  };
  const onUnstakeClose = () => {
    handleUnstakeModal.close();
    setUnstake("");
  };
  const onStake = () => {
    onStakeClose();
    handleTresrStaking.stakeTresr(stake).finally(() => {
      handleTresrStaking
        .getTresrStaked()
        .then((res) => setStakedAll(formatterUS(res)));
      handleTresrStaking.getTresrTotalStaked();
      handleApproveStakingTresrModal.close();
      setIsApproved(false);
    });
  };
  const onUnstake = async () => {
    onUnstakeClose();
    await onUnstakeTresr(unstake);
    handleTresrStaking
      .getTresrStaked()
      .then((res) => setStakedAll(formatterUS(res)));
    handleTresrStaking.getTresrTotalStaked();
  };

  const onClickStake = () => {
    if (!user?.wallet_id) return onConnectWallet();

    handleStakeModal.open();
  };

  const onClickUnStake = () => {
    if (!user?.wallet_id) return onConnectWallet();

    handleUnstakeModal.open();
  };

  const onCloseApproveStakingTresrModal = () => {
    handleApproveStakingTresrModal.close();
    setIsApproved(false);
  };

  useEffect(() => {
    if (!user?.wallet_id) return;
    handleRewards.getRewardDashboardInfo(user?.wallet_id).then((res) => {
      ACTIONS.SET_TRESR_REWARDS_PER_SEC(dispatch, res[0]);
      ACTIONS.SET_BALANCE_TOTAL_EARNED(dispatch, res[1]); // pendingVeTresr
      ACTIONS.SET_BALANCE_TRESR_STAKED(dispatch, res[2]);
      setbalanceVeTresrPerHour(res[3]);
      setbalanceMaxAvailable(res[4]);
      setbalanceEstDaysToMax(res[5]);
    });

    handleTresrStaking.getTresrRewardsPerSec();
    // handleTresrStaking.getTotalEarned();
    handleTresrStaking
      .getTresrStaked()
      .then((res) => setStakedAll(formatterUS(res)));
    handleTresrStaking.getTresrTotalStaked();
    handleRewards.getVeTresrPerHour().then((res) => {
      setbalanceVeTresrPerHour(res);
    });
    handleRewards.getMaxVeTresr().then((res) => setbalanceMaxAvailable(res));
    handleRewards.getDaysToMax().then((res) => setbalanceEstDaysToMax(res));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setVeTresrBalance(+totalEarnedBalance);
    clearInterval(timerID);
    setFlag(true);
    Promise.all([
      handleRewards.getPendingVeTresr(),
      handleRewards.getClaimedVeTresr(),
    ]).then((res) => {
      setVeTresrBalance(res[0]);
      setVeClaimedTresr(res[1]);
      setFlag(false);
    });
    // const timer = setInterval(() => {
    //   handleRewards.getPendingVeTresr().then((res) => setVeTresrBalance(res));
    //   handleRewards.getClaimedVeTresr().then((res) => setVeClaimedTresr(res));
    //   setFlag(false);
    // }, 1000);
    // setTimerID(timer);

    return () => clearInterval(timerID);
  }, [totalEarnedBalance, claimableTresrRewardsPerSec]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <VotingCard
        flag={flag}
        isDark={isDark}
        onClickStake={onClickStake}
        onClickUnStake={onClickUnStake}
        stakedAll={stakedAll}
        tresrBalance={tresrBalance}
        tresrStakedAllBalance={tresrStakedAllBalance}
        balanceEstDailyVeTRESR={balanceEstDailyVeTRESR}
        onclaimVeTresr={onclaimVeTresr}
        veTresrBalance={veTresrBalance}
        veClaimedTresr={veClaimedTresr}
        balanceVeTresrPerHour={balanceVeTresrPerHour}
        balanceMaxAvailable={balanceMaxAvailable}
        balanceEstDaysToMax={balanceEstDaysToMax}
      />
      {handleStakeModal.isActive && (
        <OnStakeTRESRModal
          isOpen={handleStakeModal.isActive}
          onClose={onStakeClose}
          onChangeStake={onChangeStake}
          onStake={onApproveTresr}
          onStakeClose={onStakeClose}
          stake={stake}
          setStake={setStake}
          balance={tresrBalance}
          title="Stake $TRESR"
          description="Are you sure to stake this token? This action cannot be undone."
          placeholder="0.000 TRESR"
        />
      )}
      {handleUnstakeModal.isActive && (
        <OnUnstakeTRESRModal
          onClose={onUnstakeClose}
          isOpen={handleUnstakeModal.isActive}
          onChangeUnstake={onChangeUnstake}
          onUnstake={onUnstake}
          onUnstakeClose={onUnstakeClose}
          unstake={unstake}
          setUnstake={setUnstake}
          balance={tresrStakedBalance}
          title="Unstake $TRESR"
          description="By confirming this tx, your veTRESR will go to zero"
          placeholder="0.000 TRESR"
          marginTop={60}
        />
      )}
      {handleApproveStakingTresrModal.isActive && (
        <ApproveLoadingModal
          isOpen={handleApproveStakingTresrModal.isActive}
          status={APPROVE_STAKING_TRESR}
          isApproved={isApproved}
          onClose={onCloseApproveStakingTresrModal}
          onNextStep={onStake}
        />
      )}
    </>
  );
}
