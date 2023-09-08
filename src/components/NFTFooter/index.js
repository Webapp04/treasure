import React, { useEffect, useState } from "react";
import {
  NAV_LINKS_FOOTER,
  SOCIALS_FOOTER,
  SOCIALS_FOOTER_LIGHT,
} from "constant/singleNFTPage";
import { useSelector } from "react-redux";
import { selectNftSelected } from "redux/slice/nftSlice";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import Footer from "storybook/molecule/Footer/footer";
import useWindowDimensions from "hooks/useWidowDimensions";

const NFTFooter = () => {
  const nftSelected = useSelector(selectNftSelected);
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 640;
  const isDarkTheme = theme === "dark";
  const [socials, setSocials] = useState(SOCIALS_FOOTER);

  useEffect(() => {
    isDarkTheme ? setSocials(SOCIALS_FOOTER_LIGHT) : setSocials(SOCIALS_FOOTER);
  }, [isDarkTheme]);

  const filterNavigationList = NAV_LINKS_FOOTER?.filter((item) =>
    item?.isUser ? user?._id : true
  )?.filter((item) => (item?.isToken ? nftSelected : true));

  return (
    <Footer
      isMobile={isMobile}
      isDarkTheme={isDarkTheme}
      socials={socials}
      filterNavigationList={filterNavigationList}
    />
  );
};

export default NFTFooter;
