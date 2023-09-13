import React from "react";
import { default as ModalStory } from "./modal";

export default {
  title: "Atom/Modal",
  component: ModalStory,
  argTypes: {
    withCrossIcon: {
      control: { type: "boolean" },
    },
    isDark: {
      control: { type: "boolean" },
    },
    isFullModalBg: {
      control: { type: "boolean" },
    },
    withoutBlur: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <ModalStory {...args} />;

export const Modal = Template.bind({});

Modal.args = {
  handleClose: () => {},
  withCrossIcon: false,
  isDark: true,
  isFullModalBg: false,
};
