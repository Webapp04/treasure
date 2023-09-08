import { createSlice } from "@reduxjs/toolkit";
import { initialStateAlert } from "./alertSlice";
import { initialStateBalance } from "./balanceSlice";
import { initialStateLoader } from "./loaderSlice";
import { initialStateToken } from "./nftSlice";
import { initialStateFilters } from "./filterSlice";
import { initialStateCreateButton } from "./createButtonSlice";
import { initialStateScale } from "./scaleSlice";
import { initialStateReward } from "./rewardSlice";

export const initialState = {
  user: null,
  wallet: null,
  whitelist: null,
  tokens_count: null,
  targetUpgradeDate: null,
  pending_loader: false,
  chest_modal: null,
  chest_hash: null,
  timestamp: Date.now(),
  accountBannerImage: "",
  provider: null,
  currentToken: {},
  theme: window?.localStorage.getItem("theme") || "dark",
  ...initialStateLoader,
  ...initialStateToken,
  ...initialStateBalance,
  ...initialStateReward,
  ...initialStateAlert,
  ...initialStateFilters,
  ...initialStateCreateButton,
  ...initialStateScale,
};

export const logoutSlice = createSlice({
  name: "logout",
  initialState: initialState,
  reducers: {
    logout: () => {
      return { ...initialState };
    },
  },
});

// this is for dispatch
export const { logout } = logoutSlice.actions;

// this is for configureStore
export default logoutSlice.reducer;
