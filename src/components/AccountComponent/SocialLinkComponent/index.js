import React, { useEffect, useRef, useState } from "react";
import {
  setSocialImage,
  setSocialImageHeight,
  setSocialImageWidth,
} from "../../../utils/socials";
import minusIcon from "../../../assets/images/marketplace/minus.svg";
import useOutsideClick from "../../../hooks/dom/useOutsideClick";
// import useWindowDimensions from "../../../../hooks/useWidowDimensions";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";

const SocialLinkComponent = ({
  isEditMode,
  link,
  index,
  onDeleteLink,
  onEditLinkList,
  isNFTPage,
}) => {
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const refLinkInput = useRef();
  const [socialLink, setSocialLink] = useState("");
  // const windowDimensions = useWindowDimensions()
  // const isMobile = windowDimensions?.width <= 850
  const theme = useSelector(selectTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    setSocialLink(link);
  }, [link]);

  const onBlurLinkInput = () => {
    setIsEditingLinks(false);
  };

  const onChangeLink = (event) => {
    setSocialLink(event?.target?.value);
    onEditLinkList(index, event?.target?.value);
  };

  useOutsideClick(refLinkInput, onBlurLinkInput);

  return (
    <div
      ref={refLinkInput}
      className={`account__plus ${
        isEditingLinks ? "account__plus--active" : ""
      } ${isNFTPage ? "account__plus--isNFTPage" : ""}`}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          isEditMode && e.preventDefault();
          isEditMode && setIsEditingLinks(!isEditingLinks);
        }}
      >
        <img
          src={setSocialImage(link, !isDark)}
          alt={""}
          width={setSocialImageWidth(link)}
          height={setSocialImageHeight(link)}
        />
        {isEditMode && (
          <img
            className="account__socials--delete"
            src={minusIcon}
            alt={"delete"}
            onClick={(e) => {
              e.preventDefault();
              onDeleteLink(link);
            }}
          />
        )}
      </a>
      {isEditMode && isEditingLinks && (
        <input
          type={"text"}
          autoFocus
          value={socialLink}
          onChange={onChangeLink}
        />
      )}
    </div>
  );
};

export default SocialLinkComponent;
