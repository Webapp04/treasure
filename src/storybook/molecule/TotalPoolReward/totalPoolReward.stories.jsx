import React from "react";
import { default as TotalPoolRewardStory } from "./totalPoolReward";

export default {
  title: "Molecules/TotalPoolReward",
  component: TotalPoolRewardStory,
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <TotalPoolRewardStory {...args} />;

export const TotalPoolReward = Template.bind({});

TotalPoolReward.args = {};
