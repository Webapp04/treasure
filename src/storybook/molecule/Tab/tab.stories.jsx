import React from "react";
import { default as TabStory, TabType } from "./tab";

export default {
  title: "Molecules/Tab",
  component: TabStory,
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <TabStory {...args} />;

export const Tab = Template.bind({});

Tab.args = {
  variant: TabType.primary,
  tabList: [
    { label: "All Keys", value: "All Keys" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ],
  active: null,
  onClick: () => {},
};
