import React from "react";
import { default as FounderKeyTabStory } from "./founderKeyTab";

export default {
  title: "Molecules/FounderKeyTab",
  component: FounderKeyTabStory,
  argTypes: {
    isAnimated: {
      control: { type: "boolean" },
    },
    staked: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <FounderKeyTabStory {...args} />;

export const FounderKeyTab = Template.bind({});

FounderKeyTab.args = {
  tokenId: 0,
  tier: 0,
  staked: true,
  isAnimated: false,
  onNFKey: () => {},
  spaceThumbnailSmall:
    "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg",
};
