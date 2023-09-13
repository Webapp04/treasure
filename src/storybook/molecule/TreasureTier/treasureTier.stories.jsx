import React from "react";
import { default as TreasureTireStory } from "./treasureTier";

export default {
  title: "Molecules/TreasureTire",
  component: TreasureTireStory,
  argTypes: {},
};

const Template = (args) => <TreasureTireStory {...args} />;

export const TreasureTire = Template.bind({});

TreasureTire.args = {
  progressWidth: 50,
};
