import React from "react";
import { default as NavbarStory } from "./navbar";

export default {
  title: "Molecules/Navbar",
  component: NavbarStory,
  argTypes: {},
};

const Template = (args) => <NavbarStory {...args} />;

export const Navbar = Template.bind({});

Navbar.args = {};
