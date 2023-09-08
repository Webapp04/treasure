import React, { useState, useEffect } from "react";
import arrowWhiteImg from "../../../../../../assets/images/singleNFTPage/arrowDownWhite.svg";
import arrowBlackImg from "../../../../../../assets/images/singleNFTPage/arrowDownBlack.svg";
import TimeInput from "../../../../Inputs/TimeInput";
import DurationInput from "../../../../Inputs/DurationInput";
import CurrencyInput from "../../../../Inputs/CurrencyInput";
import MarketplaceButton from "../../../../MarketplaceButton";
import { addDays } from "date-fns";
import useHandleModal from "../../../../../../hooks/dom/useHandleModal";
import moment from "moment";
import {
  AVAILABLE_CURRENCY,
  DURATION_DROPDOWN,
} from "../../../../../../constant/singleNFTPage";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";
import Calendar from "storybook/atom/Calendar/calendar";

const ListingForm = ({
  onClose,
  onOpenCheckoutModal,
  setSellData,
  withButtons,
}) => {
  const location = useLocation();
  const theme = useSelector(selectTheme);
  const isCreatePage = location?.pathname?.includes("create");
  const isDark = theme === "dark";

  const today = new Date();
  const defaultSelected = {
    from: today,
    to: addDays(today, 7),
  };

  const handleDurationModal = useHandleModal();
  const handleCurrencyModal = useHandleModal();
  const handleCalendarModal = useHandleModal();

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
  const [price, setPrice] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const onChangeCurrency = (currency) => {
    setSelectedCurrency(currency);
    handleCurrencyModal.close();
  };

  const onChangePrice = (event) => {
    setErrorMessage("");
    if (+event?.target?.value || "0") setPrice(event?.target?.value);
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
    if (+price === 0) return setErrorMessage("Price can not be 0");
    if (!price)
      return setErrorMessage(
        "This field is required and must contain a numeric value"
      );

    onClose();
    onOpenCheckoutModal();
    setSellData({
      selectedDate,
      price,
      selectedCurrency,
      selectedTime: {
        timeStart: `${timeStart} ${timesOfDayStart ? "pm" : "am"}`,
        timeEnd: `${timeEnd} ${timesOfDayEnd ? "pm" : "am"}`,
      },
    });
  };

  const onCancel = () => {
    setErrorMessage("");
    onClose();
  };

  useEffect(() => {
    setSellData({
      selectedDate,
      price,
      selectedCurrency,
      selectedTime: {
        timeStart: `${timeStart} ${timesOfDayStart ? "pm" : "am"}`,
        timeEnd: `${timeEnd} ${timesOfDayEnd ? "pm" : "am"}`,
      },
    });
  }, [
    selectedDate,
    price,
    selectedCurrency,
    timeStart,
    timesOfDayStart,
    timeEnd,
    timesOfDayEnd,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="listingTab__data">
      <div className="listingTab__startDate">
        <div className={"listingTab__startDate--input"}>
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
            className={`listingTab__startDate--arrow ${
              handleCalendarModal.isActive ? "listingTab__startDate--open" : ""
            }`}
          />

          {handleCalendarModal.isActive && (
            <Calendar
              isOpen={handleCalendarModal.isActive}
              handleDateChange={handleDateChange}
              selectedDate={selectedDate}
            />
          )}
        </div>
        <TimeInput
          onChangeTime={onChangeTimeStart}
          onChangeTimesOfDay={onChangeTimesOfDayStart}
          timesOfDay={timesOfDayStart}
          timeValue={timeStart}
        />
      </div>

      <div className={"listingTab__startDate"}>
        {handleDurationModal.isActive && (
          <DurationInput
            onChangeDuration={onChangeDuration}
            selectedDuration={selectedDuration}
            isOpen={handleDurationModal.isActive}
            onClose={handleDurationModal.close}
            onOpen={handleDurationModal.open}
            handleCalendarClose={handleCalendarModal.close}
          />
        )}

        <TimeInput
          onChangeTime={onChangeTimeEnd}
          onChangeTimesOfDay={onChangeTimesOfDayEnd}
          timesOfDay={timesOfDayEnd}
          timeValue={selectedDate?.to && timeEnd}
        />
      </div>

      <p
        className={`modal__text ${
          isCreatePage ? "modal__text--createPage" : ""
        }`}
      >
        Price
      </p>

      <div className="listingTab__price--wrapper">
        {handleCurrencyModal.isActive && (
          <CurrencyInput
            isOpenCurrencyList={handleCurrencyModal.isActive}
            onOpenCurrencyList={handleCurrencyModal.open}
            onCloseCurrencyList={handleCurrencyModal.close}
            onChangeCurrency={onChangeCurrency}
            selectedCurrency={selectedCurrency}
            price={price}
            onChangePrice={onChangePrice}
          />
        )}
        <p className={"listingTab__price--error modal__text"}>{errorMessage}</p>
      </div>

      {withButtons && (
        <div className={"listingTab__buttons"}>
          <MarketplaceButton title={"Cancel"} onClick={onCancel} />
          <MarketplaceButton title={"Apply"} isBlue onClick={onContinue} />
        </div>
      )}
    </div>
  );
};

export default ListingForm;
