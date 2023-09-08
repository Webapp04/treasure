import React, { useState, useEffect } from "react";
import useHandleTresrStaking from "../../hooks/blockchain/useHandleTresrStaking";
import useHandleNFT from "../../hooks/blockchain/useHandleNFT";
import "./style.scss";
import {
  DASHBOARD_DROPDOWN_ITEMS_DEFAULT,
  DASHBOARD_FILTERS_DEFAULT,
  DASHBOARD_TAB_MENU_DASHBOARD,
  DASHBOARD_TAB_MENU_DASHBOARD_LINK,
  DASHBOARD_TAB_MENU_FAQ,
  DASHBOARD_TAB_MENU_FAQ_LINK,
  DASHBOARD_TAB_MENU_GAME,
  DASHBOARD_TAB_MENU_GAME_LINK,
  FILTER_ACTIVE,
  FILTER_INACTIVE,
  SORT_HIGHEST_KEY_LEVEL,
  SORT_HIGHEST_TOKENID,
  SORT_LOWEST_KEY_LEVEL,
} from "../../constant/navigation";
import { useLocation, useNavigate } from "react-router-dom";
import useHandleModal from "../../hooks/dom/useHandleModal";
import useHandleRewards from "../../hooks/blockchain/useHandleRewards";
import DashboardMobileModal from "./DashboardMobileModal";
import useWindowDimensions from "../../hooks/useWidowDimensions";
import DashboardGameTab from "./DashboardGameTab";
import DashboardTab from "./DashboardTab";
import TreasureBoxModal from "../common/DashboardModals/TreasureBoxModal";
import TransactionLoadingModal from "../common/Modals/TransactionLoadingModal";
import DeactivateKeyModal from "./DashboardModals/DeactivateKeyModal";
import ActivateKeyModal from "./DashboardModals/ActivateKeyModal";
import useHandleLoader from "../../hooks/loader/useHandleLoader";
import useHandleAuth from "../../hooks/auth/useHandleAuth";
import useHandleLpStaking from "../../hooks/blockchain/useHandleLpStaking";
import { compareUnixDates, formatterUS } from "../../utils";
import SuccessKeyUpgradeModal from "../common/Modals/SuccessKeyUpgradeModal";
import ExpandedNFTView from "../common/Modals/ExpandedNFTView";
import ActivateAllKeysModal from "../common/Modals/ActivateAllKeysModal";
import UpgradeAllKeysModal from "../common/Modals/UpgradeAllKeysModal";
import {
  APPROVE_UPGRADE_ALL_KEYS,
  APPROVE_UPGRADE_KEY,
} from "../../constant/approveLoadingModal";
import ApproveLoadingModal from "../common/Modals/ApproveLoadingModal";
import UpgradeKeyModal from "../common/Modals/UpgradeKeyModal";
import OpenTreasureBoxModal from "../common/Modals/OpenTreasureBoxModal";
import TreasureWarningModal from "../common/Modals/TreasureWarningModal";
import DashboardKeyRewards from "./DashboardKeyRewards";
import FAQsItem from "components/FAQsPage/FAQsItem";
import DashboardNotWhitelisted from "./DashboardNotWhitelisted";
import ACTIONS from "redux/action";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTresrBalance,
  selectBurnedSmrtrBalance,
  selectBurnedTresrBalance,
  selectPoolAllocationBalance,
} from "redux/slice/balanceSlice";
import { selectNftList, selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import { selectLoaderIsActive } from "redux/slice/loaderSlice";
import { selectWhitelist } from "redux/slice/whiteListSlice";
import { selectBonusPoolAllocation } from "redux/slice/rewardSlice";
import FounderKeyCard from "storybook/molecule/FounderKeyCard/founderKeyCard";
import useHandleToken from "hooks/token/useHandleToken";
import Button from "storybook/atom/Button/button";
import { useCountdown } from "hooks/useCountdown";

export default function Dashboard() {
  const user = useSelector(selectUser);
  const handleToken = useHandleToken();
  const whitelist = useSelector(selectWhitelist);
  const loaderIsActive = useSelector(selectLoaderIsActive);
  const nftSelected = useSelector(selectNftSelected);
  const nftLists = useSelector(selectNftList);
  const burnedSmrtrBalance = useSelector(selectBurnedSmrtrBalance);
  const burnedTresrBalance = useSelector(selectBurnedTresrBalance);
  const poolAllocationBalance = useSelector(selectPoolAllocationBalance);
  const claimableBonusPoolAllocationReward = useSelector(
    selectBonusPoolAllocation
  );
  const tresrBalance = useSelector(selectTresrBalance);
  const dispatch = useDispatch();
  const [upgradeAllKeysFlag, setUpgradeAllKeysFlag] = useState(false);
  const [probToOpen, setProbToOpen] = useState(null);
  const [chestStatus, setChestStatus] = useState(null);
  const [activeTab, setActiveTab] = useState(DASHBOARD_TAB_MENU_DASHBOARD);
  const [activeFilter, setActiveFilter] = useState(DASHBOARD_FILTERS_DEFAULT);
  const [activeDropdownItem, setActiveDropdownItem] = useState(
    DASHBOARD_DROPDOWN_ITEMS_DEFAULT
  );
  const [amountUpgradeKey, setAmountUpgradeKey] = useState(0);
  const [amountOpenChest, setAmountOpenChest] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMaxUpgrades, setIsMaxUpgrades] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [tokenListToUpgrade, setTokenListToUpgrade] = useState([]);
  const [filterTokenList, setFilterTokenList] = useState([]);
  const [isNotActiveToken, setIsNotActiveToken] = useState([]);

  const location = useLocation();
  const handleLoader = useHandleLoader();
  const navigate = useNavigate();
  const handleNFT = useHandleNFT();
  const handleAuth = useHandleAuth();
  const handleRewards = useHandleRewards();
  const handleTresrStaking = useHandleTresrStaking();
  const handleLpStaking = useHandleLpStaking();

  const handleTreasureModal = useHandleModal();
  const handleChestModal = useHandleModal();
  const handleUpgradeModal = useHandleModal();
  const handleSuccessfulUpgradeModal = useHandleModal();
  const handleTreasureWarningModal = useHandleModal();
  const handleTransactionLoadingModal = useHandleModal();
  const handleDeactivateKeyModal = useHandleModal();
  const handleActivateKeyModal = useHandleModal();
  const handleExpandedKeyViewModal = useHandleModal();
  const handleActivateAllKeysModal = useHandleModal();
  const handleUpgradeAllKeysModal = useHandleModal();
  const handleApproveUpgradeModal = useHandleModal();
  const handleApproveUpgradeAllModal = useHandleModal();
  const handleDashboardMobileModal = useHandleModal();

  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 640;
  const callbackUpgradeKey = (status) => {
    status && handleSuccessfulUpgradeModal.open();
    handleRewards.updateBurnedEmissionInfo();
  };
  const callbackOpenTreasure = (status) => {
    if (status === null) return;
    setChestStatus(status);
    handleRewards.updateBurnedEmissionInfo();
    handleChestModal.open();
  };

  const onStakeTresr = (value) => {
    handleTresrStaking.stakeTresr(value);
  };
  const onUnstakeTresr = async (value) => {
    handleTransactionLoadingModal.open();
    await handleTresrStaking
      .unstakeTresr(value)
      .finally(() => handleTransactionLoadingModal.close());
  };
  const onBulkStake = (tokenList) => {
    handleActivateAllKeysModal.close();
    handleTransactionLoadingModal.open();
    handleNFT
      .bulkStake(tokenList)
      .finally(() => handleTransactionLoadingModal.close());
  };
  const onStake = () => {
    handleTransactionLoadingModal.open();
    handleNFT.stake().finally(() => handleTransactionLoadingModal.close());
  };
  const onUnstake = () => {
    handleTransactionLoadingModal.open();
    handleNFT.unstake().finally(() => handleTransactionLoadingModal.close());
  };
  const onBulkApproveKey = (amountSMRTR) => {
    handleUpgradeAllKeysModal.close();
    handleApproveUpgradeAllModal.open();

    handleNFT
      .approveSMRTRByAmount(amountSMRTR)
      .then(() => {
        setIsApproved(true);
      })
      .catch(() => {
        setIsApproved(false);
        handleApproveUpgradeAllModal.close();
        return null;
      });
  };

  const onBulkUpgradeKey = () => {
    handleNFT.bulkUpgradeKeys(tokenListToUpgrade).finally(() => {
      handleApproveUpgradeAllModal.close();
      setIsApproved(false);
    });
  };

  const onApproveUpgradeKey = () => {
    handleUpgradeModal.close();
    handleApproveUpgradeModal.open();
    handleNFT
      .approveSMRTR()
      .then(() => setIsApproved(true))
      .catch(() => {
        setIsApproved(false);
        return null;
      });
  };

  const onUpgradeKey = () => {
    handleNFT
      .upgradeKey()
      .then(callbackUpgradeKey)
      .finally(() => {
        handleApproveUpgradeModal.close();
        setIsApproved(false);
      });
  };
  const onOpenTreasure = () => {
    setChestStatus(null);
    setIsAnimated(true);
    handleChestModal.close();
    handleTreasureModal.close();
    handleTransactionLoadingModal.open();
    handleNFT
      .unlockTreasure()
      .then(callbackOpenTreasure)
      .catch((err) => {
        setIsAnimated(false);
        return null;
      })
      .finally(() => {
        handleTransactionLoadingModal.close();
      });
  };
  const onStakeLP = (value, type) => {
    handleTransactionLoadingModal.open();
    handleLpStaking
      .stake(value, type)
      .finally(() => handleTransactionLoadingModal.close());
  };
  const onUnstakeLP = (value, type) => {
    handleTransactionLoadingModal.open();
    handleLpStaking
      .unstake(value, type)
      .finally(() => handleTransactionLoadingModal.close());
  };
  const onclaimVeTresr = () => {
    handleTransactionLoadingModal.open();
    handleRewards
      .claimVeTresr()
      .finally(() => handleTransactionLoadingModal.close());
  };
  const onClaimBase = () => {
    handleTransactionLoadingModal.open();
    handleRewards
      .claimBase()
      .finally(() => handleTransactionLoadingModal.close());
  };
  const onClaimAllBase = () => {
    handleTransactionLoadingModal.open();
    handleRewards
      .claimAllBase()
      .finally(() => handleTransactionLoadingModal.close());
  };
  const onClaimBonus = () => {
    handleTransactionLoadingModal.open();
    handleRewards
      .claimBonus()
      .finally(() => handleTransactionLoadingModal.close());
  };
  const onClaimAll = () => {
    handleTransactionLoadingModal.open();
    handleRewards
      .claimAll()
      .finally(() => handleTransactionLoadingModal.close());
  };

  const onCloseApproveUpgradeModal = () => {
    handleApproveUpgradeModal.close();
    setIsApproved(false);
  };

  const onCloseApproveUpgradeAllModal = () => {
    handleApproveUpgradeAllModal.close();
    setIsApproved(false);
  };

  const onTryAgainOpenChest = () => {
    handleTreasureModal.open();
    handleChestModal.close();
    setIsAnimated(false);
  };

  const onConnectWallet = () => handleLoader.loaderWrapper(handleAuth.login, 2);
  const onView = () => handleExpandedKeyViewModal.open();
  const onViewTokenPage = () =>
    navigate(
      `/marketplace/${process.env.REACT_APP_NFKEY_ADDRESS}/${nftSelected?.tokenId}`
    );
  const onOpenActivateAllKeysModal = () => handleActivateAllKeysModal.open();
  const onOpenUpgradeAllKeysModal = () => {
    if (!upgradeAllKeysFlag) handleUpgradeAllKeysModal.open();
  };

  const handleRefresh = async () => {
    handleTransactionLoadingModal.open();
    await handleToken.updateUserTokenList(user?.wallet_id);
    navigate(0);
    handleTransactionLoadingModal.close();
  };

  const onNFKey = (tokenId, contractAddress) => {
    const findToken = nftLists?.find(
      (item) =>
        item?.tokenId === tokenId && item?.contractAddress === contractAddress
    );
    if (findToken && findToken != nftSelected) {
      ACTIONS.SET_COMPONENT_LOADER(dispatch, true);
      ACTIONS.SET_NFT_SELECTED(dispatch, findToken);
    }
  };

  const [
    hours,
    minutes,
    seconds,
    hoursValue,
    minutesValue,
    secondsValue,
    days,
  ] = useCountdown(nftSelected?.tierExpireTime);

  useEffect(() => {
    if (
      nftSelected?.tierTresr != 0 &&
      hours == 0 &&
      minutes == 0 &&
      seconds == 0
    ) {
      let findToken = nftLists?.find(
        (item) => item?.tokenId === nftSelected?.tokenId
      );
      findToken = handleToken?.getTierUpdatedToken(findToken);
      ACTIONS.SET_NFT_LIST_ITEM(dispatch, findToken);
      if (nftSelected?.tokenId == findToken.tokenId) {
        ACTIONS.SET_NFT_SELECTED(dispatch, findToken);
      }
    }
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (location.pathname === DASHBOARD_TAB_MENU_GAME_LINK)
      setActiveTab(DASHBOARD_TAB_MENU_GAME);
    else if (location.pathname === DASHBOARD_TAB_MENU_DASHBOARD_LINK)
      setActiveTab(DASHBOARD_TAB_MENU_DASHBOARD);
    else if (location.pathname === DASHBOARD_TAB_MENU_FAQ_LINK)
      setActiveTab(DASHBOARD_TAB_MENU_FAQ);
  }, [location]);

  useEffect(() => {
    if (!nftSelected?.tokenId) return;
    handleNFT
      .getNFkeyInfo(nftSelected)
      .then((res) => {
        ACTIONS.SET_COMPONENT_LOADER(dispatch, false);
        setAmountUpgradeKey(res[0]);
        setAmountOpenChest(res[1]);
        setProbToOpen(res[2]);
        ACTIONS.SET_TARGET_UPGRADE_DATE(dispatch, res[3]);
        // ACTIONS.SET_BALANCE_TRESR_TIME_UNLOCK(dispatch, res[4]);
        ACTIONS.SET_CALIMED_BONUS_TOTAL(dispatch, res[4]); // base total key reward value
        ACTIONS.SET_TRESR_REWARDS(dispatch, res[5]); // based key rewward of selected token
        // TODO: should set calcRewardsPerSec
        ACTIONS.SET_TRESR_REWARDS_PER_SEC(dispatch, res[6]);
        ACTIONS.SET_TOTAL_TRESR_REWARDS_PER_SEC(dispatch, res[7]);
      })
      .finally((err) => console.log("token?.selected done"));
  }, [nftSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hook that updates the token list in initial load, filter, sort
  useEffect(() => {
    if (nftLists?.length == 0) return;
    setFilterTokenList(
      nftLists
        // ?.filter((item) => item?.owner === user?.wallet_id)
        ?.filter((item) => {
          if (activeFilter?.value === FILTER_ACTIVE) return item?.staked;
          if (activeFilter?.value === FILTER_INACTIVE) return !item?.staked;
          return true;
        })
        .sort((a, b) => {
          if (activeDropdownItem?.value === SORT_HIGHEST_KEY_LEVEL)
            return b?.tier - a?.tier;
          else if (activeDropdownItem?.value === SORT_LOWEST_KEY_LEVEL)
            return a?.tier - b?.tier;
          else if (activeDropdownItem?.value === SORT_HIGHEST_TOKENID)
            return b?.tokenId - a?.tokenId;
          else return a?.tokenId - b?.token;
        })
        .sort((a, b) => b?.tierTresr - a?.tierTresr)
        // .sort((a, b) => b?.tokenId - a?.tokenId)
        .map((item, index) => ({ ...item, index }))
    );
  }, [nftLists, activeDropdownItem, activeFilter]);

  useEffect(() => {
    setIsNotActiveToken(filterTokenList.some((item) => !item?.staked));

    setIsMaxUpgrades(
      filterTokenList?.some((item, key) =>
        compareUnixDates(new Date().getTime() / 1000, item.upgradeToDelay)
      )
    );
  }, [filterTokenList]);

  // FIXME: this should be removed
  // useEffect(() => {
  //   if (filterTokenList?.length) {
  //     setIsMaxUpgrades(
  //       filterTokenList?.some((item, key) =>
  //         compareUnixDates(new Date().getTime() / 1000, item.upgradeToDelay)
  //       )
  //     );
  //     // handleNFT.getUpgradeDelay(token?.selected?.tokenId).then((res) => {});
  //     // Promise.all(
  //     //   filterTokenList?.map((item) => handleNFT.getUpgradeDelay(item?.tokenId))
  //     // ).then((res) =>
  //     //   setIsMaxUpgrades(
  //     //     filterTokenList?.some((item, key) =>
  //     //       compareUnixDates(new Date().getTime() / 1000, res[key])
  //     //     )
  //     //   )
  //     // );
  //   }
  // }, [filterTokenList]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loaderIsActive) return null;

  return (
    <section className="dashboard">
      <>
        <div className="dashboard__data">
          {activeTab === DASHBOARD_TAB_MENU_GAME && (
            <div
              className={`dashboard__data__content ${
                !nftSelected ? "dashboard__data__content--noToken" : ""
              }`}
            >
              {/* {loadingFlag && (
                <div className="w-screen h-full bg-[#ffffff10] fixed left-0 top-0 z-50">
                  <PageLoader
                    isLoaderActive={true}
                    opacityLevel={0}
                    customClass="pageLoaderWrapper mt-[20rem]"
                  />
                </div>
              )} */}
              <div className="dashboard__data__content--leftBlock">
                {isMobile && whitelist?.level ? (
                  <div className="flex-col flex gap-2">
                    <FAQsItem
                      answer={
                        <div className="flex flex-col">
                          <span className="navbar__dashboard--burnBlock__smrtr">
                            {formatterUS(burnedSmrtrBalance)} $SMRTR
                          </span>
                          <span className="navbar__dashboard--burnBlock__tresr">
                            {formatterUS(burnedTresrBalance)} $TRESR
                          </span>
                        </div>
                      }
                      question={"🔥 Burn Count"}
                    />
                    <FAQsItem
                      answer={
                        <>
                          <div className="navbar__dashboard--poolBlock__text">
                            <span>Founders' Pool:</span>
                            <span>{formatterUS(poolAllocationBalance)}</span>
                          </div>
                          <div className="navbar__dashboard--poolBlock__text">
                            <span>Bonus Pool:</span>
                            <span>
                              {formatterUS(claimableBonusPoolAllocationReward)}
                            </span>
                          </div>
                        </>
                      }
                      question={"💰 Game Emission Remaining"}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {isMobile &&
                  !!(nftSelected?.tokenId && poolAllocationBalance) && (
                    <DashboardKeyRewards
                      onConnectWallet={onConnectWallet}
                      onClaimBase={onClaimBase}
                      onClaimAllBase={onClaimAllBase}
                      isAnimated={isAnimated}
                      isDark={true}
                      isMobile={isMobile}
                    />
                  )}

                {nftSelected && (
                  <div
                    className={`dashboard__data__content--list ${
                      isAnimated && "nft__image--placeholder"
                    }`}
                  >
                    <FounderKeyCard
                      activeDropdownItem={activeDropdownItem}
                      setActiveDropdownItem={setActiveDropdownItem}
                      handleTransactionLoadingModal={handleRefresh}
                      activeFilter={activeFilter}
                      setActiveFilter={setActiveFilter}
                      filterTokenList={filterTokenList}
                      isAnimated={isAnimated}
                      onOpenModal={handleDashboardMobileModal?.open}
                      nftSelected={nftSelected}
                      onNFKey={onNFKey}
                      hours={hours}
                      minutes={minutes}
                      seconds={seconds}
                      days={days}
                    />
                    {!isAnimated && (isNotActiveToken || isMaxUpgrades) && (
                      <div
                        className="dashboard__data__content--list__buttons"
                        style={
                          !isMobile
                            ? {
                                bottom:
                                  filterTokenList?.length >= 6
                                    ? 0
                                    : `${(6 - filterTokenList?.length) * 86}px`,
                              }
                            : {
                                bottom:
                                  filterTokenList?.length >= 4
                                    ? 0
                                    : `${(4 - filterTokenList?.length) * 86}px`,
                              }
                        }
                      >
                        {isNotActiveToken && (
                          <Button
                            label="Activate All Keys"
                            variant="primary"
                            onClick={onOpenActivateAllKeysModal}
                          />
                        )}
                        {isMaxUpgrades && (
                          <Button
                            label="Max Upgrade Keys"
                            variant="primary"
                            onClick={onOpenUpgradeAllKeysModal}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {isMobile &&
                !nftSelected &&
                (!whitelist?.level || handleNFT.activeZone === null) && (
                  <DashboardNotWhitelisted />
                )}
              {!isMobile && (
                <div
                  className={`dashboard__data__content--form ${
                    !nftSelected
                      ? "dashboard__data__content--form__noToken"
                      : ""
                  }`}
                >
                  <DashboardGameTab
                    isAnimated={isAnimated}
                    probToOpen={probToOpen}
                    amountUpgradeKey={amountUpgradeKey}
                    handleUpgradeModal={handleUpgradeModal}
                    onView={onView}
                    handleTreasureModal={handleTreasureModal}
                    handleTreasureWarningModal={handleTreasureWarningModal}
                    amountOpenChest={amountOpenChest}
                    onOpenDeactivateKeyModal={handleDeactivateKeyModal.open}
                    onOpenActivateKeyModal={handleActivateKeyModal.open}
                    onClaimBonus={onClaimBonus}
                    onClaimBase={onClaimBase}
                    onClaimAllBase={onClaimAllBase}
                    onConnectWallet={onConnectWallet}
                    onStakeLP={onStakeLP}
                    onUnstakeLP={onUnstakeLP}
                    onViewTokenPage={onViewTokenPage}
                    setIsMaxUpgrades={setIsMaxUpgrades}
                    filterTokenList={filterTokenList}
                    handleTransactionLoadingModal={
                      handleTransactionLoadingModal
                    }
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === DASHBOARD_TAB_MENU_DASHBOARD && (
            <DashboardTab
              onStakeTresr={onStakeTresr}
              onUnstakeTresr={onUnstakeTresr}
              onClaimBonus={onClaimBonus}
              onClaimAll={onClaimAll}
              onConnectWallet={onConnectWallet}
              onStakeLP={onStakeLP}
              onUnstakeLP={onUnstakeLP}
              onclaimVeTresr={onclaimVeTresr}
            />
          )}
        </div>
      </>

      {handleSuccessfulUpgradeModal.isActive && (
        <SuccessKeyUpgradeModal
          isOpen={handleSuccessfulUpgradeModal.isActive}
          onClose={handleSuccessfulUpgradeModal.close}
        />
      )}

      {handleUpgradeModal.isActive && (
        <UpgradeKeyModal
          isOpen={handleUpgradeModal.isActive}
          onClose={handleUpgradeModal.close}
          nftSelected={nftSelected}
          amountUpgradeKey={amountUpgradeKey}
          onApproveUpgradeKey={onApproveUpgradeKey}
        />
      )}
      {handleTreasureModal.isActive && (
        <OpenTreasureBoxModal
          onClose={handleTreasureModal.close}
          isOpen={handleTreasureModal.isActive}
          nftSelected={nftSelected}
          amountOpenChest={amountOpenChest}
          onOpenTreasure={onOpenTreasure}
          balanceTresr={tresrBalance}
          probToOpen={probToOpen}
        />
      )}

      {handleTreasureWarningModal.isActive && (
        <TreasureWarningModal
          isOpen={handleTreasureWarningModal.isActive}
          onClose={handleTreasureWarningModal.close}
        />
      )}
      {handleDeactivateKeyModal.isActive && (
        <DeactivateKeyModal
          isOpen={handleDeactivateKeyModal.isActive}
          onClose={handleDeactivateKeyModal.close}
          onUnstake={onUnstake}
        />
      )}

      {handleActivateKeyModal.isActive && (
        <ActivateKeyModal
          onClose={handleActivateKeyModal.close}
          isOpen={handleActivateKeyModal.isActive}
          onStake={onStake}
        />
      )}
      {handleChestModal.isActive && (
        <TreasureBoxModal
          amountOpenChest={amountOpenChest}
          isOpen={handleChestModal.isActive}
          onClose={handleChestModal.close}
          onTryAgain={onTryAgainOpenChest}
          chestStatus={chestStatus}
          setIsAnimated={setIsAnimated}
        />
      )}

      {handleExpandedKeyViewModal.isActive && (
        <ExpandedNFTView
          onClose={handleExpandedKeyViewModal.close}
          isOpen={handleExpandedKeyViewModal.isActive}
          currentToken={nftSelected}
          isGame
        />
      )}

      {handleActivateAllKeysModal.isActive && (
        <ActivateAllKeysModal
          onClose={handleActivateAllKeysModal.close}
          onClick={onBulkStake}
          isOpen={true}
          filterTokenList={filterTokenList}
        />
      )}

      {handleUpgradeAllKeysModal.isActive && (
        <UpgradeAllKeysModal
          onClick={onBulkApproveKey}
          setTokenListToUpgrade={setTokenListToUpgrade}
          onClose={handleUpgradeAllKeysModal.close}
          isOpen={handleUpgradeAllKeysModal.isActive}
          handleTransactionLoadingModal={handleTransactionLoadingModal}
          setUpgradeAllKeysFlag={setUpgradeAllKeysFlag}
          upgradeAllKeysFlag={upgradeAllKeysFlag}
          filterTokenList={filterTokenList}
        />
      )}
      {handleApproveUpgradeModal.isActive && (
        <ApproveLoadingModal
          isOpen={handleApproveUpgradeModal.isActive}
          status={APPROVE_UPGRADE_KEY}
          isApproved={isApproved}
          onClose={onCloseApproveUpgradeModal}
          onNextStep={onUpgradeKey}
        />
      )}
      {handleApproveUpgradeAllModal.isActive && (
        <ApproveLoadingModal
          isOpen={handleApproveUpgradeAllModal.isActive}
          status={APPROVE_UPGRADE_ALL_KEYS}
          isApproved={isApproved}
          onClose={onCloseApproveUpgradeAllModal}
          onNextStep={onBulkUpgradeKey}
        />
      )}
      {handleTransactionLoadingModal.isActive && (
        <TransactionLoadingModal
          isOpen={handleTransactionLoadingModal.isActive}
        />
      )}

      {handleDashboardMobileModal.isActive &&
        isMobile &&
        activeTab === DASHBOARD_TAB_MENU_GAME && (
          <DashboardMobileModal
            isOpen={handleDashboardMobileModal.isActive}
            onClose={handleDashboardMobileModal.close}
            activeTab={activeTab}
            amountOpenChest={amountOpenChest}
            onClaimAll={onClaimAll}
            onClaimBase={onClaimBase}
            onClaimBonus={onClaimBonus}
            onStakeTresr={onStakeTresr}
            onUnstakeTresr={onUnstakeTresr}
            amountUpgradeKey={amountUpgradeKey}
            handleUpgradeModal={handleUpgradeModal}
            handleTreasureModal={handleTreasureModal}
            handleTreasureWarningModal={handleTreasureWarningModal}
            onView={onView}
            onOpenDeactivateKeyModal={handleDeactivateKeyModal.open}
            onOpenActivateKeyModal={handleActivateKeyModal.open}
            probToOpen={probToOpen}
            onConnectWallet={onConnectWallet}
            onStakeLP={onStakeLP}
            onUnstakeLP={onUnstakeLP}
          />
        )}
    </section>
  );
}
