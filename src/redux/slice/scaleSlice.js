import { createSlice } from "@reduxjs/toolkit";

export const initialStateScale = {
  isActive: false,
  value: 220,
};

export const scaleSlice = createSlice({
  name: "scale",
  initialState: initialStateScale,
  reducers: {
    setScale: (state, action) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
  },
});

// this is for dispatch
export const { setScale } = scaleSlice.actions;

// Export individual selector functions for each required state field
export const selectScaleIsActive = (state) => state?.scale?.isActive;
export const selectScaleValue = (state) => state?.scale?.value;

// this is for configureStore
export default scaleSlice.reducer;
