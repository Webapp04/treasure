import React from "react";
import { default as KeyRewardStory } from "./keyReward";

export default {
  title: "Molecules/KeyReward",
  component: KeyRewardStory,
  argTypes: {},
};

const Template = (args) => <KeyRewardStory {...args} />;

export const KeyReward = Template.bind({});

KeyReward.args = {};
