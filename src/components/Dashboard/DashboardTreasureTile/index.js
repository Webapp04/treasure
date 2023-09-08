import { BASE_REWARD, MAX_CHEST_TIER } from "../../../constant/blockchain";
import { formatterUS } from "../../../utils";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import TreasureBox from "storybook/molecule/TreasureBox/treasureBox";
import { useCountdown } from "hooks/useCountdown";

export default function DashboardTreasureTile({
  onOpenModal,
  onOpenWarningModal,
  amountOpenChest,
  isAnimated,
}) {
  const nftSelected = useSelector(selectNftSelected);
  const [hours, minutes, seconds, days] = useCountdown(
    nftSelected?.tierExpireTime
  );
  const progressWidth = nftSelected?.tierTresr
    ? 100 / (MAX_CHEST_TIER / nftSelected?.tierTresr)
    : 0;
  const isMaxLevel = MAX_CHEST_TIER === nftSelected?.tierTresr;
  const isActive = !!nftSelected?.staked;
  const openAttemptTitle = isMaxLevel
    ? "-"
    : `${formatterUS(amountOpenChest)} TRESR`;
  const nextTierEstTitle = isMaxLevel
    ? "-"
    : `${
        +nftSelected?.tier * (nftSelected?.tierTresr + 1) * BASE_REWARD * 30
      } TRESR`;

  const onAction = () => (isActive ? onOpenModal() : onOpenWarningModal());

  return (
    <TreasureBox
      isAnimated={isAnimated}
      nftSelected={nftSelected}
      openAttemptTitle={openAttemptTitle}
      nextTierEstTitle={nextTierEstTitle}
      progressWidth={progressWidth}
      onAction={onAction}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      days={days}
    />
  );
}
