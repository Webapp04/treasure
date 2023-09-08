import { createSlice } from "@reduxjs/toolkit";

export const whiteListSlice = createSlice({
  name: "whitelist",
  initialState: null,
  reducers: {
    setWhitelist: (state, action) => {
      return { ...state, ...action?.payload };
    },
  },
});

// this is for dispatch
export const { setWhitelist } = whiteListSlice.actions;

// Export individual selector functions for each required state field
export const selectWhitelist = (state) => state?.whitelist;

// this is for configureStore
export default whiteListSlice.reducer;
