import React from "react";
import { default as AccountCardStory } from "./accountCard";

export default {
  title: "Molecules/AccountCard",
  component: AccountCardStory,
  argTypes: {},
};

const Template = (args) => <AccountCardStory {...args} />;

export const AccountCard = Template.bind({});

AccountCard.args = {
  isDark: true,
  isMobile: true,
};
