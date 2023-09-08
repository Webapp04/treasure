import React from "react";
import { default as RewardBoxStory } from "./rewardBox";

export default {
  title: "Molecules/RewardBox",
  component: RewardBoxStory,
  argTypes: {},
};

const Template = (args) => <RewardBoxStory {...args} />;

export const RewardBox = Template.bind({});

RewardBox.args = {};
