import {
  DASHBOARD_TAB_MENU_DASHBOARD_LINK,
  DASHBOARD_TAB_MENU_FAQ,
  DASHBOARD_TAB_MENU_FAQ_LINK,
  DASHBOARD_TAB_MENU_GAME_LINK,
  DASHBOARD_TAB_MENU_ITEMS,
} from "../../../constant/navigation";
import {
  DASHBOARD_TAB_MENU_DASHBOARD,
  DASHBOARD_TAB_MENU_GAME,
} from "../../../constant/navigation";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState(DASHBOARD_TAB_MENU_GAME);

  const location = useLocation();
  const navigate = useNavigate();

  const onTabMenu = (value) => {
    if (value === DASHBOARD_TAB_MENU_GAME)
      navigate(DASHBOARD_TAB_MENU_GAME_LINK);
    else if (value === DASHBOARD_TAB_MENU_DASHBOARD)
      navigate(DASHBOARD_TAB_MENU_DASHBOARD_LINK);
    else if (value === DASHBOARD_TAB_MENU_FAQ)
      navigate(DASHBOARD_TAB_MENU_FAQ_LINK);
  };

  useEffect(() => {
    if (location.pathname === DASHBOARD_TAB_MENU_GAME_LINK)
      setActiveTab(DASHBOARD_TAB_MENU_GAME);
    else if (location.pathname === DASHBOARD_TAB_MENU_DASHBOARD_LINK)
      setActiveTab(DASHBOARD_TAB_MENU_DASHBOARD);
    else if (location.pathname === DASHBOARD_TAB_MENU_FAQ_LINK)
      setActiveTab(DASHBOARD_TAB_MENU_FAQ);
  }, [location]);

  return (
    <div className="dashboard__tabs">
      {DASHBOARD_TAB_MENU_ITEMS.map((tab, key) => (
        <div
          key={key}
          className={`dashboard__tabs--item ${
            activeTab === tab.value ? "active" : ""
          }`}
          onClick={() => onTabMenu(tab.value)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
