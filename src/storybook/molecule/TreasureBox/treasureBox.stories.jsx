import React from "react";
import { default as TreasureBoxStory } from "./treasureBox";

export default {
  title: "Molecules/TreasureBox",
  component: TreasureBoxStory,
  argTypes: {
    isAnimated: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <TreasureBoxStory {...args} />;

export const TreasureBox = Template.bind({});

TreasureBox.args = {
  isAnimated: false,
  openAttemptTitle: "0 TRESER",
  nextTierEstTitle: "0 TRESER",
};
