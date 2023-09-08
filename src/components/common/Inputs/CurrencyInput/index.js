import React from "react";
import { AVAILABLE_CURRENCY } from "../../../../constant/singleNFTPage";
import arrowImg from "../../../../assets/images/singleNFTPage/arrowLightBlue.svg";
import { useLocation } from "react-router-dom";
import arrowBlackImg from "../../../../assets/images/singleNFTPage/arrowDownBlack.svg";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const CurrencyInput = ({
  price,
  onChangePrice,
  isOpenCurrencyList,
  onOpenCurrencyList,
  onCloseCurrencyList,
  selectedCurrency,
  onChangeCurrency,
  hideCurrencyList = false,
}) => {
  const location = useLocation();
  const theme = useSelector(selectTheme);
  const isCreatePage = location?.pathname?.includes("create");
  const isDark = theme === "dark";

  const showCurrencyList = () => {
    isOpenCurrencyList ? onCloseCurrencyList() : onOpenCurrencyList();
  };

  const handleChangePrice = (event) => {
    if (event?.target?.value < 0) return;
    onChangePrice(event);
  };

  return (
    <div className="listingTab__price">
      <input
        value={price}
        onChange={handleChangePrice}
        placeholder={"0.000"}
        type="number"
        className={`modal__input ${
          isOpenCurrencyList ? "listingTab__input--active" : ""
        } ${isCreatePage ? "modal__input--createPage" : ""}`}
      />

      {!hideCurrencyList && (
        <div
          className={`listingTab__currency ${
            isCreatePage ? "listingTab__currency--createPage" : ""
          }`}
          onClick={showCurrencyList}
        >
          <p>{selectedCurrency?.label}</p>
          <img
            src={isDark ? arrowImg : arrowBlackImg}
            alt={""}
            className={`listingTab__arrow ${
              isOpenCurrencyList ? "listingTab__arrow--open" : ""
            }`}
          />
        </div>
      )}

      {hideCurrencyList && (
        <div
          className={`listingTab__currency ${
            isCreatePage ? "listingTab__currency--createPage" : ""
          }`}
        >
          <p>{selectedCurrency?.label}</p>
        </div>
      )}

      <div
        className={`listingTab__currencyList ${
          isOpenCurrencyList ? "listingTab__currencyList--open" : ""
        } ${isCreatePage ? "listingTab__currencyList--createPage" : ""}`}
      >
        {AVAILABLE_CURRENCY.map((currency, key) => (
          <p
            onClick={() => onChangeCurrency(currency)}
            key={key}
            className={`${
              currency?.value === selectedCurrency?.value
                ? "listingTab__currencyList--active"
                : ""
            }`}
          >
            {currency?.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CurrencyInput;
