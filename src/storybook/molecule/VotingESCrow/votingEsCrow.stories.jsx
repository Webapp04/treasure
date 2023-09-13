import React from "react";
import { default as VotingEsCrowStory } from "./votinEsCrow";

export default {
  title: "Molecules/VotingEsCrow",
  component: VotingEsCrowStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    flag: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <VotingEsCrowStory {...args} />;

export const VotingEsCrow = Template.bind({});

VotingEsCrow.args = {
  flag: true,
  isDark: true,
  onClickStake: () => {},
  onClickUnStake: () => {},
  stakedAll: 0,
  tresrBalance: 0,
  tresrStakedAllBalance: 0,
  balanceEstDailyVeTRESR: 0,
};
