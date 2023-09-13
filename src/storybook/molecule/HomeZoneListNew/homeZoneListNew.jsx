import React from "react";
import "./style.scss";
import useWindowDimensions from "hooks/useWidowDimensions";
import homeArrow from "../../atom/Icon/svg/home_arrow.svg";
import homeArrowMobile from "../../atom/Icon/svg/home_arrow_mobile.svg";
import homeArrowDark from "../../atom/Icon/svg/home_arrow_blue.svg";
import homeArrowDarkMobile from "../../atom/Icon/svg/home_arrow_mobile.svg";
import ZoneItem from "../ZoneItem/zoneItem";
import Button from "storybook/atom/Button/button";

const HomeZoneListNew = ({
  isDark,
  isZone1,
  isZone2,
  isZone3,
  isZone4,
  zoneChecked,
  setZoneChecked,
  zoneAmount,
  setZoneAmount,
  zone2Commission,
  zone3Commission,
  zone4Commission,
  zone5Commission,
  zoneSumAmount,
  zoneSumCommission,
  handleMintConfirmationModal,
}) => {
  const windowDimensions = useWindowDimensions();
  const isMobile = windowDimensions?.width <= 800;
  const MAX_TOKEN_PER_MINT = 40;

  return (
    <>
      {!!(isZone1 || isZone2 || isZone3 || isZone4) ? (
        <div className="homeZoneListNew__topText">
          {isMobile ? (
            <img
              alt={""}
              src={isDark ? homeArrowMobile : homeArrowDarkMobile}
            />
          ) : (
            <img alt={""} src={isDark ? homeArrow : homeArrowDark} />
          )}
          <p>Click Diamond Below to Mint.</p>
        </div>
      ) : (
        <div className="homeZoneListNew__topText homeZoneListNew__topText__position">
          {isMobile ? (
            <img
              alt={""}
              src={isDark ? homeArrowMobile : homeArrowDarkMobile}
            />
          ) : (
            <img alt={""} src={isDark ? homeArrow : homeArrowDark} />
          )}
          <p>Click Diamond Below to Mint.</p>
        </div>
      )}
      <div className="homeZoneListNew__list">
        {isZone1 && (
          <ZoneItem
            isDark={isDark}
            isMobile={isMobile}
            title="Diamond Hand"
            isDisabled={!zoneChecked?.[0]}
            amount={zoneAmount?.[0]}
            onChecked={() =>
              setZoneChecked(
                zoneChecked?.map((item, key) =>
                  key === 0 ? !zoneChecked?.[0] : item
                )
              )
            }
            setAmount={(value) =>
              +value <= MAX_TOKEN_PER_MINT &&
              setZoneAmount(
                zoneAmount?.map((item, key) => (key === 0 ? value : item))
              )
            }
            price="Free Mint"
          />
        )}
        {isZone2 && (
          <ZoneItem
            isDark={isDark}
            isMobile={isMobile}
            title="Dragon Hand"
            isDisabled={!zoneChecked?.[1]}
            amount={zoneAmount?.[1]}
            onChecked={() =>
              setZoneChecked(
                zoneChecked?.map((item, key) =>
                  key === 1 ? !zoneChecked?.[1] : item
                )
              )
            }
            setAmount={(value) =>
              +value <= MAX_TOKEN_PER_MINT &&
              setZoneAmount(
                zoneAmount?.map((item, key) => (key === 1 ? value : item))
              )
            }
            price={`${+(zoneAmount?.[1] * zone2Commission).toFixed(2)} AVAX`}
          />
        )}
        {isZone3 && (
          <ZoneItem
            isDark={isDark}
            isMobile={isMobile}
            title="Emerald"
            isDisabled={!zoneChecked?.[2]}
            withInput
            amount={zoneAmount?.[2]}
            onChecked={() =>
              setZoneChecked(
                zoneChecked?.map((item, key) =>
                  key === 2 ? !zoneChecked[2] : item
                )
              )
            }
            setAmount={(value) =>
              +value <= MAX_TOKEN_PER_MINT &&
              setZoneAmount(
                zoneAmount?.map((item, key) => (key === 2 ? value : item))
              )
            }
            price={`${+(zoneAmount?.[2] * zone3Commission).toFixed(2)} AVAX`}
          />
        )}
        {isZone4 && (
          <ZoneItem
            isDark={isDark}
            isMobile={isMobile}
            title="Sapphire"
            isDisabled={!zoneChecked?.[3]}
            withInput
            amount={zoneAmount?.[3]}
            onChecked={() =>
              setZoneChecked(
                zoneChecked?.map((item, key) =>
                  key === 3 ? !zoneChecked?.[3] : item
                )
              )
            }
            setAmount={(value) =>
              +value <= MAX_TOKEN_PER_MINT &&
              setZoneAmount(
                zoneAmount?.map((item, key) => (key === 3 ? value : item))
              )
            }
            price={`${+(zoneAmount?.[3] * zone4Commission).toFixed(2)} AVAX`}
          />
        )}
        <ZoneItem
          isDark={isDark}
          isMobile={isMobile}
          title="Ruby"
          isDisabled={!zoneChecked?.[4]}
          withInput
          amount={zoneAmount?.[4]}
          onChecked={() =>
            setZoneChecked(
              zoneChecked?.map((item, key) =>
                key === 4 ? !zoneChecked?.[4] : item
              )
            )
          }
          setAmount={(value) =>
            +value <= MAX_TOKEN_PER_MINT &&
            setZoneAmount(
              zoneAmount?.map((item, key) => (key === 4 ? value : item))
            )
          }
          price={`${+(zoneAmount?.[4] * zone5Commission).toFixed(2)} AVAX`}
        />
      </div>
      <div className="homeZoneListNew__mintAll">
        <Button
          onClick={handleMintConfirmationModal?.open}
          label={`Mint ${zoneSumAmount} Keys for ${zoneSumCommission} AVAX`}
          disabled={
            zoneSumAmount > MAX_TOKEN_PER_MINT ||
            zoneChecked?.every((item) => !item)
          }
          variant="shadow"
          size="large"
        />
        <div className="homeZoneListNew__mintAll--text">
          You can mint max {MAX_TOKEN_PER_MINT} Keys per transaction.
        </div>
      </div>
    </>
  );
};

export default HomeZoneListNew;
