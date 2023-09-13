import React from "react";
import { default as AccountCardStory } from "./accountCard";

export default {
  title: "Molecules/AccountCard",
  component: AccountCardStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    isMobile: {
      control: { type: "boolean" },
    },
    isAccountOpen: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <AccountCardStory {...args} />;

export const AccountCard = Template.bind({});

AccountCard.args = {
  isDark: true,
  isMobile: true,
  isAccountOpen: false,
  balanceAvax: 0,
  balanceSmrtr: 0,
  balanceTresr: 0,
  veClaimedTresr: 0,
  balanceLpSMRTRAVAX: 0,
  balanceLpTRESRAVAX: 0,
};
