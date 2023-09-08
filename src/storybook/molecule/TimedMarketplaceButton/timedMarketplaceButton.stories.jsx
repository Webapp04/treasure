import React from "react";
import { default as TimedMarketplaceButtonStory } from "./timedMarketplaceButton";

export default {
  title: "Molecules/TimedMarketplaceButton",
  component: TimedMarketplaceButtonStory,
  argTypes: {},
};

const Template = (args) => <TimedMarketplaceButtonStory {...args} />;

export const TimedMarketplaceButton = Template.bind({});

TimedMarketplaceButton.args = {};
