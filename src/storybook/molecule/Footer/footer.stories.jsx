import React from "react";
import { default as FooterStory, SOCIALS_FOOTER } from "./footer";
import { NAV_LINKS_FOOTER } from "constant/singleNFTPage";

export default {
  title: "Molecules/Footer",
  component: FooterStory,
  argTypes: {
    isDarkTheme: {
      control: { type: "boolean" },
    },
    isMobile: {
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => <FooterStory {...args} />;

export const Footer = Template.bind({});

Footer.args = {
  isMobile: false,
  isDarkTheme: true,
  socials: SOCIALS_FOOTER,
  filterNavigationList: NAV_LINKS_FOOTER,
};
