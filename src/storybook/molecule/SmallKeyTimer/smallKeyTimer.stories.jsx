import React from "react";
import { default as SmallKeyTimerStory } from "./smallKeyTimer";

export default {
  title: "Molecules/SmallKeyTimer",
  component: SmallKeyTimerStory,
  argTypes: {
    isActive: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <SmallKeyTimerStory {...args} />;

export const SmallKeyTimer = Template.bind({});

SmallKeyTimer.args = {
  isActive: true,
};
