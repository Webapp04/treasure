import React from "react";
import { default as TimeInputStory } from "./timeInput";

export default {
  title: "Atom/TimeInput",
  component: TimeInputStory,
  argTypes: {},
};

const Template = (args) => <TimeInputStory {...args} />;

export const TimeInput = Template.bind({});

TimeInput.args = {};
