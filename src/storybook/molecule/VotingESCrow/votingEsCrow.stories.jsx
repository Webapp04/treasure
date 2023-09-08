import React from "react";
import { default as VotingEsCrowStory } from "./votinEsCrow";

export default {
  title: "Molecules/VotingEsCrow",
  component: VotingEsCrowStory,
  argTypes: {},
};

const Template = (args) => <VotingEsCrowStory {...args} />;

export const VotingEsCrow = Template.bind({});

VotingEsCrow.args = {};
