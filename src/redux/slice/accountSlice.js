import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "accountBannerImage",
  initialState: "",
  reducers: {
    setAccountBannerImage: (state, action) => {
      return action?.payload;
    },
  },
});

// this is for dispatch
export const { setAccountBannerImage } = accountSlice.actions;

// Export individual selector functions for each required state field
export const selectAccountBannerImage = (state) => state?.accountBannerImage;

// this is for configureStore
export default accountSlice.reducer;
