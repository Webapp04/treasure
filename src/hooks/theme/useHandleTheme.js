import ACTIONS from "redux/action";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

export default function useHandleTheme() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const LS_TITLE = "theme";
  const DATA_TYPE_TITLE = "data-theme";
  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  const switchTheme = () => {
    const newTheme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;

    localStorage.setItem(LS_TITLE, newTheme);
    ACTIONS.SET_THEME(dispatch, newTheme);
    document.querySelector("body").setAttribute(DATA_TYPE_TITLE, newTheme);
  };

  const setDefaultTheme = () => {
    const newTheme = localStorage.getItem(LS_TITLE) || THEME_DARK;

    localStorage.setItem(LS_TITLE, newTheme);
    ACTIONS.SET_THEME(dispatch, newTheme);
    document.querySelector("body").setAttribute(DATA_TYPE_TITLE, newTheme);
  };

  return {
    setDefaultTheme,
    switchTheme,
  };
}
