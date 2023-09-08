import { setComponentLoader, setLoader } from "redux/slice/loaderSlice";

const loaderAction = {
  SET_LOADER: (dispatch, isActive, opacityLevel) => {
    const payload = {
      isActive,
      opacityLevel,
    };
    dispatch(setLoader(payload));
  },
  SET_COMPONENT_LOADER: (dispatch, value) => {
    dispatch(setComponentLoader(value));
  },
};

export default loaderAction;
