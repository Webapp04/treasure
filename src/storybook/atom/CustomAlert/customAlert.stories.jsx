import React from "react";
import { default as CustomAlertStory } from "./customAlert";

export default {
  title: "Atom/CustomAlert",
  component: CustomAlertStory,
  argTypes: {},
};

const Template = (args) => <CustomAlertStory {...args} />;

export const CustomAlert = Template.bind({});

CustomAlert.args = {};
