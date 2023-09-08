import { createSlice } from "@reduxjs/toolkit";

export const targetSlice = createSlice({
  name: "targetUpgradeDate",
  initialState: null,
  reducers: {
    setTargetUpgradeDate: (state, action) => {
      return action?.payload;
    },
  },
});

// this is for dispatch
export const { setTargetUpgradeDate } = targetSlice.actions;

// Export individual selector functions for each required state field
export const selectTargetUpgradeDate = (state) => state?.targetUpgradeDate;

// this is for configureStore
export default targetSlice.reducer;
