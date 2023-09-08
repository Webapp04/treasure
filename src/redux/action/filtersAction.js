import { setFilters } from "redux/slice/filterSlice";

const filtersAction = {
  SET_FILTERS: (dispatch, price, blockchain, status, sortBy) => {
    const payload = {
      price,
      blockchain,
      status,
      sortBy,
    };
    dispatch(setFilters(payload));
  },
};

export default filtersAction;
