import {
  setBonusJlpSmartrReward,
  setBonusJlpTresrReward,
  setBonusKeyLevelReward,
  setBonusPoolAllocation,
  setBonusTotalReward,
  setBonusVeTresrReward,
  setClaimedBonusTotalReward,
  setTotalTresrRewardsPerSec,
  setTresrRewards,
  setTresrRewardsPerSec,
  setTresrRewardsReleased,
} from "redux/slice/rewardSlice";

const rewardAction = {
  SET_BONUS_POOL_ALLOCATION: (dispatch, value) => {
    dispatch(setBonusPoolAllocation(value));
  },
  SET_BONUS_KEY_LEVEL_REWARDS: (dispatch, value) => {
    dispatch(setBonusKeyLevelReward(value));
  },
  SET_BONUS_VETRESR_REWARDS: (dispatch, value) => {
    dispatch(setBonusVeTresrReward(value));
  },
  SET_BONUS_JLPTRESR_REWARDS: (dispatch, value) => {
    dispatch(setBonusJlpTresrReward(value));
  },
  SET_BONUS_JLPSMARTR_REWARDS: (dispatch, value) => {
    dispatch(setBonusJlpSmartrReward(value));
  },
  SET_BONUS_TOTAL_REWARDS: (dispatch, value) => {
    dispatch(setBonusTotalReward(value));
  },
  SET_CALIMED_BONUS_TOTAL: (dispatch, value) => {
    dispatch(setClaimedBonusTotalReward(value));
  },
  SET_TRESR_REWARDS: (dispatch, value) => {
    dispatch(setTresrRewards(value));
  },
  SET_TRESR_REWARDS_RELEASED: (dispatch, value) => {
    dispatch(setTresrRewardsReleased(value));
  },
  SET_TRESR_REWARDS_PER_SEC: (dispatch, value) => {
    dispatch(setTresrRewardsPerSec(value));
  },
  SET_TOTAL_TRESR_REWARDS_PER_SEC: (dispatch, value) => {
    dispatch(setTotalTresrRewardsPerSec(value));
  },
};

export default rewardAction;
