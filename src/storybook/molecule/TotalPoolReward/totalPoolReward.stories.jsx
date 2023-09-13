import React from "react";
import { default as TotalPoolRewardStory } from "./totalPoolReward";

export default {
  title: "Molecules/TotalPoolReward",
  component: TotalPoolRewardStory,
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
    isDark: {
      control: { type: "boolean" },
    },
    flag: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <TotalPoolRewardStory {...args} />;

export const TotalPoolReward = Template.bind({});

TotalPoolReward.args = {
  isOpen: true,
  isDark: true,
  flag: true,
  onToggleDetails: () => {},
  balanceAll: 0,
  ownTokenRewardList: [],
  balanceBonusAll: 0,
  onClickClaimAllRewards: () => {},
};
