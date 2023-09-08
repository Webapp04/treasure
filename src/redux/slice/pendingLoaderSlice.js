import { createSlice } from "@reduxjs/toolkit";

export const pendingLoaderSLice = createSlice({
  name: "pending_loader",
  initialState: false,
  reducers: {
    setPendingLoader: (state, action) => {
      return action?.payload;
    },
  },
});

// this is for dispatch
export const { setPendingLoader } = pendingLoaderSLice.actions;

// Export individual selector functions for each required state field
export const selectPendingLoader = (state) => state?.pending_loader;

// this is for configureStore
export default pendingLoaderSLice.reducer;
