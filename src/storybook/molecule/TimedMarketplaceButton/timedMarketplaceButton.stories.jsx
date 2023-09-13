import React from "react";
import { default as TimedMarketplaceButtonStory } from "./timedMarketplaceButton";

export default {
  title: "Molecules/TimedMarketplaceButton",
  component: TimedMarketplaceButtonStory,
  argTypes: {
    isInsufficientBalance: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    isTimeToUpgrade: {
      control: { type: "boolean" },
    },
    isUpgrade: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <TimedMarketplaceButtonStory {...args} />;

export const TimedMarketplaceButton = Template.bind({});

TimedMarketplaceButton.args = {
  isInsufficientBalance: true,
  onClick: () => {},
  disabled: false,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isTimeToUpgrade: false,
  isUpgrade: false,
};
