import React, { useEffect, useState } from "react";
import "./style.scss";
import useHandleRewards from "../../../hooks/blockchain/useHandleRewards";
import { formatterUS } from "../../../utils";
import useHandleModal from "../../../hooks/dom/useHandleModal";
import DashboardTresrSmartrAvaxStaking from "../DashboardTresrSmartrAvaxStaking";
import OnStakeTRESRModal from "../DashboardModals/OnStakeTRESRModal";
import OnUnstakeTRESRModal from "../DashboardModals/OnUnstakeTRESRModal";
import ApproveLoadingModal from "../../common/Modals/ApproveLoadingModal";
import {
  APPROVE_STAKING_SMRTR,
  APPROVE_STAKING_TRESR,
} from "../../../constant/approveLoadingModal";
import useHandleLpStaking from "../../../hooks/blockchain/useHandleLpStaking";
import { useSelector } from "react-redux";
import {
  selectLpCommunityStakedSMRTRAVAXBalance,
  selectLpCommunityStakedTRESRAVAXBalance,
  selectLpSMRTRAVAXBalance,
  selectLpStakedSMRTRAVAXBalance,
  selectLpStakedTRESRAVAXBalance,
  selectLpTRESRAVAXBalance,
  selectLpTotalStakedSMRTRAVAXBalance,
  selectLpTotalStakedTRESRAVAXBalance,
} from "redux/slice/balanceSlice";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";

