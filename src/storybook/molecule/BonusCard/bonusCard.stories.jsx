import React from "react";
import { default as BonusCardStory } from "./bonusCard";

export default {
  title: "Molecules/BonusCard",
  component: BonusCardStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    isMobile: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <BonusCardStory {...args} />;

export const BonusCard = Template.bind({});

BonusCard.args = {
  isDark: true,
  isMobile: true,
  totalRewards: 0,
  onClaimBonus: () => {},
  claimableBonusTotalReward: 0,
  comulativeKeyLevel: 0,
  veTresrSharePBalance: 0,
  claimableBonusVeTresrReward: 0,
  lpTotalStakedSMRTRAVAXBalance: 0,
  claimableBonusJlpSmartrReward: 0,
  lpTotalStakedTRESRAVAXBalance: 0,
  claimableBonusJlpTresrReward: 0,
  keyLevelPBalance: 0,
  claimableBonusKeyLevelReward: 0,
};
