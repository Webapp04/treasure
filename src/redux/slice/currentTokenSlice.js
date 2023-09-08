import { createSlice } from "@reduxjs/toolkit";

export const currentTokenSlice = createSlice({
  name: "currentToken",
  initialState: {},
  reducers: {
    setCurrentToken: (state, action) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
  },
});

// this is for dispatch
export const { setCurrentToken } = currentTokenSlice.actions;

// Export individual selector functions for each required state field
export const selectCurrentToken = (state) => state?.currentToken;

// this is for configureStore
export default currentTokenSlice.reducer;
