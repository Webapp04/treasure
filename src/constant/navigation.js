import { NFKEY_COLLECTION_ADDRESS } from "./blockchain";

export const MARKETPLACE = "Marketplace";
export const DEFI_GAME = "Defi Game";

export const NAVIGATION_LIST = [
  {
    label: MARKETPLACE,
    path: `http://genadrop-clone.netlify.app/`,
    isUser: true,
    isToken: false,
  },
  { label: DEFI_GAME, path: "/game", isUser: true, isToken: true },
];

export const FILTER_ALL = "all";
export const FILTER_ACTIVE = "active";
export const FILTER_INACTIVE = "inactive";

export const DASHBOARD_FILTERS_DEFAULT = {
  label: "All Keys",
  value: FILTER_ALL,
};
export const DASHBOARD_FILTERS = [
  { label: "All Keys", value: FILTER_ALL },
  { label: "Active", value: FILTER_ACTIVE },
  { label: "Inactive", value: FILTER_INACTIVE },
];

export const SORT_HIGHEST_KEY_LEVEL = "highest_key_level";
export const SORT_LOWEST_KEY_LEVEL = "lowest_key_level";
export const SORT_HIGHEST_TOKENID = "highest_tokenid";
export const SORT_LOWEST_TOKENID = "lowest_tokenid";
// export const SORT_HIGHEST_TRESR_TIER = 'highest_treasure_tier';
// export const SORT_LOWEST_TRESR_TIER = 'lowest_treasure_tier';
// export const SORT_DATE_NEWEST = 'date_newest';
// export const SORT_DATE_OLDEST = 'date_oldest';

export const DASHBOARD_DROPDOWN_ITEMS_DEFAULT = {
  label: "Highest TokenId",
  value: SORT_HIGHEST_TOKENID,
};
export const DASHBOARD_DROPDOWN_ITEMS = [
  { label: "Highest Key Level", value: SORT_HIGHEST_KEY_LEVEL },
  { label: "Lowest Key Level", value: SORT_LOWEST_KEY_LEVEL },
  { label: "Highest TokenId", value: SORT_HIGHEST_TOKENID },
  { label: "Lowest TokenId", value: SORT_LOWEST_TOKENID },
  // {label: 'Highest Treasure Tier', value: SORT_HIGHEST_TRESR_TIER},
  // {label: 'Lowest Treasure Tier', value: SORT_LOWEST_TRESR_TIER},
  // {label: 'Date Added (Newest)', value: SORT_DATE_NEWEST},
  // {label: 'Date Added (Oldest)', value: SORT_DATE_OLDEST},
];

export const DASHBOARD_TAB_MENU_GAME = "game";
export const DASHBOARD_TAB_MENU_DASHBOARD = "dashboard";
export const DASHBOARD_TAB_MENU_FAQ = "faq";
export const DASHBOARD_TAB_MENU_GAME_LINK = `/${DASHBOARD_TAB_MENU_GAME}`;
export const DASHBOARD_TAB_MENU_DASHBOARD_LINK = `/${DASHBOARD_TAB_MENU_GAME}/${DASHBOARD_TAB_MENU_DASHBOARD}`;
export const DASHBOARD_TAB_MENU_FAQ_LINK = `/${DASHBOARD_TAB_MENU_GAME}/${DASHBOARD_TAB_MENU_FAQ}`;
export const DASHBOARD_TAB_MENU_ITEMS = [
  { label: "Key Rewards", value: DASHBOARD_TAB_MENU_GAME },
  { label: "Bonus Rewards", value: DASHBOARD_TAB_MENU_DASHBOARD },
  // {label: 'FAQs', value: DASHBOARD_TAB_MENU_FAQ},
];

export const COLLECTION_ACTIVITY = "activity";
export const COLLECTION_ALL_ITEMS = "allItems";
