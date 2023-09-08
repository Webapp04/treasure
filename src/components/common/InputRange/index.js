import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectScaleValue } from "redux/slice/scaleSlice";
import InputRanges from "storybook/atom/InputRange/inputRange";

const InputRange = () => {
  const [inputBgSize, setInputBgSize] = useState("100% 100%");

  const dispatch = useDispatch();
  const scaleValue = useSelector(selectScaleValue);

  const handleChange = (event) => {
    const min = event?.target?.min;
    const max = event?.target?.max;
    const val = event?.target?.value;
    setInputBgSize(((val - min) * 100) / (max - min) + "% 100%");
    ACTIONS.SET_SCALE(dispatch, true, event?.target?.value);
  };

  return (
    <InputRanges
      scaleValue={scaleValue}
      inputBgSize={inputBgSize}
      handleChange={handleChange}
    />
  );
};

export default InputRange;
