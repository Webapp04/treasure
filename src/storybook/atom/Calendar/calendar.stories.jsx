import React from "react";
import { default as CalendarStory } from "./calendar";

export default {
  title: "Atom/Calendar",
  component: CalendarStory,
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <CalendarStory {...args} />;

export const Calendar = Template.bind({});

Calendar.args = {};
