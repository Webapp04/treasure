import React from "react";
import "./style.scss";
import infoImg from "../../atom/Icon/svg/info_img.svg";
import infoImgDark from "../../atom/Icon/svg/info_img_dark.svg";
import nfKeyLogo from "../../atom/Icon/svg/NFTreasure_Brand.svg";
import avaxImg from "../../atom/Icon/svg/avax_blue_img.svg";
import smrtrImg from "../../atom/Icon/svg/smrtr_img.svg";
import Button from "storybook/atom/Button/button";
import Tooltip from "storybook/atom/Tooltip/tooltip";

const BonusRewardCard = ({
  isTRESR,
  isDark,
  balanceLPStaked,
  onClickStake,
  onClickUnStake,
  balanceLP,
  poolShareCalc,
  communityLPStaked,
}) => {
  const poolLinkTRESR =
    "https://traderjoexyz.com/avalanche/pool/v1/0x6d923f688c7ff287dc3a5943caeefc994f97b290/AVAX";
  const poolLinkSMRTR =
    "https://traderjoexyz.com/avalanche/pool/v1/0x6d923f688c7ff287dc3a5943caeefc994f97b290/AVAX";
  const analyticsLinkTRESR =
    "https://analytics.traderjoexyz.com/pairs/0x7b7617c7b2236d7871741783cae8bcc222c2e05d";
  const analyticsLinkSMRTR =
    "https://analytics.traderjoexyz.com/pairs/0x7b7617c7b2236d7871741783cae8bcc222c2e05d";

  const poolLink = isTRESR ? poolLinkTRESR : poolLinkSMRTR;
  const analyticsLink = isTRESR ? analyticsLinkTRESR : analyticsLinkSMRTR;

  return (
    <div className="DashboardTresrSmartrAvaxStaking">
      <div className="totalPoolReward__image">
        <Tooltip
          title={`Stake ${
            isTRESR ? "$TRESR" : "$SMRTR"
          } - AVAX - LP liquidity pool tokens to increase rewards.`}
          position="left"
        >
          <img src={isDark ? infoImg : infoImgDark} alt={""} />
        </Tooltip>
      </div>
      <div className="DashboardTresrSmartrAvaxStaking__currency">
        <img src={isTRESR ? nfKeyLogo : smrtrImg} alt="" />
        {isTRESR ? "TRESR" : "SMRTR"} /<img src={avaxImg} alt="" />
        AVAX
      </div>
      <div className="DashboardTresrSmartrAvaxStaking__amount">
        {balanceLPStaked}
      </div>
      <div className="DashboardTresrSmartrAvaxStaking__text">
        LP tokens staked
      </div>
      <div className="DashboardTresrSmartrAvaxStaking__buttons">
        <Button
          label={`Stake ${isTRESR ? "TRESR" : "SMRTR"}-AVAX-LP`}
          size="large"
          onClick={onClickStake}
        />
        <Button
          label={`Unstake ${isTRESR ? "TRESR" : "SMRTR"}-AVAX-LP`}
          onClick={onClickUnStake}
          variant="secondary"
          size="large"
        />
      </div>
      <div className="DashboardTresrSmartrAvaxStaking__info">
        <div>
          <span className="DashboardTresrSmartrAvaxStaking__info--title">
            TVL
          </span>
          <span className="DashboardTresrSmartrAvaxStaking__info--value">
            $147K
          </span>
        </div>
        <div>
          <span className="DashboardTresrSmartrAvaxStaking__info--title">
            Avavilable LP
          </span>
          <span className="DashboardTresrSmartrAvaxStaking__info--value">
            {balanceLP}
          </span>
        </div>
        <div className="horizontal__bar"></div>
        <div>
          <span className="DashboardTresrSmartrAvaxStaking__info--title">
            {isTRESR ? "% Bonus Pool from LP" : "% Bonus Pool from LP"}
          </span>
          <span className="DashboardTresrSmartrAvaxStaking__info--value">
            {poolShareCalc}%
          </span>
        </div>
        <div>
          <span className="DashboardTresrSmartrAvaxStaking__info--title">
            Community Staked
          </span>
          <span className="DashboardTresrSmartrAvaxStaking__info--value">
            {communityLPStaked}
          </span>
        </div>
      </div>

      <div className="DashboardTresrSmartrAvaxStaking__actions">
        <a href={poolLink} target="_blank" rel="noreferrer">
          <span>Add Liquidity</span>
        </a>
        <a href={analyticsLink} target="_blank" rel="noreferrer">
          <span>Visit Pool Analytics</span>
        </a>
      </div>
    </div>
  );
};

export default BonusRewardCard;
