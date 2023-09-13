import React from "react";
import { default as ZoneItemStory } from "./zoneItem";

export default {
  title: "Molecules/ZoneItem",
  component: ZoneItemStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    withInput: {
      control: { type: "boolean" },
    },
    isDisabled: {
      control: { type: "boolean" },
    },
    isMobile: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <ZoneItemStory {...args} />;

export const ZoneItem = Template.bind({});

ZoneItem.args = {
  title: "Zone Item",
  price: 0,
  amount: 0,
  setAmount: () => {},
  isDark: true,
  withInput: false,
  isDisabled: true,
  isMobile: false,
};
