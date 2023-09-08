import { useEffect, useState } from "react";
import useCommon from "../../../hooks/useCommon";
import useHandleLpStaking from "../../../hooks/blockchain/useHandleLpStaking";
import "./style.scss";
import arrowDark from "../../../assets/images/arrowDark.svg";
import arrowWhite from "../../../assets/images/arrowWhite.svg";
import smrtrImg from "../../../assets/images/smrtr.png";
import avaxImg from "../../../assets/images/avaxBlue.svg";
import useHandleRewards from "../../../hooks/blockchain/useHandleRewards";
import useHandleAuth from "../../../hooks/auth/useHandleAuth";
import useHandleLoader from "../../../hooks/loader/useHandleLoader";
import { useSelector } from "react-redux";
import {
  selectLpSMRTRAVAXBalance,
  selectLpStakedSMRTRAVAXBalance,
  selectLpStakedTRESRAVAXBalance,
  selectLpTRESRAVAXBalance,
  selectLpTotalStakedSMRTRAVAXBalance,
  selectLpTotalStakedTRESRAVAXBalance,
} from "redux/slice/balanceSlice";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";

const pools = [
  {
    firstToken: "SMRTR",
    secondToken: "AVAX",
    value: "SMRTRAVAX",
    poolLink:
      "https://traderjoexyz.com/pool/0x6d923f688c7ff287dc3a5943caeefc994f97b290/AVAX#/",
    analyticsLink:
      "https://analytics.traderjoexyz.com/pairs/0x7b7617c7b2236d7871741783cae8bcc222c2e05d",
  },
  {
    firstToken: "TRESR",
    secondToken: "AVAX",
    value: "TRESRAVAX",
    poolLink:
      "https://traderjoexyz.com/pool/0x6d923f688c7ff287dc3a5943caeefc994f97b290/AVAX#/",
    analyticsLink:
      "https://analytics.traderjoexyz.com/pairs/0x7b7617c7b2236d7871741783cae8bcc222c2e05d",
  },
];

