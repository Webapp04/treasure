import React from "react";
import { default as NavbarStory } from "./navbar";

export default {
  title: "Molecules/Navbar",
  component: NavbarStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <NavbarStory {...args} />;

export const Navbar = Template.bind({});

Navbar.args = {
  theme: "dark",
  totalTRESRBalance: 0,
  loaderComponentActive: false,
  user: null,
  isDark: true,
  balanceAvax: 1.969,
  titleWalletAddress: "0x8905849EAe2FE48A199009CBc8D26018e5D36627",
  avaxBalance: 0,
  balanceSmrtr: 0,
  balanceTresr: 0,
  veClaimedTresr: 0,
  balanceLpSMRTRAVAX: 0,
  balanceLpTRESRAVAX: 0,
  onDisconnect: () => {},
  onGetTresr: () => {},
  onGetSmrtr: () => {},
  onGetTresrLP: () => {},
  onGetSmrtrLP: () => {},
  handleLoader: () => {},
  handleAuth: () => {},
};
