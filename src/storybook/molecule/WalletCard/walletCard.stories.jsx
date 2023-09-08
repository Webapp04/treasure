import React from "react";
import { default as WalletCardStory } from "./walletCard";

export default {
  title: "Molecules/WalletCard",
  component: WalletCardStory,
  argTypes: {},
};

const Template = (args) => <WalletCardStory {...args} />;

export const WalletCard = Template.bind({});

WalletCard.args = {
  isMobile: false,
};
