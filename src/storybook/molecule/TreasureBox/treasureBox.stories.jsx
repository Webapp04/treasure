import React from "react";
import { default as TreasureBoxStory } from "./treasureBox";

export default {
  title: "Molecules/TreasureBox",
  component: TreasureBoxStory,
  argTypes: {},
};

const Template = (args) => <TreasureBoxStory {...args} />;

export const TreasureBox = Template.bind({});

TreasureBox.args = {};
