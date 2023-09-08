import React from "react";
import {
  default as ButtonStory,
  ButtonCategoryTypes,
  ButtonSizes,
} from "./button";
import { IconsNames } from "../Icon/icon";

export default {
  title: "Atom/Button",
  component: ButtonStory,
  argTypes: {
    variant: {
      options: ["primary", "secondary", "outlined", "shadow"],
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
    },
    iconPosition: {
      options: ["start", "end"],
      control: { type: "select" },
    },
    iconName: {
      options: Object.values(IconsNames),
      control: { type: "select" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    onClick: {
      control: "onClick",
    },
  },
};

const Template = (args) => <ButtonStory {...args} />;

export const Button = Template.bind({});

Button.args = {
  variant: ButtonCategoryTypes.primary,
  size: ButtonSizes.small,
  label: "Button",
};
