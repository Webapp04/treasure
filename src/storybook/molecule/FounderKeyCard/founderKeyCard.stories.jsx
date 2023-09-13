import React from "react";
import { default as FounderKeyCardStory } from "./founderKeyCard";

const tokenList = [
  {
    isActive: true,
    tokenId: 0,
    tier: 0,
    chestProgressLineWidth: 50,
    tierTresr: 0,
    staked: true,
    isAnimated: true,
    percentToUpgrade: 100,
    onNFKey: () => {},
    spaceThumbnailSmall:
      "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  {
    isActive: false,
    tokenId: 0,
    tier: 0,
    chestProgressLineWidth: 50,
    tierTresr: 0,
    staked: true,
    isAnimated: true,
    percentToUpgrade: 100,
    onNFKey: () => {},
    spaceThumbnailSmall:
      "https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
];

export default {
  title: "Molecules/FounderKeyCard",
  component: FounderKeyCardStory,
  argTypes: {
    isAnimated: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <FounderKeyCardStory {...args} />;

export const FounderKeyCard = Template.bind({});

FounderKeyCard.args = {
  setActiveDropdownItem: () => {},
  setActiveFilter: () => {},
  filterTokenList: [...tokenList],
  isAnimated: false,
};
