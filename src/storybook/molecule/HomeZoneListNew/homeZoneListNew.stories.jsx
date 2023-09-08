import React from "react";
import { default as HomeZoneListNewStory } from "./homeZoneListNew";

export default {
  title: "Molecules/HomeZoneListNew",
  component: HomeZoneListNewStory,
  argTypes: {},
};

const Template = (args) => <HomeZoneListNewStory {...args} />;

export const HomeZoneListNew = Template.bind({});

HomeZoneListNew.args = {
  isMobile: false,
  loaderIsActive: false,
  isDark: true,
};
