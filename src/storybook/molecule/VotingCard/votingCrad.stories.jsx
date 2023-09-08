import React from "react";
import { default as VotingCardStory } from "./votingCard";

export default {
  title: "Molecules/VotingCard",
  component: VotingCardStory,
  argTypes: {},
};

const Template = (args) => <VotingCardStory {...args} />;

export const VotingCard = Template.bind({});

VotingCard.args = {};
