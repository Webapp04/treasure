import React from "react";
import { default as CustomAlertStory } from "./customAlert";

export default {
  title: "Atom/CustomAlert",
  component: CustomAlertStory,
  argTypes: {
    alertIsActive: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <CustomAlertStory {...args} />;

export const CustomAlert = Template.bind({});

CustomAlert.args = {
  alertIsActive: true,
  alertStatus: "customAlert__success",
  alertText: "Alert",
  transactionHashBalance: 0,
  onClose: () => {},
};
