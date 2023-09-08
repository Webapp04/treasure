import {
  setPoolAllocationBalance,
  setBurnedSmrtrBalance,
  setBurnedTresrBalance,
  setVeTresrSharePBalance,
  setKeyLevelPBalance,
  setAvaxBalance,
  setLpTRESRAVAXBalance,
  setLpSMRTRAVAXBalance,
  setLpStakedTRESRAVAXBalance,
  setLpStakedSMRTRAVAXBalance,
  setLpTotalStakedTRESRAVAXBalance,
  setLpTotalStakedSMRTRAVAXBalance,
  setLpCommunityStakedTRESRAVAXBalance,
  setLpCommunityStakedSMRTRAVAXBalance,
  setSmrtrBalance,
  setTresrBalance,
  setTresrStakedBalance,
  setTresrStakedAllBalance,
  setTotalEarnedBalance,
  setTimeTresrToUnlockBalance,
  setTransactionHashBalance,
} from "redux/slice/balanceSlice";

const balanceAction = {
  SET_POOL_ALLOCATION: (dispatch, value) => {
    dispatch(setPoolAllocationBalance(value));
  },
  SET_BURNED_SMRTR: (dispatch, value) => {
    dispatch(setBurnedSmrtrBalance(value));
  },
  SET_BURNED_TRESR: (dispatch, value) => {
    dispatch(setBurnedTresrBalance(value));
  },
  SET_VETRESR_SHARE_P: (dispatch, value) => {
    dispatch(setVeTresrSharePBalance(value));
  },
  SET_KEYLEVEL_P: (dispatch, value) => {
    dispatch(setKeyLevelPBalance(value));
  },
  SET_BALANCE_AVAX: (dispatch, value) => {
    dispatch(setAvaxBalance(value));
  },
  SET_BALANCE_LP_TRESRAVAX: (dispatch, value) => {
    dispatch(setLpTRESRAVAXBalance(value));
  },
  SET_BALANCE_LP_SMRTRAVAX: (dispatch, value) => {
    dispatch(setLpSMRTRAVAXBalance(value));
  },
  SET_BALANCE_LP_STAKED_TRESRAVAX: (dispatch, value) => {
    dispatch(setLpStakedTRESRAVAXBalance(value));
  },
  SET_BALANCE_LP_STAKED_SMRTRAVAX: (dispatch, value) => {
    dispatch(setLpStakedSMRTRAVAXBalance(value));
  },
  SET_BALANCE_LP_TOTAL_STAKED_TRESRAVAX: (dispatch, value) => {
    dispatch(setLpTotalStakedTRESRAVAXBalance(value));
  },
  SET_BALANCE_LP_TOTAL_STAKED_SMRTRAVAX: (dispatch, value) => {
    dispatch(setLpTotalStakedSMRTRAVAXBalance(value));
  },
  SET_BALANCE_LP_COMMUNITY_STAKED_TRESRAVAX: (dispatch, value) => {
    dispatch(setLpCommunityStakedTRESRAVAXBalance(value));
  },
  SET_BALANCE_LP_COMMUNITY_STAKED_SMRTRAVAX: (dispatch, value) => {
    dispatch(setLpCommunityStakedSMRTRAVAXBalance(value));
  },
  SET_BALANCE_SMRTR: (dispatch, value) => {
    dispatch(setSmrtrBalance(value));
  },
  SET_BALANCE_TRESR: (dispatch, value) => {
    dispatch(setTresrBalance(value));
  },
  SET_BALANCE_TRESR_STAKED: (dispatch, value) => {
    dispatch(setTresrStakedBalance(value));
  },
  SET_BALANCE_TRESR_STAKED_ALL: (dispatch, value) => {
    dispatch(setTresrStakedAllBalance(value));
  },
  SET_BALANCE_TOTAL_EARNED: (dispatch, value) => {
    dispatch(setTotalEarnedBalance(value));
  },
  SET_BALANCE_TRESR_TIME_UNLOCK: (dispatch, value) => {
    dispatch(setTimeTresrToUnlockBalance(value));
  },
  SET_TRANSANCTION_HASH: (dispatch, value) => {
    dispatch(setTransactionHashBalance(value));
  },
};

export default balanceAction;
