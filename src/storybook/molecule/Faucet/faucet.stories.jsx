import React from "react";
import { default as FaucetStory } from "./faucet";

export default {
  title: "Molecules/Faucet",
  component: FaucetStory,
  argTypes: {},
};

const Template = (args) => <FaucetStory {...args} />;

export const Faucet = Template.bind({});

Faucet.args = {
  user: null,
  showFaucet: false,
  handleToggleFaucet: () => {},
  onGetTresr: () => {},
  onGetSmrtr: () => {},
  onGetTresrLP: () => {},
  onGetSmrtrLP: () => {},
};
