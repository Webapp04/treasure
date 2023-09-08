import React from "react";
import { default as ZoneItemStory } from "./zoneItem";

export default {
  title: "Molecules/ZoneItem",
  component: ZoneItemStory,
  argTypes: {},
};

const Template = (args) => <ZoneItemStory {...args} />;

export const ZoneItem = Template.bind({});

ZoneItem.args = {};
