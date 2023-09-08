import React from "react";
import { default as FounderKeyTabStory } from "./founderKeyTab";

export default {
  title: "Molecules/FounderKeyTab",
  component: FounderKeyTabStory,
  argTypes: {},
};

const Template = (args) => <FounderKeyTabStory {...args} />;

export const FounderKeyTab = Template.bind({});

FounderKeyTab.args = {};
