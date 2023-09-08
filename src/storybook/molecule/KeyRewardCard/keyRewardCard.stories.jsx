import React from "react";
import { default as KeyRewardCardStory } from "./keyRewardCard";

export default {
  title: "Molecules/KeyRewardCard",
  component: KeyRewardCardStory,
  argTypes: {},
};

const Template = (args) => <KeyRewardCardStory {...args} />;

export const KeyRewardCard = Template.bind({});

KeyRewardCard.args = {};
