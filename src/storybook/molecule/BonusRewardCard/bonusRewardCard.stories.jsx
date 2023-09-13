import React from "react";
import { default as BonusRewardCardStory } from "./bonusRewardCard";

export default {
  title: "Molecules/BonusRewardCard",
  component: BonusRewardCardStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    isTRESR: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <BonusRewardCardStory {...args} />;

export const BonusRewardCard = Template.bind({});

BonusRewardCard.args = {
  isTRESR: true,
  isDark: true,
  balanceLPStaked: 0,
  onClickStake: () => {},
  onClickUnStake: () => {},
  balanceLP: 0,
  poolShareCalc: 0,
  communityLPStaked: 0,
};