export default function DashboardLpStaking({
  onCloseTransactionLoadingModal,
  onOpenTransactionLoadingModal,
}) {
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const lpSMRTRAVAXBalance = useSelector(selectLpSMRTRAVAXBalance);
  const lpTRESRAVAXBalance = useSelector(selectLpTRESRAVAXBalance);
  const lpStakedSMRTRAVAXBalance = useSelector(selectLpStakedSMRTRAVAXBalance);
  const lpStakedTRESRAVAXBalance = useSelector(selectLpStakedTRESRAVAXBalance);
  const lpTotalStakedSMRTRAVAXBalance = useSelector(
    selectLpTotalStakedSMRTRAVAXBalance
  );
  const lpTotalStakedTRESRAVAXBalance = useSelector(
    selectLpTotalStakedTRESRAVAXBalance
  );
  const BalanceLp = useSelector(selectBalanceLp);
  const [selectedPool, setSelectedPool] = useState(pools[0]);
  const [isPoolSelectorOpened, setIsPoolSelectorOpened] = useState(false);
  const [activeStakingTab, setActiveStakingTab] = useState("stake");
  const [stakeAmount, setStakeAmount] = useState("0.000");
  const [unstakeAmount, setUnstakeAmount] = useState("0.000");

  const [stakeInputWidth, setStakeInputWidth] = useState(50);
  const [unstakeInputWidth, setUnstakeInputWidth] = useState(50);

  const idDarkTheme = theme === "dark";

  const { addCommasToNumber } = useCommon();
  const handleRewards = useHandleRewards();
  const handleLpStaking = useHandleLpStaking();
  const handleAuth = useHandleAuth();
  const handleLoader = useHandleLoader();

  const jlpSmrtBonusRewardPerSecond = handleRewards?.jlpSmrtBonusRewardPerSecond
    ? (+handleRewards?.jlpSmrtBonusRewardPerSecond * 60 * 60 * 24).toFixed(5)
    : 0;
  const jlpTresrBonusRewardPerSecond =
    handleRewards?.jlpTresrBonusRewardPerSecond
      ? (+handleRewards?.jlpTresrBonusRewardPerSecond * 60 * 60 * 24).toFixed(5)
      : 0;
  const estDaily =
    selectedPool.value === "SMRTRAVAX"
      ? jlpSmrtBonusRewardPerSecond
      : jlpTresrBonusRewardPerSecond;

  const balanceLP =
    selectedPool.value === "SMRTRAVAX"
      ? addCommasToNumber(lpSMRTRAVAXBalance, 3)
      : addCommasToNumber(lpTRESRAVAXBalance, 3);
  const balanceLPStaked =
    selectedPool.value === "SMRTRAVAX"
      ? addCommasToNumber(lpStakedSMRTRAVAXBalance, 3)
      : addCommasToNumber(lpStakedTRESRAVAXBalance, 3);
  const balanceLPTotalStaked =
    selectedPool.value === "SMRTRAVAX"
      ? addCommasToNumber(lpTotalStakedSMRTRAVAXBalance, 3)
      : addCommasToNumber(lpTotalStakedTRESRAVAXBalance, 3);
  const poolShareCalc =
    selectedPool.value === "SMRTRAVAX"
      ? (lpStakedSMRTRAVAXBalance * 100) / lpTotalStakedSMRTRAVAXBalance
      : (lpStakedTRESRAVAXBalance * 100) / lpTotalStakedTRESRAVAXBalance;

  const poolShare =
    isNaN(poolShareCalc) || !isFinite(poolShareCalc)
      ? 0
      : poolShareCalc
      ? poolShareCalc?.toFixed(1)
      : 0;

  const onConnectWallet = () => handleLoader.loaderWrapper(handleAuth.login, 2);

  const handleChangePool = (pool) => {
    setSelectedPool(pool);
    setIsPoolSelectorOpened(false);
  };

  const handleStakeAmountInput = (e) => {
    if (!e.target.value) {
      setStakeInputWidth(50);
      setStakeAmount("0.000");
    } else {
      setStakeInputWidth((e.target.value.length + 1) * 8);
      setStakeAmount(e.target.value);
    }
  };

  const handleUnstakeAmountInput = (e) => {
    if (!e.target.value) {
      setUnstakeInputWidth(50);
      setUnstakeAmount("0.000");
    } else {
      setUnstakeInputWidth((e.target.value.length + 1) * 8);
      setUnstakeAmount(e.target.value);
    }
  };

  const handleMaxStakeAmount = () => {
    setStakeInputWidth(
      ((selectedPool.value === "SMRTRAVAX"
        ? lpSMRTRAVAXBalance.toString()
        : lpTRESRAVAXBalance.toString()
      ).length +
        1) *
        8
    );
    setStakeAmount(
      selectedPool.value === "SMRTRAVAX"
        ? lpSMRTRAVAXBalance.toString()
        : lpTRESRAVAXBalance.toString()
    );
  };

  const handleMaxUnstakeAmount = () => {
    setUnstakeInputWidth(
      ((selectedPool.value === "SMRTRAVAX"
        ? lpStakedSMRTRAVAXBalance.toString()
        : lpStakedTRESRAVAXBalance.toString()
      ).length +
        1) *
        8
    );
    setUnstakeAmount(
      selectedPool.value === "SMRTRAVAX"
        ? lpStakedSMRTRAVAXBalance.toString()
        : lpStakedTRESRAVAXBalance.toString()
    );
  };

  const handleStake = () => {
    if (!user?.wallet_id) return onConnectWallet();

    onOpenTransactionLoadingModal();
    handleLpStaking
      .stake(stakeAmount, selectedPool.value)
      .finally(() => onCloseTransactionLoadingModal());
  };
  const handleUnstake = () => {
    if (!user?.wallet_id) return onConnectWallet();

    onOpenTransactionLoadingModal();
    handleLpStaking
      .unstake(unstakeAmount, selectedPool.value)
      .finally(() => onCloseTransactionLoadingModal());
  };

  useEffect(() => {
    handleRewards.getJlpTresrBonusRewardPerSecond();
    handleRewards.getJlpSmrtBonusRewardPerSecond();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="lp-staking">
      <div className="lp-staking__poolSelector">
        <div
          className="lp-staking__poolSelector-current"
          onClick={() => setIsPoolSelectorOpened(!isPoolSelectorOpened)}
        >
          <img src={smrtrImg} alt={""} /> {selectedPool.firstToken} /{" "}
          <img src={avaxImg} alt={""} /> {selectedPool.secondToken}
          <img
            src={idDarkTheme ? arrowWhite : arrowDark}
            alt={""}
            className={`lp-staking__arrow ${
              isPoolSelectorOpened ? "lp-staking__arrow--open" : ""
            }`}
          />
        </div>
        {isPoolSelectorOpened && (
          <div className="lp-staking__poolSelector-items">
            {pools.map((pool, key) => {
              return (
                <div key={key} onClick={() => handleChangePool(pool)}>
                  <img src={smrtrImg} alt={""} />
                  {pool.firstToken} / <img src={avaxImg} alt={""} />
                  {pool.secondToken}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="lp-staking__contentWrapper">
        <div className="lp-staking__contentWrapper--stake card">
          <div className="lp-staking__contentWrapper--stake__tabs">
            <div
              className={`lp-staking__contentWrapper--stake__tabs--item ${
                activeStakingTab === "stake" ? "active" : ""
              }`}
              onClick={() => setActiveStakingTab("stake")}
            >
              Stake
            </div>
            <div
              className={`lp-staking__contentWrapper--stake__tabs--item ${
                activeStakingTab === "unstake" ? "active" : ""
              }`}
              onClick={() => setActiveStakingTab("unstake")}
            >
              Unstake
            </div>
          </div>
          <div className="lp-staking__contentWrapper--stake__content">
            {activeStakingTab === "stake" && (
              <>
                <div className="lp-staking__contentWrapper--stake__title">
                  Total LP Balance
                </div>
                <div className="lp-staking__contentWrapper--stake__balance">
                  {balanceLP}
                </div>
                <div className="lp-staking__contentWrapper--stake__subtitle">
                  <a
                    href={selectedPool.poolLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add Liquidity
                  </a>
                </div>
                <div className="numberInput">
                  <div className="numberInput--wrapper">
                    <input
                      type="number"
                      style={{ width: stakeInputWidth + "px" }}
                      min={0}
                      max={balanceLP}
                      onInput={(e) => handleStakeAmountInput(e)}
                      value={stakeAmount}
                    />
                    <span className="numberInput--ticker">
                      LP {selectedPool.value}
                    </span>
                  </div>
                  <div
                    className="numberInput--max"
                    onClick={handleMaxStakeAmount}
                  >
                    max
                  </div>
                </div>
                <button className="button light" onClick={handleStake}>
                  Stake{" "}
                  {`${selectedPool.firstToken}-${selectedPool.secondToken}`}-LP
                </button>
              </>
            )}
            {activeStakingTab === "unstake" && (
              <>
                <div className="lp-staking__contentWrapper--stake__title">
                  Total LP Staked
                </div>
                <div className="lp-staking__contentWrapper--stake__balance">
                  {balanceLPStaked}
                </div>
                <div className="lp-staking__contentWrapper--stake__subtitle">
                  <a
                    href={selectedPool.poolLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add Liquidity
                  </a>
                </div>
                <div className="numberInput">
                  <div className="numberInput--wrapper">
                    <input
                      type="number"
                      style={{ width: unstakeInputWidth + "px" }}
                      min={0}
                      max={balanceLP}
                      onInput={(e) => handleUnstakeAmountInput(e)}
                      value={unstakeAmount}
                    />
                    <span className="numberInput--ticker">LP</span>
                  </div>
                  <div
                    className="numberInput--max"
                    onClick={handleMaxUnstakeAmount}
                  >
                    max
                  </div>
                </div>
                <button className="button light" onClick={handleUnstake}>
                  Withdraw{" "}
                  {`${selectedPool.firstToken}-${selectedPool.secondToken}`}-LP
                </button>
              </>
            )}
          </div>
        </div>
        <div className="lp-staking__contentWrapper--info cardFull">
          <div className="lp-staking__contentWrapper--info__contentWrapper">
            <div className="lp-staking__contentWrapper--info__el">
              <div className="lp-staking__contentWrapper--info__el--value">
                {balanceLPTotalStaked}
              </div>
              <div className="lp-staking__contentWrapper--info__el--title">
                Total LP tokens staked
              </div>
            </div>
            <div className="lp-staking__contentWrapper--info__el">
              <div className="lp-staking__contentWrapper--info__el--value">
                {poolShare}%
              </div>
              <div className="lp-staking__contentWrapper--info__el--title">
                Your Bonus Pool Share
              </div>
            </div>
            <div className="lp-staking__contentWrapper--info__el">
              <div className="lp-staking__contentWrapper--info__el--value">
                {poolShare}%
              </div>
              <div className="lp-staking__contentWrapper--info__el--title">
                % Bonus Pool from LP
              </div>
            </div>
            <div className="lp-staking__contentWrapper--info__el">
              <div className="lp-staking__contentWrapper--info__el--value">
                {estDaily}
              </div>
              <div className="lp-staking__contentWrapper--info__el--title">
                Est Daily Rewards
              </div>
            </div>
          </div>
          <button className="button">
            <a
              href={selectedPool.analyticsLink}
              target="_blank"
              rel="noreferrer"
            >
              View Pool Analytics
            </a>
          </button>
        </div>
      </div>
    </section>
  );
}
