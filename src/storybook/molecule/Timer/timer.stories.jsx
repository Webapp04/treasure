import React from "react";
import { default as TimerStory } from "./timer";

export default {
  title: "Molecules/Timer",
  component: TimerStory,
  argTypes: {},
};

const Template = (args) => <TimerStory {...args} />;

export const Timer = Template.bind({});

Timer.args = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  days: 0,
};
