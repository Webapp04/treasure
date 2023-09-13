import React from "react";
import { default as KeyRewardCardStory } from "./keyRewardCard";

export default {
  title: "Molecules/KeyRewardCard",
  component: KeyRewardCardStory,
  argTypes: {
    isMobile: {
      control: { type: "boolean" },
    },
    loaderComponentActive: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <KeyRewardCardStory {...args} />;

export const KeyRewardCard = Template.bind({});

KeyRewardCard.args = {
  isMobile: false,
  tokenID: 0,
  loaderComponentActive: false,
  totalMonthlyBaseReward: 0,
  claimedBonusTotalReward: 0,
  onClickClaimAllBaseRewards: () => {},
  balanceMonthlyTresr: 0,
  balanceTresrRewards: 0,
  onClickClaimBaseRewards: () => {},
};
