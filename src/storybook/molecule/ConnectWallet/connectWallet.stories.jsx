import React from "react";
import { default as ConnectWalletStory } from "./connectWallet";

export default {
  title: "Molecules/ConnectWallet",
  component: ConnectWalletStory,
  argTypes: {},
};

const Template = (args) => <ConnectWalletStory {...args} />;

export const ConnectWallet = Template.bind({});

ConnectWallet.args = {};
