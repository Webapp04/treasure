import { createSlice } from "@reduxjs/toolkit";

export const providerSlice = createSlice({
  name: "provider",
  initialState: null,
  reducers: {
    setProvider: (state, action) => {
      return { ...state, ...action?.payload };
    },
  },
});

// this is for dispatch
export const { setProvider } = providerSlice.actions;

// Export individual selector functions for each required state field
export const selectProvider = (state) => state?.provider;

// this is for configureStore
export default providerSlice.reducer;
