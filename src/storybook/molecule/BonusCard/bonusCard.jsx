import React from "react";
import "./style.scss";
import infoImg from "../../atom/Icon/svg/info_img.svg";
import infoImgDark from "../../atom/Icon/svg/info_img_dark.svg";
import { formatterUS } from "utils";
import Button from "storybook/atom/Button/button";
import Tooltip from "storybook/atom/Tooltip/tooltip";

const BonusCard = ({
  isDark,
  isMobile,
  totalRewards,
  onClaimBonus,
  claimableBonusTotalReward,
  comulativeKeyLevel,
  veTresrSharePBalance,
  claimableBonusVeTresrReward,
  lpTotalStakedSMRTRAVAXBalance,
  claimableBonusJlpSmartrReward,
  lpTotalStakedTRESRAVAXBalance,
  claimableBonusJlpTresrReward,
  keyLevelPBalance,
  claimableBonusKeyLevelReward,
}) => {
  return (
    <>
      {!isMobile ? (
        <div className="BonusCard">
          <div className="totalPoolReward__image">
            <Tooltip title="?" position="left">
              <img src={isDark ? infoImg : infoImgDark} alt={""} />
            </Tooltip>
          </div>
          <div className="BonusCard__actions">
            <div className="votingEscrow__actions--title">Bonus Rewards</div>
            <div className="votingEscrow__actions--wrapper">
              <div className="votingEscrow__actions--count">
                {formatterUS(totalRewards)}
              </div>
            </div>
            <div className="votingEscrow__actions--subtitle">
              Available $TRESR to claim
            </div>
            <div className="dashboardBonusCard__actions--button">
              <Button
                variant="outlined"
                size="large"
                label="Claim Bonus Rewards"
                onClick={() => onClaimBonus()}
              />
            </div>
          </div>
          <div className="votingEscrow__info rewards__info">
            <ul>
              <li>
                <span className="votingEscrow__info__label">
                  Total Rewards Share
                </span>
                <div className="votingEscrow__info__wrapper">
                  <span className="votingEscrow__info__value">
                    {formatterUS(claimableBonusTotalReward, 3)}%
                  </span>
                </div>
              </li>
              <li>
                <div className="votingEscrow__info__level">
                  <span className="votingEscrow__info__label">
                    Cumulative Key level
                  </span>
                  <div className="votingEscrow__info__wrapper">
                    <span className="votingEscrow__info__value">
                      {comulativeKeyLevel}
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="horizontal__bar"></div>
              </li>
              <li>
                <div className="BonusCard__pool">
                  <div className="BonusCard__pool__label">Rewards Pool</div>
                  <div className="BonusCard__pool__value">Weight</div>
                  <div className="BonusCard__pool__value">Share</div>
                  <div className="BonusCard__pool__value">Daily</div>
                </div>
              </li>
              <li>
                <div className="BonusCard__pool">
                  <div className="BonusCard__pool__label">veTRESR</div>
                  <div className="BonusCard__pool__value poolLabel">35%</div>
                  <div className="BonusCard__pool__value">
                    {formatterUS(veTresrSharePBalance, 0)}%
                  </div>
                  <div className="BonusCard__pool__value">
                    {formatterUS(claimableBonusVeTresrReward)}
                  </div>
                </div>
              </li>
              <li>
                <div className="BonusCard__pool">
                  <div className="BonusCard__pool__label">SMRTR-AVAX-LP</div>
                  <div className="BonusCard__pool__value poolLabel">20%</div>
                  <div className="BonusCard__pool__value">
                    {formatterUS(lpTotalStakedSMRTRAVAXBalance, 0)}%
                  </div>

                  <div className="BonusCard__pool__value">
                    {formatterUS(claimableBonusJlpSmartrReward)}
                  </div>
                </div>
              </li>
              <li>
                <div className="BonusCard__pool">
                  <div className="BonusCard__pool__label">TRESR-AVAX-LP</div>
                  <div className="BonusCard__pool__value poolLabel">20%</div>
                  <div className="BonusCard__pool__value">
                    {formatterUS(lpTotalStakedTRESRAVAXBalance, 0)}%
                  </div>
                  <div className="BonusCard__pool__value">
                    {formatterUS(claimableBonusJlpTresrReward)}
                  </div>
                </div>
              </li>
              <li>
                <div className="BonusCard__pool">
                  <div className="BonusCard__pool__label">Key Level</div>
                  <div className="BonusCard__pool__value poolLabel">25%</div>
                  <div className="BonusCard__pool__value">
                    {formatterUS(keyLevelPBalance, 3)}%
                  </div>
                  <div className="BonusCard__pool__value">
                    {formatterUS(claimableBonusKeyLevelReward)}
                  </div>
                </div>
              </li>
              <li>
                <div className="horizontal__bar"></div>
              </li>
              <li>
                <span className="votingEscrow__info__label">
                  Est. Daily Bonus Rewards
                </span>
                <div className="flex">
                  <span className="votingEscrow__info__value">{40}</span>
                </div>
              </li>
              <li>
                <span className="votingEscrow__info__label">
                  Est. Monthly Bonus Rewards
                </span>
                <div className="flex">
                  <span className="votingEscrow__info__value">{1200}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="BonusCard">
          <div className="totalPoolReward__image">
            <Tooltip title="?" position="bottom">
              <img src={isDark ? infoImg : infoImgDark} alt={""} />
            </Tooltip>
          </div>

          <div className="BonusCard__actions">
            <div className="votingEscrow__actions--title">Bonus Rewards</div>
            <div className="votingEscrow__actions--wrapper">
              <div className="votingEscrow__actions--count">
                {formatterUS(totalRewards)}
              </div>
            </div>
            <div className="votingEscrow__actions--subtitle">
              Available $TRESR to claim
            </div>

            <div className="BonusCard__actions--button">
              <Button
                variant="outlined"
                size="large"
                label="Claim Bonus Rewards"
                onClick={() => onClaimBonus()}
              />
            </div>
          </div>
          <div className="votingEscrow__info rewards__info">
            <ul>
              <li>
                <span className="votingEscrow__info__label">
                  Total Rewards Share
                </span>
                <div className="votingEscrow__info__wrapper">
                  <span className="votingEscrow__info__value">
                    {formatterUS(claimableBonusTotalReward, 3)}%
                  </span>
                </div>
              </li>
              <li>
                <span className="votingEscrow__info__label">
                  Cumulative Key level
                </span>
                <div className="votingEscrow__info__wrapper">
                  <span className="votingEscrow__info__value">
                    {comulativeKeyLevel}
                  </span>
                </div>
              </li>
              <li>
                <div className="horizontal__bar"></div>
              </li>
              <li>
                <div className="BonusCard__pool">
                  <div className="BonusCard__pool__label__mobile">Weight</div>
                  <div className="BonusCard__pool__value__mobile">Share</div>
                  <div className="BonusCard__pool__value__mobile">Daily</div>
                </div>
              </li>
              <li>
                <div className="votingEscrow__info__wrapper__mobile">
                  <span className="votingEscrow__info__label">veTRESR</span>
                  <div className="BonusCard__pool">
                    <div className="BonusCard__pool__label__mobile poolLabel">
                      35%
                    </div>
                    <div className="BonusCard__pool__value__mobile">
                      {formatterUS(veTresrSharePBalance)}%
                    </div>
                    <div className="BonusCard__pool__value__mobile">
                      {formatterUS(claimableBonusVeTresrReward)}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="votingEscrow__info__wrapper__mobile">
                  <span className="votingEscrow__info__label">
                    SMRTR-AVAX-LP
                  </span>
                  <div className="BonusCard__pool">
                    <div className="BonusCard__pool__label__mobile poolLabel">
                      20%
                    </div>
                    <div className="BonusCard__pool__value__mobile">
                      {formatterUS(lpTotalStakedSMRTRAVAXBalance, 0)}%
                    </div>
                    <div className="BonusCard__pool__value__mobile">
                      {formatterUS(claimableBonusJlpSmartrReward)}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="votingEscrow__info__wrapper__mobile">
                  <span className="votingEscrow__info__label">
                    TRESR-AVAX-LP
                  </span>
                  <div className="BonusCard__pool">
                    <div className="BonusCard__pool__label__mobile poolLabel">
                      20%
                    </div>
                    <div className="BonusCard__pool__value__mobile">
                      {formatterUS(lpTotalStakedTRESRAVAXBalance, 0)}%
                    </div>
                    <div className="BonusCard__pool__value__mobile">
                      {formatterUS(claimableBonusJlpTresrReward)}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="votingEscrow__info__wrapper__mobile">
                  <span className="votingEscrow__info__label">Key Level</span>
                  <div className="BonusCard__pool">
                    <div className="BonusCard__pool__label__mobile poolLabel">
                      25%
                    </div>
                    <div className="BonusCard__pool__value__mobile">
                      {formatterUS(keyLevelPBalance, 3)}%
                    </div>
                    <div className="BonusCard__pool__value__mobile">
                      {formatterUS(claimableBonusKeyLevelReward)}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="horizontal__bar"></div>
              </li>
              <li>
                <span className="votingEscrow__info__label">Est. Daily</span>
                <div className="flex">
                  <span className="votingEscrow__info__value">{40}</span>
                </div>
              </li>
              <li>
                <span className="votingEscrow__info__label">Est. Monthly</span>
                <div className="flex">
                  <span className="votingEscrow__info__value">{1200}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BonusCard;
