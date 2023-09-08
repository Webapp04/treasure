import { createSlice } from "@reduxjs/toolkit";

export const tokenCountSlice = createSlice({
  name: "tokens_count",
  initialState: null,
  reducers: {
    setTokenCounts: (state, action) => {
      return action?.payload;
    },
  },
});

// this is for dispatch
export const { setTokenCounts } = tokenCountSlice.actions;

// Export individual selector functions for each required state field
export const selectTokenCounts = (state) => state?.tokens_count;

// this is for configureStore
export default tokenCountSlice.reducer;
