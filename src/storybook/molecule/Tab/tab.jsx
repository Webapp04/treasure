import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./style.scss";
import useWindowDimensions from "hooks/useWidowDimensions";

export const TabType = {
  primary: "primary",
  secondary: "secondary",
};

const Tab = ({ tabList = [], active, onClick, variant = "primary" }) => {
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 450;
  const [activeTab, setActiveTab] = useState();
  const [activeKey, setActiveKey] = useState();

  useEffect(() => {
    setActiveTab(active ? active : tabList?.[0]);
  }, [tabList, active]);

  useEffect(() => {
    if (activeTab) {
      if (variant === "primary") {
        onClick(activeTab);
      }
      if (variant === "secondary") {
        onClick(activeTab, activeKey);
      }
    }
  }, [activeTab]);

  return (
    <div
      className={classNames("tab__wrapper", {
        primary__tab__wrapper: variant === TabType.primary,
        secondary__tab__wrapper: variant === TabType.secondary,
      })}
    >
      {tabList.map((filter, key) => (
        <div
          key={key}
          className={classNames("", {
            "primary__tab__wrapper--item": variant === TabType.primary,
            "secondary__tab__wrapper--item": variant === TabType.secondary,
            active: JSON?.stringify(filter) === JSON?.stringify(activeTab),
            isMobileTab:
              isMobile && variant === TabType.secondary && filter === activeTab,
          })}
          onClick={() => {
            setActiveTab(filter);
            setActiveKey(key);
          }}
        >
          {filter.label}
        </div>
      ))}
    </div>
  );
};

export default Tab;
