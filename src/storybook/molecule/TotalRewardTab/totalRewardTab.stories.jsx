import React from "react";
import { default as TotalRewardTabStory } from "./totalRewardTab";

export default {
  title: "Molecules/TotalRewardTab",
  component: TotalRewardTabStory,
  argTypes: {
    loaderComponentActive: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <TotalRewardTabStory {...args} />;

export const TotalRewardTab = Template.bind({});

TotalRewardTab.args = {
  totalTRESRBalance: 0,
  loaderComponentActive: false,
  tooltipTitle: "Est for all keys",
  tooltipPosition: "bottom",
};
