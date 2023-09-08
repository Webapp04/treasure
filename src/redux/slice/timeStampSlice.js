import { createSlice } from "@reduxjs/toolkit";

export const timeStampSlice = createSlice({
  name: "timestamp",
  initialState: Date.now(),
  reducers: {
    setTimestamp: (state, action) => {
      return action?.payload;
    },
  },
});

// this is for dispatch
export const { setTimestamp } = timeStampSlice.actions;

// Export individual selector functions for each required state field
export const selectTimestamp = (state) => state?.timestamp;

// this is for configureStore
export default timeStampSlice.reducer;
