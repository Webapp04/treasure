import React from "react";
import "./style.scss";
import heartImg from "../../atom/Icon/svg/heart_transparent.svg";
import heartImgColored from "../../atom/Icon/svg/heart_home.svg";
import plus from "../../atom/Icon/svg/plus.svg";
import plusDark from "../../atom/Icon/svg/plus_blue.svg";
import minus from "../../atom/Icon/svg/minus.svg";
import minusDark from "../../atom/Icon/svg/minus_blue.svg";

const ZoneItem = ({
  title,
  price,
  amount,
  setAmount,
  onChecked,
  isDark,
  withInput,
  isDisabled,
  isMobile,
}) => {
  const onIncrease = () => {
    if (isDisabled) return;
    setAmount(amount + 1);
  };

  const onDecrease = () => {
    if (isDisabled) return;
    if (amount <= 1) return;

    setAmount(amount - 1);
  };

  return (
    <div>
      <div className="zoneItem">
        <div className="zoneItem__nameWrapper" onClick={onChecked}>
          <img
            src={isDisabled ? heartImg : heartImgColored}
            alt={""}
            className="zoneItem__heart"
          />
          <p
            className={`zoneItem__name ${
              isDisabled && "zoneItem__name--disabled"
            }`}
          >
            {title}
          </p>
          {!!(isMobile && !withInput) && (
            <p
              className={`zoneItem__key ${
                isDisabled && "zoneItem__key--disabled"
              }`}
            >
              1 Key
            </p>
          )}
        </div>

        <div className="zoneItem__priceWrapper">
          {!isMobile && (
            <>
              {withInput ? (
                <button className="zoneItem__button" disabled={isDisabled}>
                  <div onClick={onDecrease}>
                    <img src={isDark ? minus : minusDark} alt={""} />
                  </div>
                  <span>{amount}</span>
                  <div onClick={onIncrease}>
                    <img src={isDark ? plus : plusDark} alt={""} />
                  </div>
                </button>
              ) : (
                <p
                  className={`zoneItem__key ${
                    isDisabled && "zoneItem__key--disabled"
                  }`}
                >
                  1 Key
                </p>
              )}
            </>
          )}
          <p className="zoneItem__price">{price}</p>
        </div>
      </div>

      {!!(isMobile && withInput) && (
        <button className="zoneItem__button" disabled={isDisabled}>
          <div onClick={onDecrease}>
            <img src={isDark ? minus : minusDark} alt={""} />
          </div>
          <span>{amount}</span>
          <div onClick={onIncrease}>
            <img src={isDark ? plus : plusDark} alt={""} />
          </div>
        </button>
      )}
    </div>
  );
};

export default ZoneItem;
