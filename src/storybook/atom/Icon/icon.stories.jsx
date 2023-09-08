import React from "react";
import { default as IconStory, IconsNames } from "./icon";

export default {
  title: "Atom/Icon",
  component: IconStory,
  argTypes: {},
};

const Template = (args) => <IconStory {...args} />;

export const Icon = Template.bind({});
Icon.args = {
  iconName: IconsNames.checkGreen,
};
