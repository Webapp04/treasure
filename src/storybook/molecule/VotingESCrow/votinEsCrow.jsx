import React from "react";
import "./style.scss";
import Button from "storybook/atom/Button/button";
import { formatterUS } from "utils";
import Loader from "storybook/atom/Loader/loader";

const VotingEsCrow = ({
  flag,
  isDark,
  onClickStake,
  onClickUnStake,
  stakedAll,
  tresrBalance,
  tresrStakedAllBalance,
  balanceEstDailyVeTRESR,
}) => {
  return (
    <div className="votingEscrow__wrapper">
      <div className="votingEscrow__actions">
        <div className="votingEscrow__actions--title">Earn Voting Escrow</div>
        <div className="votingEscrow__actions--wrapper">
          <div className="votingEscrow__actions--count">{stakedAll}</div>
          {flag && (
            <div className="votingEscrow__actions--loader">
              <Loader
                size="extraSmall"
                variant={isDark ? "primary" : "secondary"}
              />
            </div>
          )}
        </div>
        <div className="votingEscrow__actions--subtitle">
          Total $TRESR staked
        </div>

        <div className="votingEscrow__actions--buttons">
          <Button label="Stake TRESR" onClick={onClickStake} />
          <Button
            variant="secondary"
            label="Unstake TRESR"
            onClick={onClickUnStake}
          />
        </div>
      </div>
      <div className="votingEscrow__info">
        <ul>
          <li>
            <span className="votingEscrow__info__label">Avavilable $TRESR</span>
            <div className="votingEscrow__info__wrapper">
              <span className="votingEscrow__info__value">
                {formatterUS(tresrBalance)}
              </span>
              {flag && (
                <div className="votingEscrow__actions--loader">
                  <Loader
                    size="extraSmall"
                    variant={isDark ? "primary" : "secondary"}
                  />
                </div>
              )}
            </div>
          </li>
          <li>
            <span className="votingEscrow__info__label">
              Est. Daily veTRESR
            </span>
            <div className="votingEscrow__info__wrapper">
              <span className="votingEscrow__info__value">
                {balanceEstDailyVeTRESR}
              </span>
              {flag && (
                <div className="votingEscrow__actions--loader">
                  <Loader
                    size="extraSmall"
                    variant={isDark ? "primary" : "secondary"}
                  />
                </div>
              )}
            </div>
          </li>
          <li>
            <div className="horizontal__bar"></div>
          </li>
          <li>
            <span className="votingEscrow__info__label">Community Staked</span>
            <div className="votingEscrow__info__wrapper">
              <span className="votingEscrow__info__value">
                {formatterUS(tresrStakedAllBalance)}
              </span>
              {flag && (
                <div className="votingEscrow__actions--loader">
                  <Loader
                    size="extraSmall"
                    variant={isDark ? "primary" : "secondary"}
                  />
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VotingEsCrow;
