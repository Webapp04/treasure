import React, { useState, useEffect } from "react";
import useHandleModal from "../../../../../../hooks/dom/useHandleModal";
import { addDays } from "date-fns";
import moment from "moment";
import {
  AVAILABLE_CURRENCY,
  DURATION_DROPDOWN,
} from "../../../../../../constant/singleNFTPage";
import { DayPicker } from "react-day-picker";
import arrowWhiteImg from "../../../../../../assets/images/singleNFTPage/arrowDownWhite.svg";
import MarketplaceButton from "../../../../MarketplaceButton";
import CurrencyInput from "../../../../Inputs/CurrencyInput";
import { useLocation } from "react-router-dom";
import arrowBlackImg from "../../../../../../assets/images/singleNFTPage/arrowDownBlack.svg";
import DurationInput from "../../../../Inputs/DurationInput";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const AuctionForm = ({
  onClose,
  onOpenCheckoutModal,
  setAuctionData,
  withButtons,
}) => {
  const location = useLocation();
  const theme = useSelector(selectTheme);
  const isCreatePage = location?.pathname?.includes("create");
  const isDark = theme === "dark";
  const handleCurrencyModal = useHandleModal();
  const handleDurationModal = useHandleModal();
  const handleCalendarModal = useHandleModal();

  const today = new Date();
  const defaultSelected = {
    from: today,
    to: addDays(today, 7),
  };

  const [selectedDuration, setSelectedDuration] = useState();
  const [selectedDate, setSelectedDate] = useState(defaultSelected);

  const [timeStart, setTimeStart] = useState(moment(today).format("hh:mm"));
  const [timeEnd, setTimeEnd] = useState(
    moment(selectedDate?.to).format("hh:mm")
  );

  const [timesOfDayStart, setTimesOfDayStart] = useState(
    !!moment(today).format("hh:mm a")?.includes("pm")
  );
  const [timesOfDayEnd, setTimesOfDayEnd] = useState(
    !!moment(today).format("hh:mm a")?.includes("pm")
  );

  const [selectedCurrency, setSelectedCurrency] = useState(
    AVAILABLE_CURRENCY[0]
  );
  const [isOpenCurrencyList, setIsOpenCurrencyList] = useState(false);
  const [price, setPrice] = useState("");
  const [priceStep, setPriceStep] = useState("");

  const showCurrencyList = () => setIsOpenCurrencyList(!isOpenCurrencyList);

  const onChangeCurrency = (currency) => {
    setSelectedCurrency(currency);
    setIsOpenCurrencyList(false);
  };

  const onChangePrice = (event) => {
    if (+event?.target?.value || "0") setPrice(event?.target?.value);
  };

  const onChangePriceStep = (event) => {
    if (+event?.target?.value || "0") setPriceStep(event?.target?.value);
  };

  const onChangeTimesOfDayStart = () => setTimesOfDayStart(!timesOfDayStart);
  const onChangeTimesOfDayEnd = () => setTimesOfDayEnd(!timesOfDayEnd);

  const onChangeTimeStart = (event) => {
    if (+event?.target?.value?.split(":")?.join("") > 1259) return;
    setTimeStart(event?.target?.value);
  };

  const onChangeTimeEnd = (event) => {
    if (+event?.target?.value?.split(":")?.join("") > 1259) return;
    setTimeEnd(event?.target?.value);
  };

  const handleDateChange = (date) => {
    if (
      !moment(today.setHours(0, 0, 0, 0)).isSame(date?.from) &&
      moment(date?.from).isBefore(today.setHours(0, 0, 0, 0))
    )
      return;
    setSelectedDate(date);
    setSelectedDuration(DURATION_DROPDOWN.find((item) => item?.value === 0));
  };

  const onChangeDuration = (duration) => {
    setSelectedDuration(duration);
    setSelectedDate({
      from: today,
      to: addDays(today, duration?.value),
    });
    handleDurationModal.close();
    if (duration?.value === 0) handleCalendarModal.open();
  };

  const showCalendar = () => {
    handleCalendarModal.isActive
      ? handleCalendarModal.close()
      : handleCalendarModal.open();
    handleDurationModal.close();
  };

  const formatDate = () => {
    let startDate;
    let endDate;
    if (selectedDate?.to) {
      startDate = moment(selectedDate?.from).format("D MMM");
      endDate = moment(selectedDate?.to).format("D MMM YY");
      return `${startDate} - ${endDate}`;
    } else return moment(selectedDate?.from).format("D MMM YY");
  };

  const onContinue = () => {
    onClose();
    onOpenCheckoutModal();
    setAuctionData({
      selectedDate,
      price,
      priceStep,
      selectedCurrency,
      selectedTime: {
        timeStart: `${timeStart} ${timesOfDayStart ? "pm" : "am"}`,
        timeEnd: `${timeEnd} ${timesOfDayEnd ? "pm" : "am"}`,
      },
    });
  };

  useEffect(() => {
    setAuctionData({
      selectedDate,
      price,
      priceStep,
      selectedCurrency,
      selectedTime: {
        timeStart: `${timeStart} ${timesOfDayStart ? "pm" : "am"}`,
        timeEnd: `${timeEnd} ${timesOfDayEnd ? "pm" : "am"}`,
      },
    });
  }, [
    selectedDate,
    price,
    priceStep,
    selectedCurrency,
    timeStart,
    timesOfDayStart,
    timeEnd,
    timesOfDayEnd,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={"auctionTab__data"}>
      <div className={"auctionTab__startDate"}>
        <div className={"auctionTab__startDate--input"}>
          <input
            placeholder={"Start date"}
            value={formatDate()}
            type={"text"}
            className={`modal__input ${
              isCreatePage ? "modal__input--createPage" : ""
            }`}
            onClick={showCalendar}
          />
          <img
            src={isDark ? arrowWhiteImg : arrowBlackImg}
            alt={""}
            onClick={showCalendar}
            className={`auctionTab__startDate--arrow ${
              handleCalendarModal.isActive ? "auctionTab__startDate--open" : ""
            }`}
          />

          {handleCalendarModal.isActive && (
            <div className="listingTab__datePicker">
              <DayPicker
                initialFocus={handleCalendarModal.isActive}
                mode="range"
                defaultMonth={today}
                selected={selectedDate}
                onSelect={handleDateChange}
              />
            </div>
          )}
        </div>
        <div className={"auctionTab__startDate--time"}>
          <input
            placeholder={"00:00 pm"}
            type="time"
            className={`modal__input ${
              isCreatePage ? "modal__input--createPage" : ""
            }`}
            value={timeStart}
            onChange={onChangeTimeStart}
          />
          <p
            className={`listingTab__startDate--timeOfDay listingTab__startDate--timeOfDay__createPage`}
            onClick={onChangeTimesOfDayStart}
          >
            {timesOfDayStart ? "pm" : "am"}
          </p>
        </div>
      </div>

      <div className={"auctionTab__startDate"}>
        {handleDurationModal.isActive && (
          <DurationInput
            isOpen={handleDurationModal.isActive}
            onClose={handleDurationModal.close}
            onOpen={handleDurationModal.open}
            handleCalendarClose={handleCalendarModal.close}
            onChangeDuration={onChangeDuration}
            selectedDuration={selectedDuration}
          />
        )}

        <div className="auctionTab__startDate--time">
          <input
            placeholder={"00:00"}
            type="time"
            className={`modal__input ${
              isCreatePage ? "modal__input--createPage" : ""
            }`}
            value={selectedDate?.to && timeEnd}
            onChange={onChangeTimeEnd}
          />
          <p
            className={`listingTab__startDate--timeOfDay listingTab__startDate--timeOfDay__createPage`}
            onClick={onChangeTimesOfDayEnd}
          >
            {timesOfDayEnd ? "pm" : "am"}
          </p>
        </div>
      </div>

      <p
        className={`modal__text ${
          isCreatePage ? "modal__text--createPage" : ""
        }`}
      >
        Minimum bid
      </p>

      {handleCurrencyModal.isActive && (
        <div className={"auctionTab__price--wrapper"}>
          <CurrencyInput
            className={"auctionTab__price--wrapppricectedCurrency"}
            onChangeCurrency={onChangeCurrency}
            selectedCurrency={selectedCurrency}
            isOpenCurrencyList={handleCurrencyModal.isActive}
            onOpenCurrencyList={handleCurrencyModal.open}
            onCloseCurrencyList={handleCurrencyModal.close}
            showCurrencyList={showCurrencyList}
            price={price}
            onChangePrice={onChangePrice}
          />
        </div>
      )}

      <p
        className={`modal__text ${
          isCreatePage ? "modal__text--createPage" : ""
        }`}
      >
        Price step
      </p>

      <div className={"auctionTab__price--wrapper"}>
        <CurrencyInput
          className={"auctionTab__price--wrapppricectedCurrency"}
          selectedCurrency={selectedCurrency}
          price={priceStep}
          hideCurrencyList={true}
          onChangePrice={onChangePriceStep}
        />
      </div>

      {withButtons && (
        <div className="auctionTab__buttons">
          <MarketplaceButton title={"Cancel"} onClick={onClose} />
          <MarketplaceButton
            title={"Apply"}
            isBlue
            onClick={onContinue}
            disabled={!(Number(priceStep) > 0 && Number(price) > 0)}
          />
        </div>
      )}
    </div>
  );
};

export default AuctionForm;
