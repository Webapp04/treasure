import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action?.payload };
    },
  },
});

// this is for dispatch
export const { setUser } = userSlice.actions;

// Export individual selector functions for each required state field
export const selectUser = (state) => state?.user;

// this is for configureStore
export default userSlice.reducer;
