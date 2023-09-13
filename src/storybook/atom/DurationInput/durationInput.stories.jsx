import React from "react";
import { default as DurationInputStory } from "./durationInput";

export default {
  title: "Atom/DurationInput",
  component: DurationInputStory,
  argTypes: {
    isDark: {
      control: { type: "boolean" },
    },
    isOpen: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <DurationInputStory {...args} />;

export const DurationInput = Template.bind({});

DurationInput.args = {
  isDark: true,
  selectedDuration: 0,
  onChangeDuration: () => {},
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
  handleCalendarClose: () => {},
};
