import { createSlice } from "@reduxjs/toolkit";

export const initialStateToken = {
  list: [],
  selected: null,
  isLoadedSelected: false,
};

export const nftSlice = createSlice({
  name: "nft",
  initialState: initialStateToken,
  reducers: {
    setNftList: (state, action) => {
      return {
        ...state,
        list: action?.payload,
      };
    },
    setNftListItem: (state, action) => {
      return {
        ...state,
        list: [
          ...state?.list?.filter(
            (item) => item?.tokenId !== action?.payload?.tokenId
          ),
          ...[action?.payload],
        ],
      };
    },
    setNftSelected: (state, action) => {
      return {
        ...state,
        selected: action?.payload,
        isLoadedSelected: true,
      };
    },
  },
});

// this is for dispatch
export const { setNftList, setNftListItem, setNftSelected } = nftSlice.actions;

// Export individual selector functions for each required state field
export const selectNftList = (state) => state.nft.list;
export const selectNftSelected = (state) => state.nft.selected;
export const selectIsLoadedSelected = (state) => state.nft.isLoadedSelected;

// this is for configureStore
export default nftSlice.reducer;
