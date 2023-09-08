import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: window?.localStorage.getItem("theme") || "dark",
  reducers: {
    setTheme: (state, action) => {
      return action?.payload;
    },
  },
});

// this is for dispatch
export const { setTheme } = themeSlice.actions;

// Export individual selector functions for each required state field
export const selectTheme = (state) => state?.theme;

// this is for configureStore
export default themeSlice.reducer;
