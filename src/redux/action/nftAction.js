import {
  setNftList,
  setNftListItem,
  setNftSelected,
} from "redux/slice/nftSlice";

const tokenAction = {
  SET_NFT_LIST: (dispatch, value) => {
    dispatch(setNftList(value));
  },
  SET_NFT_LIST_ITEM: (dispatch, value) => {
    dispatch(setNftListItem(value));
  },
  SET_NFT_SELECTED: (dispatch, value) => {
    dispatch(setNftSelected(value));
  },
};

export default tokenAction;
