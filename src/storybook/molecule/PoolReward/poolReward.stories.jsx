import React from "react";
import { default as PoolRewardStory } from "./poolReward";

export default {
  title: "Molecules/PoolReward",
  component: PoolRewardStory,
  argTypes: {},
};

const Template = (args) => <PoolRewardStory {...args} />;

export const PoolReward = Template.bind({});

PoolReward.args = {};
