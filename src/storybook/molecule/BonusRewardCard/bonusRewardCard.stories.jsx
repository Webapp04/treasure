import React from "react";
import { default as BonusRewardCardStory } from "./bonusRewardCard";

export default {
  title: "Molecules/BonusRewardCard",
  component: BonusRewardCardStory,
  argTypes: {},
};

const Template = (args) => <BonusRewardCardStory {...args} />;

export const BonusRewardCard = Template.bind({});

BonusRewardCard.args = {};
