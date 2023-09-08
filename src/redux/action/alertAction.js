import { setAlert } from "redux/slice/alertSlice";

const alertAction = {
  SET_ALERT: (dispatch, isActive, status, text, image) => {
    const payload = {
      isActive,
      status,
      text,
      image,
    };
    dispatch(setAlert(payload));
  },
};

export default alertAction;
