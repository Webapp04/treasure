import React from "react";
import { default as FounderKeyCardStory } from "./founderKeyCard";

export default {
  title: "Molecules/FounderKeyCard",
  component: FounderKeyCardStory,
  argTypes: {},
};

const Template = (args) => <FounderKeyCardStory {...args} />;

export const FounderKeyCard = Template.bind({});

FounderKeyCard.args = {};
