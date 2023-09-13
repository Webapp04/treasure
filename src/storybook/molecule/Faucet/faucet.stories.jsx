import React from "react";
import { default as FaucetStory } from "./faucet";

export default {
  title: "Molecules/Faucet",
  component: FaucetStory,
  argTypes: {
    showFaucet: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <FaucetStory {...args} />;

export const Faucet = Template.bind({});

Faucet.args = {
  user: { wallet_id: "1" },
  showFaucet: false,
  handleToggleFaucet: () => {},
  onGetTresr: () => {},
  onGetSmrtr: () => {},
  onGetTresrLP: () => {},
  onGetSmrtrLP: () => {},
};
