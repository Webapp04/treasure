import React, { useState } from "react";
import "./style.scss";
import refreshIcon from "../../atom/Icon/svg/refresh.svg";
import infoImg from "../../atom/Icon/svg/info_img.svg";
import infoImgDark from "../../atom/Icon/svg/info_img_dark.svg";
import { useNavigate } from "react-router-dom";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import { formatterUS } from "utils";
import Loader from "storybook/atom/Loader/loader";
import Button from "storybook/atom/Button/button";
import KeyRewards from "../KeyReward/keyReward";

const TotalPoolReward = ({
  isOpen = true,
  isDark = true,
  flag = true,
  onToggleDetails = () => {},
  balanceAll = 0,
  ownTokenRewardList = [],
  balanceBonusAll = 0,
  onClickClaimAllRewards = () => {},
}) => {
  const navigate = useNavigate();

  return (
    <div className={`totalPoolReward ${isOpen ? "totalPoolReward__open" : ""}`}>
      <div className="totalPoolReward__image">
        <Tooltip
          title="Total Pool Rewards combines all Founder’s Keys Rewards and Bonus Pool Rewards"
          position="left"
        >
          <img src={isDark ? infoImg : infoImgDark} alt={""} />
        </Tooltip>
      </div>
      <div className="refresh__wrapper" onClick={() => navigate(0)}>
        <Tooltip title="Force Update">
          <img src={refreshIcon} alt="" />
        </Tooltip>
      </div>
      <div className="totalPoolReward__info">
        <div className="totalPoolReward__info--title">Total Rewards</div>
        <div className="totalPoolReward__info--wrapper">
          <div
            className="totalPoolReward__info--count"
            onClick={onToggleDetails}
          >
            {formatterUS(balanceAll)}
            <div
              className={`totalPoolReward__info--arrow ${
                isOpen ? "totalPoolReward__info--arrow__open" : ""
              }`}
            />
          </div>
          <div className="totalPoolReward__info--loader">
            {flag && (
              <Loader
                size="extraSmall"
                variant={isDark ? "primary" : "secondary"}
              />
            )}
          </div>
        </div>
        <div
          className={`totalPoolReward__details ${
            isOpen ? "totalPoolReward__details--open" : ""
          }`}
        >
          {!!ownTokenRewardList?.length &&
            ownTokenRewardList?.map((item, key) => (
              <KeyRewards token={item} key={key} />
            ))}
          {
            <div className="totalPoolReward__details--block">
              <span className="totalPoolReward__details--text">
                Bonus Rewards
              </span>
              <span className="totalPoolReward__details--value">
                {formatterUS(balanceBonusAll)}
              </span>
            </div>
          }
        </div>
        <div className="totalPoolReward__info--subtitle">
          Available $TRESR to claim
        </div>
      </div>
      <div className="totalPoolReward__actions">
        <Button
          size="large"
          onClick={onClickClaimAllRewards}
          label="Claim All Rewards"
        />
      </div>
    </div>
  );
};

export default TotalPoolReward;
