import { setCreateButton } from "redux/slice/createButtonSlice";

const createButtonAction = {
  SET_CREATE_BUTTON: (
    dispatch,
    isDisabled,
    createData,
    isCreatedNft,
    successText
  ) => {
    const payload = {
      isDisabled,
      createData,
      isCreatedNft,
      successText,
    };
    dispatch(setCreateButton(payload));
  },
};

export default createButtonAction;
