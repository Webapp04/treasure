import React from "react";
import { default as SingleSelectStory } from "./singleSelect";

export default {
  title: "Atom/SingleSelect",
  component: SingleSelectStory,
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
  },
};

const Template = (args) => <SingleSelectStory {...args} />;

export const SingleSelect = Template.bind({});

SingleSelect.args = {
  placeholder: "SingleSelect",
  options: [
    { label: "Select1", value: "1" },
    { label: "Select2", value: "2" },
    { label: "Select3", value: "3" },
  ],
  value: null,
  onSelect: () => {},
};
