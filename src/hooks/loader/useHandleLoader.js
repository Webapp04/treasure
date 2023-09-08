import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";

export default function useHandleLoader() {
  const dispatch = useDispatch();

  const loaderWrapper = async (callback, opacityLevel = 3) => {
    if (!callback) return;

    ACTIONS.SET_LOADER(dispatch, true, opacityLevel);
    return callback().finally(() => ACTIONS.SET_LOADER(dispatch, false));
  };

  return {
    loaderWrapper,
  };
}
