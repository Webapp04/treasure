import React from "react";
import { default as InputRangeStory } from "./inputRange";

export default {
  title: "Atom/InputRange",
  component: InputRangeStory,
  argTypes: {
    scaleValue: {
      control: { type: "number" },
    },
  },
};

const Template = (args) => <InputRangeStory {...args} />;

export const InputRange = Template.bind({});

InputRange.args = {
  handleChange: () => {},
};
