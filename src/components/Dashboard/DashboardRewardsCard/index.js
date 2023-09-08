import "./style.scss";
import { useEffect } from "react";
import useHandleNFT from "../../../hooks/blockchain/useHandleNFT";
import useHandleAuth from "../../../hooks/auth/useHandleAuth";
import useHandleLoader from "../../../hooks/loader/useHandleLoader";
import { BASE_REWARD } from "../../../constant/blockchain";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectUser } from "redux/slice/userSlice";
import {
  selectTresrRewards,
  selectTresrRewardsReleased,
} from "redux/slice/rewardSlice";

export default function DashboardRewardsCard({
  onClaimBase,
  amountUpgradeKey,
  amountOpenChest,
}) {
  const user = useSelector(selectUser);
  const nftSelected = useSelector(selectNftSelected);
  const claimableTresrRewardsReleased = useSelector(selectTresrRewardsReleased);
  const claimableTresrRewards = useSelector(selectTresrRewards);

  // const [timerID, setTimerID] = useState(0);

  const handleNFT = useHandleNFT();
  const handleAuth = useHandleAuth();
  const handleLoader = useHandleLoader();

  const balanceDailyTresr = nftSelected?.staked
    ? +nftSelected?.tier * nftSelected?.tierTresr * BASE_REWARD
    : 0;
  const balanceTresrRewardsReleased =
    +claimableTresrRewardsReleased + +claimableTresrRewards;

  useEffect(() => {
    handleNFT.getRewardsReleased();
    handleNFT.getTresrRewardsBalance(nftSelected?.tokenId);

    // clearInterval(timerID);
    // const timer = setInterval(() => handleNFT.getTresrRewardsBalance(token?.selected?.tokenId), 1000);
    // setTimerID(timer);
    //
    // return () => clearInterval(timerID);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onConnectWallet = () => handleLoader.loaderWrapper(handleAuth.login, 2);

  const onClickClaimBaseRewards = () => {
    if (!user?.wallet_id) return onConnectWallet();

    onClaimBase();
  };

  return (
    <div className="votingEscrow rewards">
      <div className="votingEscrow__actions rewards__actions">
        <div className="votingEscrow__actions--title">
          Daily Founder's Rewards
        </div>
        <div className="votingEscrow__actions--count">
          {+claimableTresrRewards?.toFixed(5)}
        </div>
        <div className="votingEscrow__actions--subtitle">
          Available TRESR to claim
        </div>
        <button className="button light" onClick={onClickClaimBaseRewards}>
          Claim Base Rewards
        </button>
      </div>
      <div className="votingEscrow__info rewards__info">
        <ul>
          <li>
            <span className="votingEscrow__info__label">Next Key Upgrade</span>
            <span className="votingEscrow__info__value">
              {amountUpgradeKey} SMRTR
            </span>
          </li>
          <li>
            <span className="votingEscrow__info__label">Treasure Tier</span>
            <span className="votingEscrow__info__value">
              {nftSelected?.tierTresr}
            </span>
          </li>
          <li>
            <span className="votingEscrow__info__label">
              Total TRESR earned
            </span>
            <span className="votingEscrow__info__value">
              {balanceTresrRewardsReleased?.toFixed(5)} TRESR
            </span>
          </li>
          <li>
            <span className="votingEscrow__info__label">Next Open Attempt</span>
            <span className="votingEscrow__info__value">
              {amountOpenChest?.toFixed(5)} TRESR
            </span>
          </li>
          <li>
            <span className="votingEscrow__info__label">Est. Daily TRESR</span>
            <span className="votingEscrow__info__value">
              {balanceDailyTresr}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
