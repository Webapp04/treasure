import React from "react";
import { default as ConnectWalletStory } from "./connectWallet";

export default {
  title: "Molecules/ConnectWallet",
  component: ConnectWalletStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    isMobile: {
      control: { type: "boolean" },
    },
    isNotConnected: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <ConnectWalletStory {...args} />;

export const ConnectWallet = Template.bind({});

ConnectWallet.args = {
  isLoading: true,
  isMobile: false,
  isNotConnected: true,
  openConnectWalletModal: () => {},
};
