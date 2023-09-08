import React, { useState, useEffect } from "react";
import arrow from "../../../../../assets/images/arrow_right_white.svg";
import arrowBlack from "../../../../../assets/images/arrow_right_black.svg";
import crossWhite from "../../../../../assets/images/cross_keyList_white.svg";
import cross from "../../../../../assets/images/cross_keyList_black.svg";
import useHandleNFT from "../../../../../hooks/blockchain/useHandleNFT";
import { formatterUS } from "../../../../../utils";
import useWindowDimensions from "hooks/useWidowDimensions";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const KeyItem = ({ token, onDeleteItem, onAddItem, index, delI }) => {
  const theme = useSelector(selectTheme);
  const [amountUpgradeKey, setAmountUpgradeKey] = useState(0);
  const handleNFT = useHandleNFT();
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 750;

  useEffect(() => {
    handleNFT
      .getAmountUpgradeKey(+token?.tier)
      .then((res) => setAmountUpgradeKey(res));
  }, [token?.tokenId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (token?.flag)
    return (
      <div className={`upgradeAllKeysModal__list--item `}>
        <div className="upgradeAllKeysModal__wrapper">
          <img
            width={56}
            height={56}
            src={token?.spaceThumbnail}
            alt=""
            className="upgradeAllKeysModal__image"
          />
          <div className="upgradeAllKeysModal__name--wrapper">
            <span className="upgradeAllKeysModal__name">
              Founder’s Key #{token?.tokenId}
            </span>
            <div className="upgradeAllKeysModal__level">
              <span>Level {token?.tier}</span>
              <img width={14} height={9} src={arrow} alt="to" />
              <span>Level {+token?.tier + 1}</span>
            </div>
            {isMobile && (
              <span className="modal__text text-[16px] mt-1 text-[var(--currencyInputLabel)]">
                {formatterUS(amountUpgradeKey)} SMRTR
              </span>
            )}
          </div>
        </div>
        <div className="upgradeAllKeysModal__wrapperRight">
          <img
            src={crossWhite}
            alt={"delete"}
            className="cursor-pointer"
            onClick={() => onDeleteItem(token?.tokenId)}
          />
          {!isMobile && <span>{formatterUS(amountUpgradeKey)} SMRTR</span>}
        </div>
      </div>
    );
  else
    return (
      <div className="upgradeAllKeysModal__list--item">
        <div className="upgradeAllKeysModal__wrapper filter brightness-[0.4]">
          <img
            width={56}
            height={56}
            src={token?.spaceThumbnail}
            alt=""
            className="upgradeAllKeysModal__image"
          />
          <div className="upgradeAllKeysModal__name--wrapper">
            <span className="upgradeAllKeysModal__name">
              Founder’s Key #{token?.tokenId}
            </span>
            <div className="upgradeAllKeysModal__level">
              <span>Level {token?.tier}</span>
              <img width={14} height={9} src={arrow} alt="to" />
              <span>Level {+token?.tier + 1}</span>
            </div>
            {isMobile && (
              <span className=" modal__text text-[16px] mt-1 text-[var(--currencyInputLabel)]">
                {formatterUS(amountUpgradeKey)} SMRTR
              </span>
            )}
          </div>
        </div>
        <div className="upgradeAllKeysModal__wrapperRight">
          <div
            className="cursor-pointer text-gray-400 hover:text-white"
            onClick={() => onAddItem(token?.tokenId)}
          >
            Add
          </div>
          {!isMobile && (
            <span className="filter brightness-[0.4]">
              {formatterUS(amountUpgradeKey)} SMRTR
            </span>
          )}
        </div>
      </div>
    );
};

export default KeyItem;
