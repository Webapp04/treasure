import { createSlice } from "@reduxjs/toolkit";

export const chestSlice = createSlice({
  name: "chest_modal",
  initialState: null,
  reducers: {
    setChestModal: (state, action) => {
      return { ...state, ...action?.payload };
    },
  },
});

// this is for dispatch
export const { setChestModal } = chestSlice.actions;

// Export individual selector functions for each required state field
export const selectChestModal = (state) => state?.chest_modal;

// this is for configureStore
export default chestSlice.reducer;
