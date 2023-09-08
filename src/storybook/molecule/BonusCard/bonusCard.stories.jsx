import React from "react";
import { default as BonusCardStory } from "./bonusCard";

export default {
  title: "Molecules/BonusCard",
  component: BonusCardStory,
  argTypes: {},
};

const Template = (args) => <BonusCardStory {...args} />;

export const BonusCard = Template.bind({});

BonusCard.args = {};
