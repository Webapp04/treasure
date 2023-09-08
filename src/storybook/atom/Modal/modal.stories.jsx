import React from "react";
import { default as ModalStory } from "./modal";

export default {
  title: "Atom/Modal",
  component: ModalStory,
  argTypes: {},
};

const Template = (args) => <ModalStory {...args} />;

export const Modal = Template.bind({});

Modal.args = {};
