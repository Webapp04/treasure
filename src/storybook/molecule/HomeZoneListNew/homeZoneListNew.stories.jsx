import React from "react";
import { default as HomeZoneListNewStory } from "./homeZoneListNew";

export default {
  title: "Molecules/HomeZoneListNew",
  component: HomeZoneListNewStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    isMobile: {
      control: { type: "boolean" },
    },
    loaderIsActive: {
      control: { type: "boolean" },
    },
    isZone1: {
      control: { type: "boolean" },
    },
    isZone2: {
      control: { type: "boolean" },
    },
    isZone3: {
      control: { type: "boolean" },
    },
    isZone4: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <HomeZoneListNewStory {...args} />;

export const HomeZoneListNew = Template.bind({});

HomeZoneListNew.args = {
  isMobile: false,
  loaderIsActive: false,
  isDark: true,
  isZone1: false,
  isZone2: false,
  isZone3: false,
  isZone4: false,
  setZoneChecked: () => {},
  zoneAmount: 0,
  setZoneAmount: () => {},
  zoneSumAmount: 0,
};
