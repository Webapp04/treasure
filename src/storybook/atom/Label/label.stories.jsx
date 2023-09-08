import React from "react";
import { default as LabelStory, LabelCategoryTypes, LabelSizes } from "./label";

export default {
  title: "Atom/Label",
  component: LabelStory,
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium", "large", "extraLarge"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <LabelStory {...args} />;

export const Label = Template.bind({});

Label.args = {
  variant: LabelCategoryTypes.primary,
  size: LabelSizes.small,
  label: "Label",
};
