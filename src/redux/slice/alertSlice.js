import { createSlice } from "@reduxjs/toolkit";
import { ALERT_STATUS_SUCCESS } from "constant/alert";

export const initialStateAlert = {
  isActive: false,
  status: ALERT_STATUS_SUCCESS,
  text: "",
  image: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialStateAlert,
  reducers: {
    setAlert: (state, action) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
  },
});

// this is for dispatch
export const { setAlert } = alertSlice.actions;

// Export individual selector functions for each required state field
export const selectAlertIsActive = (state) => state?.alert?.isActive;
export const selectAlertStatus = (state) => state?.alert?.status;
export const selectAlertText = (state) => state?.alert?.text;
export const selectAlertImage = (state) => state?.alert?.image;

// this is for configureStore
export default alertSlice.reducer;
