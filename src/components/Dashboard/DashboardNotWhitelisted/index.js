import React, { useRef, useState } from "react";
import "./style.scss";
import arrowWhite from "../../../assets/images/arrow_right_white.svg";
import arrowDark from "../../../assets/images/arrow_right_black.svg";
import useHandleToastAlert from "../../../hooks/alert/useHandleToastAlert";
import { VALIDATE_EMAIL } from "../../../constant/reg";
import AirdropApi from "../../../api/AirdropApi";
import { useNavigate } from "react-router-dom";
import { NFKEY_COLLECTION_ADDRESS } from "../../../constant/blockchain";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const DashboardNotWhitelisted = () => {
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const emailRef = useRef(null);

  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleToastAlert = useHandleToastAlert();

  const onValidateEmail = (event) =>
    setIsEmailValid(VALIDATE_EMAIL.test(event?.target?.value));

  const onSendEmail = async () => {
    if (!isEmailValid) return handleToastAlert.error("Email is not correct");

    new AirdropApi().sendEmail(emailRef?.current?.value);
    handleToastAlert.success("Email sent successfully");
    emailRef.current.value = "";
  };

  // const onNavigateMarketplace = () => navigate('/allNFTs')
  const onNavigateMarketplace = () =>
    navigate(`/collections/${NFKEY_COLLECTION_ADDRESS}`);

  return (
    <div className="dashboard__data__content--form__selectedToken">
      <div className={"dashboard__data__content--form__selectedToken--wrapper"}>
        <video
          src={
            "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/400x400.mp4"
          }
          loop
          autoPlay
        />
      </div>
      <div className="dashboard__data__content--form__selectedToken--info">
        <p className="dashboardNotWhitelisted__title">
          Not on the Whitelist yet?
        </p>
        <p className="dashboardNotWhitelisted__text">
          Enter your email & we'll notify you when we launch to retail.
        </p>

        <div className="dashboardNotWhitelisted__input">
          <input
            type="email"
            placeholder={"Enter your email"}
            ref={emailRef}
            onInput={onValidateEmail}
          />
          <img
            src={isDark ? arrowWhite : arrowDark}
            alt={""}
            width={14}
            height={9}
            onClick={onSendEmail}
          />
        </div>

        <p className="dashboardNotWhitelisted__text">
          You can also
          <span
            className="dashboardNotWhitelisted__link"
            onClick={onNavigateMarketplace}
          >
            visit Marketplace
          </span>
          and buy Founder’s Key from there
        </p>
      </div>
    </div>
  );
};

export default DashboardNotWhitelisted;
