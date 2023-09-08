import React from "react";
import { default as TooltipStory, TooltipPosition } from "./tooltip";
import Icon from "../Icon/icon";

export default {
  title: "Atom/Tooltip",
  component: TooltipStory,
  argTypes: {
    position: {
      options: ["top", "bottom", "left", "right"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <TooltipStory {...args} />;

export const Tooltip = Template.bind({});

Tooltip.args = {
  title: "I am a Tooltip",
  children: <Icon iconName={"infoDark"} />,
  position: TooltipPosition.right,
};
