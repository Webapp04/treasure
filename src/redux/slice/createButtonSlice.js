import { createSlice } from "@reduxjs/toolkit";

export const initialStateCreateButton = {
  isDisabled: false,
  createData: {},
  isCreatedNft: false,
  successText: "",
};

export const createButtonSlice = createSlice({
  name: "createButton",
  initialState: initialStateCreateButton,
  reducers: {
    setCreateButton: (state, action) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
  },
});

// this is for dispatch
export const { setCreateButton } = createButtonSlice.actions;

// Export individual selector functions for each required state field
export const selectCreateButtonIsDisabled = (state) =>
  state?.createButton?.isDisabled;
export const selectCreateButtonCreatedData = (state) =>
  state?.createButton?.createData;
export const selectCreateButtonIsCreatedNFT = (state) =>
  state?.createButton?.isCreatedNft;
export const selectCreateButtonSuccessText = (state) =>
  state?.createButton?.successText;

// this is for configureStore
export default createButtonSlice.reducer;
