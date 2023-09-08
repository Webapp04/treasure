import React, { useEffect, useState } from "react";
import "./style.scss";
import MarketplaceButton from "../../MarketplaceButton";
import { formatterUS } from "../../../../utils";
import { BASE_REWARD } from "../../../../constant/blockchain";
import useMakeNotificationSound from "../../../../hooks/useMakeSound";
import SocialLinkComponent from "components/AccountComponent/SocialLinkComponent";
import { NFKEY_SOCIALS } from "constant/singleCollectionPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectLoaderIsActive } from "redux/slice/loaderSlice";
import Modal from "storybook/atom/Modal/modal";

const TreasureBoxModal = ({
  isOpen,
  onClose,
  chestStatus,
  onTryAgain,
  amountOpenChest,
  setIsAnimated,
}) => {
  const loaderIsActive = useSelector(selectLoaderIsActive);
  const nftSelected = useSelector(selectNftSelected);
  const [isTextShown, setIsTextShown] = useState(false);
  const [socials, setSocials] = useState([]);
  const audio = useMakeNotificationSound();
  const navigate = useNavigate();

  const estPerMonth = nftSelected?.staked
    ? +nftSelected?.tier * nftSelected?.tierTresr * BASE_REWARD * 30
    : 0;

  const onCloseModal = () => {
    onClose();
    setIsTextShown(false);
    setIsAnimated(false);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsTextShown(true), 6000);
      chestStatus
        ? audio("audio/ModalVideoGame-Success.mp3")
        : audio("audio/ModalVideoGame-Failure.mp3");
    } else setIsTextShown(false);
    setSocials(NFKEY_SOCIALS);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (chestStatus === null) return null;
  return (
    <Modal
      handleClose={onCloseModal}
      isModalOpen={isOpen}
      withCrossIcon
      isFullModalBg
      className="max-w-[580px] max-h-[580px] px-[0px] py-[0px]"
    >
      {chestStatus ? (
        <div
          className={`treasureBoxModal__success ${
            isTextShown ? "treasureBoxModal__visible" : ""
          }`}
        >
          <p className="modal__title treasureBoxModal__title">Success!</p>
          <p className="modal__text treasureBoxModal__title">
            Your Treasure Tier for
            <span className="modal__text--blue">
              {" "}
              Founder's Key #{nftSelected?.tokenId}{" "}
            </span>
            is now{" "}
            <span className="treasureBoxModal__text--yellow">
              Tier {nftSelected?.tierTresr}
            </span>
            !<br />
            Now your rewards are{" "}
            <span className="treasureBoxModal__text--yellow">
              {estPerMonth} $TRESR/month
            </span>
          </p>
          <p className="modal__text treasureBoxModal__title">
            Remember: Your Treasure Tier is temporary and must be updated before
            the timer runs out.
          </p>
          <div className="treasureBoxModal__socials mt-[180px]">
            {socials?.map((item, key) => (
              <SocialLinkComponent
                key={key}
                isEditMode={false}
                link={item?.link}
                index={key}
                isNFTPage
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`treasureBoxModal__failure ${
            isTextShown ? "treasureBoxModal__visible" : ""
          }`}
        >
          <p className="modal__title treasureBoxModal__title">Oooops!</p>
          <p className="modal__text treasureBoxModal__title">
            The box didn't open. Your Treasure Tier will remain at{" "}
            <span className="treasureBoxModal__text--gray">
              Tier {nftSelected?.tierTresr}
            </span>
            .<br />
            You can burn{" "}
            <span className="treasureBoxModal__text--gray">
              {formatterUS(amountOpenChest)} $TRESR
            </span>{" "}
            to try to open the Treasure Box again
          </p>
        </div>
      )}

      <div
        className={`treasureBoxModal__video ${chestStatus && "-z-10 relative"}`}
      >
        <video
          src={
            chestStatus
              ? "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/static-space/TreasureBox-Success-LowRes.mp4"
              : "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/static-space/TreasureBox-Fail-LowRes.mp4"
          }
          autoPlay
          muted
          height={580}
          width={580}
        />
      </div>

      {chestStatus ? (
        <div
          className={`treasureBoxModal__buttons ${
            isTextShown ? "treasureBoxModal__buttons--visible" : ""
          }`}
        >
          <MarketplaceButton
            isWhite
            title={"Back to Dashboard"}
            onClick={onCloseModal}
          />
          {!loaderIsActive && (
            <MarketplaceButton
              isBlue
              title={"Open Another"}
              onClick={onTryAgain}
            />
          )}
        </div>
      ) : (
        <div
          className={`treasureBoxModal__buttons ${
            isTextShown ? "treasureBoxModal__buttons--visible" : ""
          }`}
        >
          <MarketplaceButton
            isWhite
            title={"Back to Dashboard"}
            onClick={onCloseModal}
          />
          <MarketplaceButton isBlue title={"Try Again "} onClick={onTryAgain} />
        </div>
      )}
    </Modal>
  );
};

export default TreasureBoxModal;
