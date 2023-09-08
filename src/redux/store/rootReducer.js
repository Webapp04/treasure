import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import balanceReducer from "../slice/balanceSlice";
import rewardReducer from "../slice/rewardSlice";
import themeReducer from "../slice/themeSlice";
import nftReducer from "../slice/nftSlice";
import alertReducer from "../slice/alertSlice";
import createButtonReducer from "../slice/createButtonSlice";
import currentTokenReducer from "../slice/currentTokenSlice";
import filtersReducer from "../slice/filterSlice";
import loaderReducer from "../slice/loaderSlice";
import providerReducer from "../slice/providerSlice";
import scaleReducer from "../slice/scaleSlice";
import whitelistReducer from "../slice/whiteListSlice";
import tokenCountReducer from "../slice/tokenCountSlice";
import targetReducer from "../slice/targetSlice";
import timestampReducer from "../slice/timeStampSlice";
import pendingLoaderReducer from "../slice/pendingLoaderSlice";
import chestModalReducer from "../slice/chestSlice";
import accountReducer from "../slice/accountSlice";
import { initialState } from "../slice/logoutSlice";

const rootReducer = combineReducers({
  user: userReducer,
  balance: balanceReducer,
  reward: rewardReducer,
  theme: themeReducer,
  nft: nftReducer,
  alert: alertReducer,
  createButton: createButtonReducer,
  currentToken: currentTokenReducer,
  filters: filtersReducer,
  loader: loaderReducer,
  provider: providerReducer,
  scale: scaleReducer,
  whitelist: whitelistReducer,
  tokens_count: tokenCountReducer,
  targetUpgradeDate: targetReducer,
  timestamp: timestampReducer,
  pending_loader: pendingLoaderReducer,
  chest_modal: chestModalReducer,
  accountBannerImage: accountReducer,
});

const appReducer = (state, action) => {
  if (action.type === "logout/logout") {
    state = initialState;
  }
  return rootReducer(state, action);
};

export default appReducer;
