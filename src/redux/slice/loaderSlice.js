import { createSlice } from "@reduxjs/toolkit";

export const initialStateLoader = {
  isActive: false,
  opacityLevel: 3,
  componentActive: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState: initialStateLoader,
  reducers: {
    setLoader: (state, action) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
    setComponentLoader: (state, action) => {
      return {
        ...state,
        componentActive: action?.payload,
      };
    },
  },
});

// this is for dispatch
export const { setLoader, setComponentLoader } = loaderSlice.actions;

// Export individual selector functions for each required state field
export const selectLoaderIsActive = (state) => state?.loader?.isActive;
export const selectLoaderOpacityLevel = (state) => state?.loader?.opacityLevel;
export const selectLoaderComponentActive = (state) =>
  state?.loader?.componentActive;

// this is for configureStore
export default loaderSlice.reducer;
