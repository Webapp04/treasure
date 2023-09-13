import React from "react";
import "./style.scss";
import { formatterUS } from "utils";
import { BASE_REWARD, MAX_LEVEL } from "constant/blockchain";
import Button from "storybook/atom/Button/button";
import refreshIcon from "../../atom/Icon/svg/refresh.svg";
import leftArrowIcon from "../../atom/Icon/svg/arrow_left_light.svg";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import TimedMarketplaceButton from "../TimedMarketplaceButton/timedMarketplaceButton";

const RewardBox = ({
  nftSelected,
  dashboardMintContent,
  isAnimated,
  isActive,
  isMobile,
  onClose,
  handleTransactionLoadingModal,
  handleNFT,
  probToOpen,
  amountUpgradeKey,
  lineWidthPer,
  onOpenDeactivateKeyModal,
  handleUpgradeModal,
  handleTreasureWarningModal,
  isInsufficientBalance,
  targetUpgradeDate,
  onOpenActivateKeyModal,
  onView,
  onViewTokenPage,
  hours,
  minutes,
  seconds,
  isTimeToUpgrade,
  isUpgrade,
}) => {
  return (
    <div>
      {!nftSelected ? (
        dashboardMintContent()
      ) : (
        <div
          className={`reward__box--form__selectedToken ${
            isAnimated
              ? "nft__image--placeholder reward__box--form__selectedToken--isAnimated"
              : ""
          }`}
        >
          {isMobile && (
            <div
              className="absolute left-0 cursor-pointer top-0 text-[#BBC5FF] flex font-semibold"
              onClick={() => onClose()}
            >
              <img
                src={leftArrowIcon}
                style={{ minWidth: "20px", minHeight: "20px", width: "20px" }}
              />
              &nbsp;&nbsp;Back To All Keys
            </div>
          )}
          <div
            className="reward__box--form__selectedToken--wrapper"
            onClick={onView}
          >
            <video
              src={nftSelected?.spaceFile || nftSelected?.image}
              loop
              autoPlay
            />
            <div className="reward__box--form__selectedToken--keyTier">
              Level {nftSelected?.tier}
            </div>
          </div>

          {!isAnimated && (
            <div className="reward__box--form__selectedToken--info">
              <div
                className="reward__box--form__selectedToken--info__title"
                onClick={onViewTokenPage}
              >
                {nftSelected?.name} #{nftSelected?.tokenId}
              </div>
              {!isMobile && (
                <div
                  className="reward__box--form__selectedToken--info__desktop"
                  onClick={async () => {
                    handleTransactionLoadingModal?.open();
                    await handleNFT?.reloadNFTItemBalance(
                      nftSelected?.contractAddress,
                      nftSelected?.tokenId
                    );
                    handleTransactionLoadingModal?.close();
                  }}
                >
                  <Tooltip title="Force Update">
                    <img
                      src={refreshIcon}
                      alt=""
                      style={{
                        minWidth: "32px",
                        minHeight: "32px",
                        borderRadius: "0px",
                      }}
                    />
                  </Tooltip>
                </div>
              )}
              {isMobile && (
                <div
                  className="reward__box--form__selectedToken--info__mobile"
                  onClick={async () => {
                    handleTransactionLoadingModal?.open();
                    await handleNFT?.reloadNFTItemBalance(
                      nftSelected?.contractAddress,
                      nftSelected?.tokenId
                    );
                    handleTransactionLoadingModal?.close();
                  }}
                >
                  <Tooltip title="Force Update">
                    <img
                      src={refreshIcon}
                      alt=""
                      style={{
                        minWidth: "32px",
                        minHeight: "32px",
                        borderRadius: "0px",
                      }}
                    />
                  </Tooltip>
                </div>
              )}
              <div className="reward__box--form__selectedToken--info__data">
                <Tooltip
                  title={
                    "Not all treasure boxes will open. Your odds at successfully opening a Treasure Box go up as you stake TRESR to earn veTRESR."
                  }
                  position="bottom"
                >
                  <div className="reward__box--form__selectedToken--info__percentToOpen">
                    <div>
                      {!!nftSelected?.staked ? (
                        <div>
                          {probToOpen?.toFixed(1)} % chance to open the box
                        </div>
                      ) : (
                        <div>You should activate the key to open the box</div>
                      )}
                    </div>
                  </div>
                </Tooltip>
              </div>
              <div className="reward__box--form__selectedToken--info__countToNext reward__box--form__selectedToken--info__countToNext--margin">
                <p className="reward__box--form__selectedToken--info__countToNext--greyText">
                  Upgrade cost
                </p>
                <div className="reward__box--form__selectedToken--info__countToNext--blackText">
                  <div className="reward__box__flex__wrapper">
                    <div>{formatterUS(amountUpgradeKey)} SMRTR</div>
                  </div>
                </div>
              </div>
              <div className="reward__box--form__selectedToken--info__countToNext">
                <p className="reward__box--form__selectedToken--info__countToNext--greyText">
                  Next Tier Est. Monthly
                </p>
                <div className="reward__box--form__selectedToken--info__countToNext--blackText">
                  <div className="reward__box__flex__wrapper">
                    <div>
                      {(+nftSelected?.tier + 1) *
                        +nftSelected?.tierTresr *
                        BASE_REWARD *
                        30}{" "}
                      TRESR
                    </div>
                  </div>
                </div>
              </div>
              {!isMobile && (
                <div className="reward__box--form__selectedToken--info__progressWrapper">
                  <div className="reward__box--form__selectedToken--info__progressWrapper__bar">
                    <div
                      className={`reward__box--form__selectedToken--info__progressWrapper__line`}
                      style={{ width: lineWidthPer }}
                    />
                  </div>

                  <div className="reward__box--form__selectedToken--info__progressWrapper__info">
                    Key level: {nftSelected?.tier}/{MAX_LEVEL}
                  </div>
                </div>
              )}
              {!isMobile && (
                <div className="reward__box--form__selectedToken--info__buttonWrap">
                  <TimedMarketplaceButton
                    onClick={
                      isActive
                        ? handleUpgradeModal?.open
                        : handleTreasureWarningModal?.open
                    }
                    isInsufficientBalance={isInsufficientBalance}
                    targetUpgradeDate={targetUpgradeDate}
                    disabled={nftSelected?.tier >= 150}
                    currentLevel={nftSelected?.tier}
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                    isTimeToUpgrade={isTimeToUpgrade}
                    isUpgrade={isUpgrade}
                  />
                  {nftSelected?.staked ? (
                    <Button
                      label={"Deactivate"}
                      variant="secondary"
                      onClick={onOpenDeactivateKeyModal}
                    />
                  ) : (
                    <Button
                      label={"Activate"}
                      variant="secondary"
                      onClick={onOpenActivateKeyModal}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {isMobile && (
        <div className="reward__box--form__selectedToken--info__progressWrapper">
          <div className="reward__box--form__selectedToken--info__progressWrapper__bar">
            <div
              className={`reward__box--form__selectedToken--info__progressWrapper__line`}
              style={{ width: lineWidthPer }}
            />
          </div>

          <div className="reward__box--form__selectedToken--info__progressWrapper__info">
            Key level: {nftSelected?.tier}/{MAX_LEVEL}
          </div>
        </div>
      )}
      {isMobile && (
        <div className="reward__box--form__selectedToken--info__buttonWrap">
          <TimedMarketplaceButton
            onClick={
              isActive
                ? handleUpgradeModal?.open
                : handleTreasureWarningModal?.open
            }
            isInsufficientBalance={isInsufficientBalance}
            targetUpgradeDate={targetUpgradeDate}
            disabled={nftSelected?.tier >= 150}
            currentLevel={nftSelected?.tier}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            isTimeToUpgrade={isTimeToUpgrade}
            isUpgrade={isUpgrade}
          />
          {nftSelected?.staked ? (
            <Button label={"Deactivate"} onClick={onOpenDeactivateKeyModal} />
          ) : (
            <Button label={"Activate"} onClick={onOpenActivateKeyModal} />
          )}
        </div>
      )}
    </div>
  );
};

export default RewardBox;
