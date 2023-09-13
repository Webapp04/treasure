import React from "react";
import "./style.scss";
import WalletCard from "../WalletCard/walletCard";
import logoLightIcon from "../../atom/Icon/svg/logo-dark.svg";
import logoDarkIcon from "../../atom/Icon/svg/logo-dark.svg";
import { NavLink } from "react-router-dom";
import Icon from "storybook/atom/Icon/icon";

export const SOCIALS_FOOTER = [
  { image: "twitterImgLight" },
  { image: "discordImgLight" },
  { image: "instaImgLight" },
  { image: "facebookImgLight" },
];

const Footer = ({ isMobile, isDarkTheme, socials, filterNavigationList }) => {
  return (
    <div className={"singleNFTFooter"}>
      <div className={"singleNFTFooter__container"}>
        <div className={"singleNFTFooter__content"}>
          <div className={"singleNFTFooter__block1"}>
            <img
              src={isDarkTheme ? logoLightIcon : logoDarkIcon}
              alt={""}
              width={116}
              height={38}
            />
            <div>
              <div className="Footer_joinText">Join the community</div>
              <div className={"singleNFTFooter__socials"}>
                {socials?.map((item, key) => (
                  <div key={key}>
                    <a href={item?.link} target="_blank">
                      <Icon iconName={`${item?.image}`} fill="#ffffff" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={"singleNFTFooter__links"}>
            {filterNavigationList.map((item, key) => (
              <NavLink
                to={item.path}
                key={key}
                className={"singleNFTFooter__link"}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="singleNFTFooter__walletcard">
            <WalletCard isMobile={isMobile} />
          </div>
        </div>
      </div>
      <div className="singleNFTFooter__copyright">
        <p className="">
          Copyright © 2023 Founder’s Key Platform. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
