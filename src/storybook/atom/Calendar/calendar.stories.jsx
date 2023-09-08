import React from "react";
import { default as CalendarStory } from "./calendar";

export default {
  title: "Atom/Calendar",
  component: CalendarStory,
  argTypes: {},
};

const Template = (args) => <CalendarStory {...args} />;

export const Calendar = Template.bind({});

Calendar.args = {};
