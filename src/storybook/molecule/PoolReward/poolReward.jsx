import React from "react";
import "./style.scss";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import infoImg from "../../atom/Icon/svg/info_img.svg";
import infoImgDark from "../../atom/Icon/svg/info_img_dark.svg";
import Button from "storybook/atom/Button/button";
import { formatterUS } from "utils";
import Loader from "storybook/atom/Loader/loader";

const PoolReward = ({
  flag,
  isDark,
  onclaimVeTresr,
  veTresrBalance,
  veClaimedTresr,
  balanceVeTresrPerHour,
  balanceMaxAvailable,
  balanceEstDaysToMax,
}) => {
  return (
    <div className="votingEscrow__wrapper">
      <div className="totalPoolReward__image">
        <Tooltip
          title="More veTRESR = better rewards and success rate when unlocking Treasure Boxes for boosted rewards. Keep eyes on your veTRESR balance. As your veProbability level rises, it becomes easier and more profitable to open Treasure Boxes."
          position="left"
        >
          <img src={isDark ? infoImg : infoImgDark} alt={""} />
        </Tooltip>
      </div>
      <div className="votingEscrow__actions max-sm:mt-4">
        <div className="votingEscrow__actions--title">Unclaimed veTRESR</div>
        <div className="votingEscrow__actions--wrapper">
          <div className="votingEscrow__actions--count">
            {formatterUS(veTresrBalance)}
          </div>
          <div className="votingEscrow__actions--loader">
            {flag && (
              <Loader
                size="extraSmall"
                variant={isDark ? "primary" : "secondary"}
              />
            )}
          </div>
        </div>
        <div className="votingEscrow__actions--subtitle">
          Available veTRESR to claim
        </div>
        <div className="votingEscrow__actions--buttons">
          <Button
            variant="secondary"
            label="Claim veTRESR"
            onClick={() => onclaimVeTresr()}
          />
        </div>
      </div>
      <div className="votingEscrow__info mt-5">
        <ul>
          <li>
            <span className="votingEscrow__info__label">Claimed veTRESR</span>
            <div className="votingEscrow__info__wrapper">
              <span className="votingEscrow__info__value">
                {formatterUS(veClaimedTresr)}
              </span>
              <div className="votingEscrow__info__loader">
                {flag && (
                  <Loader
                    size="extraSmall"
                    variant={isDark ? "primary" : "secondary"}
                  />
                )}
              </div>
            </div>
          </li>
          <li>
            <span className="votingEscrow__info__label">veTRESR/hour</span>
            <div className="votingEscrow__info__wrapper">
              <span className="votingEscrow__info__value">
                {formatterUS(balanceVeTresrPerHour)}
              </span>
              <div className="votingEscrow__info__loader">
                {flag && (
                  <Loader
                    size="extraSmall"
                    variant={isDark ? "primary" : "secondary"}
                  />
                )}
              </div>
            </div>
          </li>
          <li>
            <span className="votingEscrow__info__label">Max veTRESR</span>
            <div className="votingEscrow__info__wrapper">
              <span className="votingEscrow__info__value">
                {formatterUS(balanceMaxAvailable)}
              </span>
              <div className="votingEscrow__info__loader">
                {flag && (
                  <Loader
                    size="extraSmall"
                    variant={isDark ? "primary" : "secondary"}
                  />
                )}
              </div>
            </div>
          </li>
          <li>
            <span className="votingEscrow__info__label">Days to Max</span>
            <div className="votingEscrow__info__wrapper">
              <span className="votingEscrow__info__value">
                {formatterUS(balanceEstDaysToMax)}
              </span>
              <div className="votingEscrow__info__loader">
                {flag && (
                  <Loader
                    size="extraSmall"
                    variant={isDark ? "primary" : "secondary"}
                  />
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PoolReward;
