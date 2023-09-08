import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactionHashBalance } from "redux/slice/balanceSlice";
import ACTIONS from "redux/action";
import {
  selectAlertImage,
  selectAlertIsActive,
  selectAlertStatus,
  selectAlertText,
} from "redux/slice/alertSlice";
import CustomAlerts from "storybook/atom/CustomAlert/customAlert";

const CustomAlert = () => {
  const alertIsActive = useSelector(selectAlertIsActive);
  const alertStatus = useSelector(selectAlertStatus);
  const alertText = useSelector(selectAlertText);
  const alertImage = useSelector(selectAlertImage);

  const dispatch = useDispatch();
  const transactionHashBalance = useSelector(selectTransactionHashBalance);

  const onClose = () => ACTIONS.SET_ALERT(dispatch, false);

  useEffect(() => {
    if (alertIsActive) setTimeout(onClose, 5000);
  }, [alertIsActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // if (!alertIsActive) return null
  return (
    <CustomAlerts
      alertIsActive={alertIsActive}
      alertStatus={alertStatus}
      alertImage={alertImage}
      alertText={alertText}
      transactionHashBalance={transactionHashBalance}
      onClose={onClose}
    />
  );
};

export default CustomAlert;
