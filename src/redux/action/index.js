import { setUser } from "redux/slice/userSlice";
import balanceAction from "./balanceAction";
import rewardAction from "./rewardAction";
import { setTheme } from "redux/slice/themeSlice";
import nftAction from "./nftAction";
import { setCurrentToken } from "redux/slice/currentTokenSlice";
import alertAction from "./alertAction";
import createButtonAction from "./createButtonAction";
import filtersAction from "./filtersAction";
import { setProvider } from "redux/slice/providerSlice";
import loaderAction from "./loaderAction";
import scaleAction from "./scaleAction";
import { setWhitelist } from "redux/slice/whiteListSlice";
import { setTokenCounts } from "redux/slice/tokenCountSlice";
import { setTargetUpgradeDate } from "redux/slice/targetSlice";
import { setTimestamp } from "redux/slice/timeStampSlice";
import { setPendingLoader } from "redux/slice/pendingLoaderSlice";
import { setChestModal } from "redux/slice/chestSlice";
import { setAccountBannerImage } from "redux/slice/accountSlice";
import { logout } from "redux/slice/logoutSlice";

const ACTIONS = {
  ...balanceAction,
  ...nftAction,
  ...alertAction,
  ...createButtonAction,
  ...filtersAction,
  ...loaderAction,
  ...scaleAction,
  ...rewardAction,
  SET_USER: (dispatch, value) => {
    dispatch(setUser(value));
  },
  SET_THEME: (dispatch, value) => {
    dispatch(setTheme(value));
  },
  SET_CURRENT_TOKEN: (dispatch, value) => {
    dispatch(setCurrentToken(value));
  },
  SET_SYNC: (dispatch, value) => {
    dispatch(setProvider(value));
  },
  SET_WHITELIST_STATUS: (dispatch, value) => {
    dispatch(setWhitelist(value));
  },
  SET_TOKENS_COUNT: (dispatch, value) => {
    dispatch(setTokenCounts(value));
  },
  SET_TARGET_UPGRADE_DATE: (dispatch, value) => {
    dispatch(setTargetUpgradeDate(value));
  },
  SET_TIMESTAMP: (dispatch, value) => {
    dispatch(setTimestamp(value));
  },
  SET_PENDING_LOADER: (dispatch, value) => {
    dispatch(setPendingLoader(value));
  },
  SET_CHEST_MODAL: (dispatch, value) => {
    dispatch(setChestModal(value));
  },
  SET_ACCOUNT_BANNER_IMAGE: (dispatch, value) => {
    dispatch(setAccountBannerImage(value));
  },
  LOGOUT: (dispatch) => {
    dispatch(logout());
  },
};

export default ACTIONS;
