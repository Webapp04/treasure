import React from "react";
import { default as PoolRewardStory } from "./poolReward";

export default {
  title: "Molecules/PoolReward",
  component: PoolRewardStory,
  argTypes: {
    flag: {
      control: { type: "boolean" },
    },
    isDark: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <PoolRewardStory {...args} />;

export const PoolReward = Template.bind({});

PoolReward.args = {
  flag: true,
  isDark: true,
  onclaimVeTresr: () => {},
  veTresrBalance: 0,
  veClaimedTresr: 0,
  balanceVeTresrPerHour: 0,
  balanceMaxAvailable: 0,
  balanceEstDaysToMax: 0,
};
