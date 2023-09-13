import React from "react";
import {
  default as LoaderStory,
  LoaderTypes,
  LoaderSizes,
  LoaderSpeeds,
} from "./loader";

export default {
  title: "Atom/Loader",
  component: LoaderStory,
  argTypes: {
    variant: {
      options: ["primary", "secondary", "pageLoader", "fullPageLoader"],
      control: { type: "select" },
    },
    size: {
      options: ["extraSmall", "small", "medium", "large"],
      control: { type: "select" },
    },
    speed: {
      options: ["slow", "normal", "fast"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <LoaderStory {...args} />;

export const Loader = Template.bind({});

Loader.args = {
  variant: LoaderTypes.secondary,
  size: LoaderSizes.small,
  speed: LoaderSpeeds.normal,
  isLoaderActive: true,
  opacityLevel: 3,
  customClass: "",
};
