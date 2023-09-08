import React, { useRef } from "react";
import "./style.scss";
import SingleSelect from "storybook/atom/SingleSelect/singleSelect";
import {
  DASHBOARD_DROPDOWN_ITEMS,
  DASHBOARD_FILTERS,
} from "constant/navigation";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import Tab from "../Tab/tab";
import { ViewportList } from "react-viewport-list";
import refreshIcon from "../../atom/Icon/svg/refresh.svg";
import FounderKeyTab from "../FounderKeyTab/founderKeyTab";

const tokenList = [
  {
    isActive: true,
    tokenId: 0,
    tier: 0,
    chestProgressLineWidth: 50,
    tierTresr: 0,
    staked: true,
    isAnimated: true,
    percentToUpgrade: 100,
    onNFKey: () => {},
    spaceThumbnailSmall:
      "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  {
    isActive: false,
    tokenId: 0,
    tier: 0,
    chestProgressLineWidth: 50,
    tierTresr: 0,
    staked: true,
    isAnimated: true,
    percentToUpgrade: 100,
    onNFKey: () => {},
    spaceThumbnailSmall:
      "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
];

const FounderKeyCard = ({
  activeDropdownItem,
  setActiveDropdownItem = () => {},
  handleTransactionLoadingModal,
  activeFilter,
  setActiveFilter = () => {},
  filterTokenList = [...tokenList],
  isAnimated,
  onOpenModal,
  nftSelected,
  onNFKey,
  hours,
  minutes,
  seconds,
  days,
}) => {
  const ref = useRef(null);

  if (!filterTokenList?.length) return null;

  return (
    <div className="founderKeyCardWrapper">
      <div className="founderKeyCardTab">
        <Tab
          tabList={DASHBOARD_FILTERS}
          active={activeFilter}
          onClick={setActiveFilter}
          variant="primary"
        />
        <div
          className="absolute right-4 cursor-pointer"
          onClick={handleTransactionLoadingModal}
        >
          <Tooltip title="Force Update" position="top">
            <img src={refreshIcon} alt="refresh" />
          </Tooltip>
        </div>
      </div>
      <SingleSelect
        options={DASHBOARD_DROPDOWN_ITEMS}
        placeholder=""
        value={activeDropdownItem}
        onSelect={setActiveDropdownItem}
      />
      <div className="scrollContainer" ref={ref}>
        <ViewportList viewportRef={ref} items={filterTokenList}>
          {(token, key) => (
            <div
              className="dashboard__data__content--list__item key"
              key={key}
              onClick={onOpenModal}
            >
              <FounderKeyTab
                {...token}
                nftSelected={nftSelected}
                onNFKey={onNFKey}
                isAnimated={isAnimated}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                days={days}
              />
            </div>
          )}
        </ViewportList>
      </div>
    </div>
  );
};

export default FounderKeyCard;