const DashboardTresrSmartrAvaxStakingWrapper = ({
  onConnectWallet,
  onUnstakeLP,
}) => {
  const nftSelected = useSelector(selectNftSelected);
  const user = useSelector(selectUser);
  const lpTRESRAVAXBalance = useSelector(selectLpTRESRAVAXBalance);
  const lpSMRTRAVAXBalance = useSelector(selectLpSMRTRAVAXBalance);
  const lpStakedTRESRAVAXBalance = useSelector(selectLpStakedTRESRAVAXBalance);
  const lpStakedSMRTRAVAXBalance = useSelector(selectLpStakedSMRTRAVAXBalance);
  const lpTotalStakedTRESRAVAXBalance = useSelector(
    selectLpTotalStakedTRESRAVAXBalance
  );
  const lpCommunityStakedTRESRAVAXBalance = useSelector(
    selectLpCommunityStakedTRESRAVAXBalance
  );
  const lpTotalStakedSMRTRAVAXBalance = useSelector(
    selectLpTotalStakedSMRTRAVAXBalance
  );
  const lpCommunityStakedSMRTRAVAXBalance = useSelector(
    selectLpCommunityStakedSMRTRAVAXBalance
  );
  const handleLpStaking = useHandleLpStaking();

  const [stake, setStake] = useState("");
  const [unstake, setUnstake] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const handleRewards = useHandleRewards();
  const handleStakeTRESRModal = useHandleModal();
  const handleStakeSMRTRModal = useHandleModal();
  const handleUnstakeTRESRModal = useHandleModal();
  const handleUnstakeSMRTRModal = useHandleModal();
  const handleApproveStakingTresrModal = useHandleModal();
  const handleApproveStakingSmrtrModal = useHandleModal();

  const jlpTresrBonusRewardPerSecond = formatterUS(
    +handleRewards?.jlpTresrBonusRewardPerSecond * 60 * 60 * 24
  );
  const jlpSmrtBonusRewardPerSecond = formatterUS(
    +handleRewards?.jlpSmrtBonusRewardPerSecond * 60 * 60 * 24
  );

  const balanceLPTRESR = formatterUS(lpTRESRAVAXBalance);
  const balanceLPSMRTR = formatterUS(lpSMRTRAVAXBalance);

  const balanceLPStakedTRESR = formatterUS(lpStakedTRESRAVAXBalance);
  const balanceLPStakedSMRTR = formatterUS(lpStakedSMRTRAVAXBalance);

  // const balanceLPTotalStaked = isTRESR ? formatterUS(lpTotalStakedTRESRAVAXBalance) : formatterUS(lpTotalStakedSMRTRAVAXBalance);

  // const poolShareCalcTRESR = lpStakedTRESRAVAXBalance ? formatterUS((lpStakedTRESRAVAXBalance * 100) / lpTotalStakedTRESRAVAXBalance) : 0;
  // const poolShareCalcSMRTR = lpStakedSMRTRAVAXBalance ? formatterUS((lpStakedSMRTRAVAXBalance * 100) / lpTotalStakedSMRTRAVAXBalance) : 0;

  const onChangeStake = (event) =>
    !isNaN(event?.target?.value) && setStake(event?.target?.value);
  const onChangeUnstake = (event) =>
    !isNaN(event?.target?.value) && setUnstake(event?.target?.value);

  const onApprove = (amount, isTRESR) => {
    isTRESR
      ? handleApproveStakingTresrModal.open()
      : handleApproveStakingSmrtrModal.open();

    handleLpStaking
      .approveLP(amount, isTRESR)
      .then(() => {
        setIsApproved(true);
      })
      .catch(() => {
        setIsApproved(false);
        isTRESR
          ? handleApproveStakingTresrModal.close()
          : handleApproveStakingSmrtrModal.close();
        return null;
      });
  };

  const onStakeCloseTRESR = () => {
    handleStakeTRESRModal.close();
    setStake("");
  };
  const onUnstakeCloseTRESR = () => {
    handleUnstakeTRESRModal.close();
    setUnstake("");
  };

  const onStakeCloseSMRTR = () => {
    handleStakeSMRTRModal.close();
    setStake("");
  };
  const onUnstakeCloseSMRTR = () => {
    handleUnstakeSMRTRModal.close();
    setUnstake("");
  };

  const onStakeTRESR = () => {
    //onStakeCloseTRESR();
    onStakeLP(stake, true);
  };
  const onStakeSMRTR = () => {
    //onStakeCloseSMRTR();
    onStakeLP(stake, false);
  };

  const onApproveTRESR = () => {
    handleStakeTRESRModal.close();
    onApprove(stake, true);
  };
  const onApproveSMRTR = () => {
    handleStakeSMRTRModal.close();
    onApprove(stake, false);
  };

  const onUnstakeTRESR = () => {
    onUnstakeCloseTRESR();
    onUnstakeLP(unstake, true);
  };
  const onUnstakeSMRTR = () => {
    onUnstakeCloseSMRTR();
    onUnstakeLP(unstake, false);
  };

  const onCloseApproveStakingLPModal = () => {
    handleApproveStakingTresrModal.close();
    handleApproveStakingSmrtrModal.close();
    setIsApproved(false);
  };

  const onStakeLP = (value, type) => {
    handleLpStaking.stake(value, type).finally(onCloseApproveStakingLPModal);
  };

  const onClickStakeTRESR = () =>
    !user?.wallet_id ? onConnectWallet() : handleStakeTRESRModal.open();
  const onClickUnStakeTRESR = () =>
    !user?.wallet_id ? onConnectWallet() : handleUnstakeTRESRModal.open();

  const onClickStakeSMRTR = () =>
    !user?.wallet_id ? onConnectWallet() : handleStakeSMRTRModal.open();
  const onClickUnStakeSMRTR = () =>
    !user?.wallet_id ? onConnectWallet() : handleUnstakeSMRTRModal.open();

  useEffect(() => {
    handleRewards.getJlpTresrBonusRewardPerSecond();
  }, [nftSelected?.tokenId, balanceLPStakedTRESR]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleRewards.getJlpSmrtBonusRewardPerSecond();
  }, [nftSelected?.tokenId, balanceLPStakedSMRTR]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="DashboardTresrSmartrAvaxStaking__container">
      <DashboardTresrSmartrAvaxStaking
        isTRESR
        balanceLP={formatterUS(lpTRESRAVAXBalance)}
        onClickStake={onClickStakeTRESR}
        onClickUnStake={onClickUnStakeTRESR}
        balanceLPStaked={formatterUS(lpStakedTRESRAVAXBalance)}
        poolShareCalc={formatterUS(lpTotalStakedTRESRAVAXBalance)}
        communityLPStaked={formatterUS(lpCommunityStakedTRESRAVAXBalance)}
        estDaily={jlpTresrBonusRewardPerSecond}
      />
      <DashboardTresrSmartrAvaxStaking
        balanceLP={formatterUS(lpSMRTRAVAXBalance)}
        onClickStake={onClickStakeSMRTR}
        onClickUnStake={onClickUnStakeSMRTR}
        balanceLPStaked={formatterUS(lpStakedSMRTRAVAXBalance)}
        poolShareCalc={formatterUS(lpTotalStakedSMRTRAVAXBalance)}
        communityLPStaked={formatterUS(lpCommunityStakedSMRTRAVAXBalance)}
        estDaily={jlpSmrtBonusRewardPerSecond}
      />
      {handleStakeTRESRModal.isActive && (
        <OnStakeTRESRModal
          isOpen={handleStakeTRESRModal.isActive}
          onClose={onStakeCloseTRESR}
          onChangeStake={onChangeStake}
          onStake={onApproveTRESR}
          onStakeClose={onStakeCloseTRESR}
          stake={stake}
          setStake={setStake}
          balance={lpTRESRAVAXBalance}
          title="Stake TRESR-AVAX-LP"
          description="Are you sure? This action cannot be undone."
          placeholder="0.000 TRESR-AVAX-LP"
          marginTop={45}
        />
      )}

      {handleUnstakeTRESRModal.isActive && (
        <OnUnstakeTRESRModal
          onClose={onUnstakeCloseTRESR}
          isOpen={handleUnstakeTRESRModal.isActive}
          onChangeUnstake={onChangeUnstake}
          onUnstake={onUnstakeTRESR}
          onUnstakeClose={onUnstakeCloseTRESR}
          unstake={unstake}
          setUnstake={setUnstake}
          balance={lpStakedTRESRAVAXBalance}
          title="Unstake TRESR-AVAX-LP"
          description=""
          placeholder="0.000 TRESR-AVAX-LP"
          marginTop={115}
        />
      )}
      {handleStakeSMRTRModal.isActive && (
        <OnStakeTRESRModal
          isOpen={handleStakeSMRTRModal.isActive}
          onClose={onStakeCloseSMRTR}
          onChangeStake={onChangeStake}
          onStake={onApproveSMRTR}
          onStakeClose={onStakeCloseSMRTR}
          stake={stake}
          setStake={setStake}
          balance={lpSMRTRAVAXBalance}
          title="Stake SMRTR-AVAX-LP"
          description="Are you sure? This action cannot be undone."
          placeholder="0.000 SMRTR-AVAX-LP"
          marginTop={50}
        />
      )}
      {handleUnstakeSMRTRModal.isActive && (
        <OnUnstakeTRESRModal
          onClose={onUnstakeCloseSMRTR}
          isOpen={handleUnstakeSMRTRModal.isActive}
          onChangeUnstake={onChangeUnstake}
          onUnstake={onUnstakeSMRTR}
          onUnstakeClose={onUnstakeCloseSMRTR}
          unstake={unstake}
          setUnstake={setUnstake}
          balance={lpStakedSMRTRAVAXBalance}
          title="Unstake SMRTR-AVAX-LP"
          description=""
          placeholder="0.000 SMRTR-AVAX-LP"
          marginTop={115}
        />
      )}
      {handleApproveStakingTresrModal.isActive && (
        <ApproveLoadingModal
          isOpen={handleApproveStakingTresrModal.isActive}
          status={APPROVE_STAKING_TRESR}
          isApproved={isApproved}
          onClose={onCloseApproveStakingLPModal}
          onNextStep={onStakeTRESR}
        />
      )}
      {handleApproveStakingSmrtrModal.isActive && (
        <ApproveLoadingModal
          isOpen={handleApproveStakingSmrtrModal.isActive}
          status={APPROVE_STAKING_SMRTR}
          isApproved={isApproved}
          onClose={onCloseApproveStakingLPModal}
          onNextStep={onStakeSMRTR}
        />
      )}
    </div>
  );
};

export default DashboardTresrSmartrAvaxStakingWrapper;
