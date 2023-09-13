import React from "react";
import { iconMap } from "./index";

export const IconsNames = {
  checkGreen: "checkGreen",
  arrow: "arrow",
  exitDark: "exitDark",
  exitLight: "exitLight",
  close: "close",
  infoLight: "infoLight",
  infoDark: "infoDark",
  logo: "logo",
  eye: "eye",
  wallet: "wallet",
  instaImg: "instaImg",
  instaImgLight: "instaImgLight",
  discordImg: "discordImg",
  discordImgLight: "discordImgLight",
  facebookImg: "facebookImg",
  facebookImgLight: "facebookImgLight",
  twitterImg: "twitterImg",
  twitterImgLight: "twitterImgLight",
  userLight: "userLight",
  userDark: "userDark",
  avaxImg: "avaxImg",
  smrtrImg: "smrtrImg",
  smrtrLpImg: "smrtrLpImg",
  tresrImg: "tresrImg",
  tresrLPImg: "tresrLPImg",
  disconnectLight: "disconnectLight",
  disconnectDark: "disconnectDark",
  burgerLight: "burgerLight",
  burgerDark: "burgerDark",
  refresh: "refresh",
  cross: "cross",
  viewImg: "viewImg",
  arrowDownBlack: "arrowDownBlack",
  arrowDownWhite: "arrowDownWhite",
  arrowLightBlue: "arrowLightBlue",
};

const Icon = ({ iconName, className, fill = "#ffffff", ...rest }) => {
  const IconComponent = iconMap[iconName];

  if (IconComponent === undefined) {
    console.warn(`Icon with name: ${iconName} not found.`);
    return <></>;
  }
  return <IconComponent className={className} {...rest} fill={fill} />;
};

export default Icon;
