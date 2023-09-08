import { createSlice } from "@reduxjs/toolkit";

export const initialStateBalance = {
  avaxBalance: 0,
  smrtrBalance: 0,
  tresrBalance: 0,
  tresrStakedBalance: 0,
  tresrStakedAllBalance: 0,
  totalEarnedBalance: 0,
  lpTRESRAVAXBalance: 0,
  lpSMRTRAVAXBalance: 0,
  lpStakedTRESRAVAXBalance: 0,
  lpStakedSMRTRAVAXBalance: 0,
  lpTotalStakedTRESRAVAXBalance: 0,
  lpTotalStakedSMRTRAVAXBalance: 0,
  lpCommunityStakedTRESRAVAXBalance: 0,
  lpCommunityStakedSMRTRAVAXBalance: 0,
  timeTresrToUnlockBalance: 0,
  veTresrSharePBalance: 0,
  keyLevelPBalance: 0,
  burnedTresrBalance: 0,
  burnedSmrtrBalance: 0,
  poolAllocationBalance: 0,
  transactionHashBalance: "",
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState: initialStateBalance,
  reducers: {
    setPoolAllocationBalance: (state, action) => {
      return {
        ...state,
        poolAllocationBalance: action?.payload,
      };
    },
    setBurnedSmrtrBalance: (state, action) => {
      return {
        ...state,
        burnedSmrtrBalance: action?.payload,
      };
    },
    setBurnedTresrBalance: (state, action) => {
      return {
        ...state,
        burnedTresrBalance: action?.payload,
      };
    },
    setVeTresrSharePBalance: (state, action) => {
      return {
        ...state,
        veTresrSharePBalance: action?.payload,
      };
    },
    setKeyLevelPBalance: (state, action) => {
      return {
        ...state,
        keyLevelPBalance: action?.payload,
      };
    },
    setAvaxBalance: (state, action) => {
      return {
        ...state,
        avaxBalance: action?.payload,
      };
    },
    setLpTRESRAVAXBalance: (state, action) => {
      return {
        ...state,
        lpTRESRAVAXBalance: action?.payload,
      };
    },
    setLpSMRTRAVAXBalance: (state, action) => {
      return {
        ...state,
        lpSMRTRAVAXBalance: action?.payload,
      };
    },
    setLpStakedTRESRAVAXBalance: (state, action) => {
      return {
        ...state,
        lpStakedTRESRAVAXBalance: action?.payload,
      };
    },
    setLpStakedSMRTRAVAXBalance: (state, action) => {
      return {
        ...state,
        lpStakedSMRTRAVAXBalance: action?.payload,
      };
    },
    setLpTotalStakedTRESRAVAXBalance: (state, action) => {
      return {
        ...state,
        lpTotalStakedTRESRAVAXBalance: action?.payload,
      };
    },
    setLpTotalStakedSMRTRAVAXBalance: (state, action) => {
      return {
        ...state,
        lpTotalStakedSMRTRAVAXBalance: action?.payload,
      };
    },
    setLpCommunityStakedTRESRAVAXBalance: (state, action) => {
      return {
        ...state,
        lpCommunityStakedTRESRAVAXBalance: action?.payload,
      };
    },
    setLpCommunityStakedSMRTRAVAXBalance: (state, action) => {
      return {
        ...state,
        lpCommunityStakedSMRTRAVAXBalance: action?.payload,
      };
    },
    setSmrtrBalance: (state, action) => {
      return {
        ...state,
        smrtrBalance: action?.payload,
      };
    },
    setTresrBalance: (state, action) => {
      return {
        ...state,
        tresrBalance: action?.payload,
      };
    },
    setTresrStakedBalance: (state, action) => {
      return {
        ...state,
        tresrStakedBalance: action?.payload,
      };
    },
    setTresrStakedAllBalance: (state, action) => {
      return {
        ...state,
        tresrStakedAllBalance: action?.payload,
      };
    },
    setTotalEarnedBalance: (state, action) => {
      return {
        ...state,
        totalEarnedBalance: action?.payload,
      };
    },
    setTimeTresrToUnlockBalance: (state, action) => {
      return {
        ...state,
        timeTresrToUnlockBalance: action?.payload,
      };
    },
    setTransactionHashBalance: (state, action) => {
      return {
        ...state,
        transactionHashBalance: action?.payload,
      };
    },
  },
});

// this is for dispatch
export const {
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
} = balanceSlice.actions;

// Export individual selector functions for each required state field
export const selectPoolAllocationBalance = (state) =>
  state.balance.poolAllocationBalance;
export const selectBurnedSmrtrBalance = (state) =>
  state.balance.burnedSmrtrBalance;
export const selectBurnedTresrBalance = (state) =>
  state.balance.burnedTresrBalance;
export const selectVeTresrSharePBalance = (state) =>
  state.balance.veTresrSharePBalance;
export const selectAvaxBalance = (state) => state.balance.avaxBalance;
export const selectKeyLevelPBalance = (state) => state.balance.keyLevelPBalance;
export const selectLpTRESRAVAXBalance = (state) =>
  state.balance.lpTRESRAVAXBalance;
export const selectLpSMRTRAVAXBalance = (state) =>
  state.balance.lpSMRTRAVAXBalance;
export const selectLpStakedTRESRAVAXBalance = (state) =>
  state.balance.lpStakedTRESRAVAXBalance;
export const selectLpStakedSMRTRAVAXBalance = (state) =>
  state.balance.lpStakedSMRTRAVAXBalance;
export const selectLpTotalStakedTRESRAVAXBalance = (state) =>
  state.balance.lpTotalStakedTRESRAVAXBalance;
export const selectLpTotalStakedSMRTRAVAXBalance = (state) =>
  state.balance.lpTotalStakedSMRTRAVAXBalance;
export const selectLpCommunityStakedTRESRAVAXBalance = (state) =>
  state.balance.lpCommunityStakedTRESRAVAXBalance;
export const selectLpCommunityStakedSMRTRAVAXBalance = (state) =>
  state.balance.lpCommunityStakedSMRTRAVAXBalance;
export const selectSmrtrBalance = (state) => state.balance.smrtrBalance;
export const selectTresrBalance = (state) => state.balance.tresrBalance;
export const selectTresrStakedBalance = (state) =>
  state.balance.tresrStakedBalance;
export const selectTresrStakedAllBalance = (state) =>
  state.balance.tresrStakedAllBalance;
export const selectTotalEarnedBalance = (state) =>
  state.balance.totalEarnedBalance;
export const selectTimeTresrToUnlockBalance = (state) =>
  state.balance.timeTresrToUnlockBalance;
export const selectTransactionHashBalance = (state) =>
  state.balance.transactionHashBalance;

// this is for configureStore
export default balanceSlice.reducer;
