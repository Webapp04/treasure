import React from "react";
import { default as ProfileStory } from "./profile";

export default {
  title: "Molecules/Profile",
  component: ProfileStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    isAccountOpen: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <ProfileStory {...args} />;

export const Profile = Template.bind({});

Profile.args = {
  user: null,
  isDark: true,
  isAccountOpen: false,
  balanceAvax: 1.969,
  openConnectWalletModal: () => {},
  titleWalletAddress: "0x8905849EAe2FE48A199009CBc8D26018e5D36627",
  navigateToAccount: () => {},
  avaxBalance: 0,
  balanceSmrtr: 0,
  balanceTresr: 0,
  veClaimedTresr: 0,
  balanceLpSMRTRAVAX: 0,
  balanceLpTRESRAVAX: 0,
  onDisconnect: () => {},
  setIsAccountOpen: () => {},
};
