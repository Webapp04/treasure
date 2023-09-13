import React from "react";
import { default as WalletCardStory } from "./walletCard";

export default {
  title: "Molecules/WalletCard",
  component: WalletCardStory,
  argTypes: {
    isMobile: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <WalletCardStory {...args} />;

export const WalletCard = Template.bind({});

WalletCard.args = {
  isMobile: false,
};
