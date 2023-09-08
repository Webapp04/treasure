import { setScale } from "redux/slice/scaleSlice";

const scaleAction = {
  SET_SCALE: (dispatch, isActive, value) => {
    const payload = {
      isActive,
      value,
    };
    dispatch(setScale(payload));
  },
};

export default scaleAction;
