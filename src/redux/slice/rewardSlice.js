import { createSlice } from "@reduxjs/toolkit";

export const initialStateReward = {
  base: {
    claimableTresrRewards: 0,
    claimableTresrRewardsReleased: 0,
    claimableTresrRewardsPerSec: 0,
    claimableTotalTresrRewardsPerSec: 0,
  },
  bonus: {
    claimableBonusVeTresrReward: 0,
    claimableBonusJlpTresrReward: 0,
    claimableBonusJlpSmartrReward: 0,
    claimableBonusKeyLevelReward: 0,
    claimableBonusTotalReward: 0,
    claimedBonusTotalReward: 0,
    claimableBonusPoolAllocationReward: 0,
  },
};

export const rewardSlice = createSlice({
  name: "reward",
  initialState: initialStateReward,
  reducers: {
    setBonusPoolAllocation: (state, action) => {
      return {
        base: { ...state?.base },
        bonus: {
          ...state?.bonus,
          claimableBonusPoolAllocationReward: action?.payload,
        },
      };
    },
    setBonusKeyLevelReward: (state, action) => {
      return {
        base: { ...state?.base },
        bonus: {
          ...state?.bonus,
          claimableBonusKeyLevelReward: action?.payload,
        },
      };
    },
    setBonusVeTresrReward: (state, action) => {
      return {
        base: { ...state?.base },
        bonus: {
          ...state?.bonus,
          claimableBonusVeTresrReward: action?.payload,
        },
      };
    },
    setBonusJlpTresrReward: (state, action) => {
      return {
        base: { ...state?.base },
        bonus: {
          ...state?.bonus,
          claimableBonusJlpTresrReward: action?.payload,
        },
      };
    },
    setBonusJlpSmartrReward: (state, action) => {
      return {
        base: { ...state?.base },
        bonus: {
          ...state?.bonus,
          claimableBonusJlpSmartrReward: action?.payload,
        },
      };
    },
    setBonusTotalReward: (state, action) => {
      return {
        base: { ...state?.base },
        bonus: {
          ...state?.bonus,
          claimableBonusTotalReward: action?.payload,
        },
      };
    },
    setClaimedBonusTotalReward: (state, action) => {
      return {
        base: { ...state?.base },
        bonus: {
          ...state?.bonus,
          claimedBonusTotalReward: action?.payload,
        },
      };
    },
    setTresrRewards: (state, action) => {
      return {
        base: {
          ...state?.base,
          claimableTresrRewards: action?.payload,
        },
        bonus: { ...state?.bonus },
      };
    },
    setTresrRewardsReleased: (state, action) => {
      return {
        base: {
          ...state?.base,
          claimableTresrRewardsReleased: action?.payload,
        },
        bonus: { ...state?.bonus },
      };
    },
    setTresrRewardsPerSec: (state, action) => {
      return {
        base: {
          ...state?.base,
          claimableTresrRewardsPerSec: action?.payload,
        },
        bonus: { ...state?.bonus },
      };
    },
    setTotalTresrRewardsPerSec: (state, action) => {
      return {
        base: {
          ...state?.base,
          claimableTotalTresrRewardsPerSec: action?.payload,
        },
        bonus: { ...state?.bonus },
      };
    },
  },
});

// this is for dispatch
export const {
  setBonusPoolAllocation,
  setBonusKeyLevelReward,
  setBonusVeTresrReward,
  setBonusJlpTresrReward,
  setBonusJlpSmartrReward,
  setBonusTotalReward,
  setClaimedBonusTotalReward,
  setTresrRewards,
  setTresrRewardsReleased,
  setTresrRewardsPerSec,
  setTotalTresrRewardsPerSec,
} = rewardSlice.actions;

// Export individual selector functions for each required state field
export const selectBonusPoolAllocation = (state) =>
  state.reward.bonus.claimableBonusPoolAllocationReward;
export const selectBonusKeyLevelReward = (state) =>
  state.reward.bonus.claimableBonusKeyLevelReward;
export const selectBonusVeTresrReward = (state) =>
  state.reward.bonus.claimableBonusVeTresrReward;
export const selectBonusJlpTresrReward = (state) =>
  state.reward.bonus.claimableBonusJlpTresrReward;
export const selectBonusJlpSmartrReward = (state) =>
  state.reward.bonus.claimableBonusJlpSmartrReward;
export const selectBonusTotalReward = (state) =>
  state.reward.bonus.claimableBonusTotalReward;
export const selectClaimedBonusTotalReward = (state) =>
  state.reward.bonus.claimedBonusTotalReward;
export const selectTresrRewards = (state) =>
  state.reward.base.claimableTresrRewards;
export const selectTresrRewardsReleased = (state) =>
  state.reward.base.claimableTresrRewardsReleased;
export const selectTresrRewardsPerSec = (state) =>
  state.reward.base.claimableTresrRewardsPerSec;
export const selectTotalTresrRewardsPerSec = (state) =>
  state.reward.base.claimableTotalTresrRewardsPerSec;

// this is for configureStore
export default rewardSlice.reducer;
