import React from "react";
import "./style.scss";
import PrintCard from "./PrintCard";
import { PRINT_CARDS, PRINT_CARDS_MOBILE } from "../../../constant/home";
import arrow1 from "../../../assets/images/arrow1.svg";
import arrow1Light from "../../../assets/images/arrow1_light.svg";
import arrow2 from "../../../assets/images/arrow2.svg";
import arrow2Light from "../../../assets/images/arrow2_light.svg";
import arrow3 from "../../../assets/images/arrow3.svg";
import arrow3Light from "../../../assets/images/arrow3_light.svg";
import arrow4 from "../../../assets/images/arrow4.svg";
import arrow4Light from "../../../assets/images/arrow4_light.svg";
import arrow1Mobile from "../../../assets/images/arrow1Mobile.svg";
import arrow1LightMobile from "../../../assets/images/arrow1LightMobile.svg";
import arrow2Mobile from "../../../assets/images/arrow2Mobile.svg";
import arrow2LightMobile from "../../../assets/images/arrow1LightMobile.svg";
import arrow3Mobile from "../../../assets/images/arrow3Mobile.svg";
import arrow3LightMobile from "../../../assets/images/arrow1LightMobile.svg";
import arrow4Mobile from "../../../assets/images/arrow4Mobile.svg";
import arrow4LightMobile from "../../../assets/images/arrow1LightMobile.svg";
import useWindowDimensions from "hooks/useWidowDimensions";
import cn from "classnames";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const HomePrintOnDemand = () => {
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";
  const windowDimensions = useWindowDimensions();
  const isMobile = windowDimensions?.width <= 1000;

  return (
    <div className="homePrintOnDemand">
      <p className="homePrintOnDemand__title">
        Print on Demand
        <span className="homePrintOnDemand__title--badge">Soon</span>
      </p>
      <p className="homePrintOnDemand__subtitle">
        5 easy steps to turn your NFT art into physical products
      </p>

      <div className="homePrintOnDemand__cards">
        <div className="homePrintOnDemand__list">
          {!isMobile &&
            PRINT_CARDS?.slice(0, 3).map((item, key) => (
              <PrintCard
                key={key}
                text={item.text}
                title={item.title}
                id={item?.id}
              />
            ))}
          {isMobile &&
            PRINT_CARDS_MOBILE?.map((item, key) => (
              <div
                className={cn(
                  key % 2 == 0
                    ? "homePrintOnDemand__even"
                    : "homePrintOnDemand__odd"
                )}
              >
                <PrintCard
                  className={isMobile ? "width: 245px" : ""}
                  key={key}
                  text={item.text}
                  title={item.title}
                  id={item?.id}
                />
              </div>
            ))}
        </div>
        <div className="homePrintOnDemand__list2">
          {!isMobile &&
            PRINT_CARDS?.slice(3, 5).map((item, key) => (
              <PrintCard key={key} text={item.text} title={item.title} />
            ))}
        </div>

        <img
          src={
            !isDark
              ? !isMobile
                ? arrow1Light
                : arrow1LightMobile
              : !isMobile
              ? arrow1
              : arrow1Mobile
          }
          alt={""}
          className={cn(
            !isMobile
              ? "homePrintOnDemand__arrow1"
              : "homePrintOnDemand__arrow1Mobile"
          )}
        />
        <img
          src={
            !isDark
              ? !isMobile
                ? arrow2Light
                : arrow2LightMobile
              : !isMobile
              ? arrow2
              : arrow2Mobile
          }
          alt={""}
          className={cn(
            !isMobile
              ? "homePrintOnDemand__arrow2"
              : "homePrintOnDemand__arrow2Mobile"
          )}
        />
        <img
          src={
            !isDark
              ? !isMobile
                ? arrow3Light
                : arrow3LightMobile
              : !isMobile
              ? arrow3
              : arrow3Mobile
          }
          alt={""}
          className={cn(
            !isMobile
              ? "homePrintOnDemand__arrow3"
              : "homePrintOnDemand__arrow3Mobile"
          )}
        />
        <img
          src={
            !isDark
              ? !isMobile
                ? arrow4Light
                : arrow4LightMobile
              : !isMobile
              ? arrow4
              : arrow4Mobile
          }
          alt={""}
          className={cn(
            !isMobile
              ? "homePrintOnDemand__arrow4"
              : "homePrintOnDemand__arrow4Mobile"
          )}
        />
      </div>
    </div>
  );
};

export default HomePrintOnDemand;
