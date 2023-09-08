import React, { useEffect, useState } from "react";
import "./style.scss";
import CurrencyInput from "../../Inputs/CurrencyInput";
import {
  AVAILABLE_CURRENCY,
  DURATION_DROPDOWN,
} from "../../../../constant/singleNFTPage";
import MarketplaceButton from "../../MarketplaceButton";
import useHandleModal from "../../../../hooks/dom/useHandleModal";
import TimeInput from "../../Inputs/TimeInput";
import moment from "moment";
import { addDays } from "date-fns";
import DurationInput from "../../Inputs/DurationInput";
import useWindowDimensions from "../../../../hooks/useWidowDimensions";
import { useParams } from "react-router-dom";
import {
  CLOUDHEADS_COLLECTION_ADDRESS,
  COMMUNITY_COLLECTION_ADDRESS,
  DOODLEVERSE_COLLECTION_ADDRESS,
  HAPPY_SUN_COLLECTION_ADDRESS,
  JOEPEGS_COLLECTION_ADDRESS,
  MORE_SATOS_COLLECTION_ADDRESS,
  NFKEY_COLLECTION_ADDRESS,
  VIN_TAGE_TAPE_COLLECTION_ADDRESS,
} from "../../../../constant/blockchain";
import { useSelector } from "react-redux";
import { selectAvaxBalance } from "redux/slice/balanceSlice";
import Modal from "storybook/atom/Modal/modal";
import Calendar from "storybook/atom/Calendar/calendar";

const MakeOfferModal = ({
  isOpen,
  onClose,
  currentToken,
  setOfferData,
  onOpenCompleteCheckoutModal,
}) => {
  const avaxBalance = useSelector(selectAvaxBalance);
  const handleCurrencyModal = useHandleModal();
  const handleDurationModal = useHandleModal();
  const handleCalendarModal = useHandleModal();

  const today = new Date();
  const defaultSelected = { from: today, to: addDays(today, 1) };

  const [selectedCurrency, setSelectedCurrency] = useState(
    AVAILABLE_CURRENCY[0]
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [price, setPrice] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(
    DURATION_DROPDOWN[0]
  );
  const [customDuration, setCustomDuration] = useState();
  const [selectedDate, setSelectedDate] = useState(defaultSelected);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState(moment(today).format("hh:mm"));
  const [timesOfDayStart, setTimesOfDayStart] = useState(false);
  const [timesOfDayEnd, setTimesOfDayEnd] = useState(
    !!moment(today).format("hh:mm a")?.includes("pm")
  );
  const [tokenImage, setTokenImage] = useState("");

  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 750;

  const params = useParams();
  const isJoepegsCollection =
    params?.contractAddress === JOEPEGS_COLLECTION_ADDRESS ||
    params?.contractAddress === DOODLEVERSE_COLLECTION_ADDRESS ||
    params?.contractAddress === HAPPY_SUN_COLLECTION_ADDRESS ||
    params?.contractAddress === MORE_SATOS_COLLECTION_ADDRESS ||
    params?.contractAddress === VIN_TAGE_TAPE_COLLECTION_ADDRESS;
  const isCloudheadzCollection =
    params?.contractAddress === CLOUDHEADS_COLLECTION_ADDRESS;
  const isCommunityCollection =
    params?.contractAddress === COMMUNITY_COLLECTION_ADDRESS;
  const isNFKeyCollection =
    params?.contractAddress === NFKEY_COLLECTION_ADDRESS;

  useEffect(() => {
    setTimeStart(moment(today).format("hh:mm"));
    setTimesOfDayStart(!!moment(today).format("hh:mm a")?.includes("pm"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeCurrency = (currency) => {
    setErrorMessage("");
    setSelectedCurrency(currency);
    handleCurrencyModal.close();
  };

  const onChangePrice = (event) => {
    setErrorMessage("");
    if (+event?.target?.value || "0") setPrice(event?.target?.value);
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
    setCustomDuration(moment(date?.to)?.diff(moment(date?.from), "days"));
  };

  const onChangeDuration = (duration) => {
    handleCalendarModal.close();
    setCustomDuration(0);
    setSelectedDuration(duration);
    setSelectedDate({
      from: today,
      to: addDays(today, duration?.value),
    });
    handleDurationModal.close();
    if (duration?.value === 0) handleCalendarModal.open();
  };

  const onChangeTimesOfDayEnd = () => setTimesOfDayEnd(!timesOfDayEnd);

  const onContinue = () => {
    if (+price === 0) return setErrorMessage("Price can not be 0");
    if (!price)
      return setErrorMessage(
        "This field is required and must contain a numeric value"
      );

    onClose();
    onOpenCompleteCheckoutModal();
    setOfferData({
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
    handleCurrencyModal.close();
    handleDurationModal.close();
    handleCalendarModal.close();

    setErrorMessage("");
    setPrice("");
    onClose();
  };

  useEffect(() => {
    if (isJoepegsCollection)
      setTokenImage(
        `https://ipfs.io/${currentToken?.metadata?.image?.split(":")?.join("")}`
      );
    else if (isCloudheadzCollection)
      setTokenImage(currentToken?.metadata?.cached_image);
    else if (isCommunityCollection)
      setTokenImage(
        currentToken?.fileLinkCDN?.length
          ? currentToken?.fileLinkCDN
          : currentToken?.metadata?.image
      );
  }, [params?.contractAddress, currentToken]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onCancel}
      withCrossIcon
      className={`max-h-[530px] px-[20px] py-[40px] ${
        isMobile ? "max-w-[450px]" : "max-w-[775px]"
      }`}
    >
      <p className={"modal__title"}>Make offer</p>

      <div className={"listingTab"}>
        <div className="listingTab__nft">
          {isNFKeyCollection ? (
            <img
              src={currentToken?.spaceThumbnail}
              className={"listingTab__nft--image"}
              alt={""}
            />
          ) : (
            <img src={tokenImage} alt={""} className="listingTab__nft--image" />
          )}
          <p className={"modal__boldText"}>
            NFT#{currentToken?.tokenId || currentToken?.tokenID}
          </p>
          <p className={"listingTab__nft--desc"}>{currentToken?.name}</p>
        </div>

        <div className="listingTab__data checkout__container">
          <div className={"checkout__info"}>
            <div className={"checkout__data"}>
              <p className={"modal__text"}>Offer amount</p>
              <p className={"modal__text"}>
                Balance: {avaxBalance.toFixed(8)} AVAX
              </p>
            </div>
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
            {!!errorMessage && (
              <p className={"makeOffer__error modal__text"}>{errorMessage}</p>
            )}

            <div className="listingTab__startDate">
              {handleDurationModal.isActive && (
                <DurationInput
                  selectedDuration={
                    selectedDuration?.value > 0
                      ? selectedDuration
                      : customDuration
                  }
                  onChangeDuration={onChangeDuration}
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
          </div>

          <div className="listingTab__buttons">
            <MarketplaceButton title={"Cancel"} onClick={onCancel} />
            <MarketplaceButton title={"Continue"} isBlue onClick={onContinue} />
          </div>
        </div>
      </div>

      <div className={"calendarModal"}>
        {handleCalendarModal.isActive && (
          <Calendar
            isOpen={handleCalendarModal.isActive}
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </Modal>
  );
};

export default MakeOfferModal;
