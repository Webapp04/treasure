import { createSlice } from "@reduxjs/toolkit";

export const initialStateFilters = {
  price: {},
  blockchain: [],
  status: [],
  sortBy: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState: initialStateFilters,
  reducers: {
    setFilters: (state, action) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
  },
});

// this is for dispatch
export const { setFilters } = filtersSlice.actions;

// Export individual selector functions for each required state field
export const selectFiltersPrice = (state) => state?.filters?.price;
export const selectFiltersBlockChain = (state) => state?.filters?.blockchain;
export const selectFiltersStatus = (state) => state?.filters?.status;
export const selectFiltersSortBy = (state) => state?.filters?.sortBy;

// this is for configureStore
export default filtersSlice.reducer;
