import React from "react";
import { default as VotingCardStory } from "./votingCard";

export default {
  title: "Molecules/VotingCard",
  component: VotingCardStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    flag: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <VotingCardStory {...args} />;

export const VotingCard = Template.bind({});

VotingCard.args = {
  flag: true,
  isDark: true,
  onClickStake: () => {},
  onClickUnStake: () => {},
  stakedAll: 0,
  tresrBalance: 0,
  tresrStakedAllBalance: 0,
  balanceEstDailyVeTRESR: 0,
  onclaimVeTresr: () => {},
  veTresrBalance: 0,
  veClaimedTresr: 0,
  balanceVeTresrPerHour: 0,
  balanceMaxAvailable: 0,
  balanceEstDaysToMax: 0,
};
