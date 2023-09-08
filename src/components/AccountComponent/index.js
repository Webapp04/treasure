import React, { useEffect, useRef, useState } from "react";
import avatarImg from "../../assets/images/marketplace/avatar.jpg";
import editImg from "../../assets/images/marketplace/edit.svg";
import editImgLight from "../../assets/images/marketplace/darkTheme/edit_light.svg";
import plusIcon from "../../assets/images/marketplace/plus.svg";
import plusIconLight from "../../assets/images/plus.svg";
import "./style.scss";
import moreImg from "../../assets/images/marketplace/moreImg.svg";
import copyImg from "../../assets/images/marketplace/icon-copy.svg";
import copyImgLight from "../../assets/images/marketplace/darkTheme/copy_light.svg";
import checkMark from "../../assets/images/marketplace/checkMark.svg";
import checkMarkLight from "../../assets/images/marketplace/darkTheme/checkMarkLight.svg";
import uploadImg from "../../assets/images/marketplace/upload.svg";
import useOutsideClick from "../../hooks/dom/useOutsideClick";
import SocialLinkComponent from "./SocialLinkComponent";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";

const AccountComponent = ({ isEditMode, setIsOpenModal, setUserInfo }) => {
  const textRef = useRef();
  const fileRef = useRef();
  const refAddLinkInput = useRef();

  const [isCopied, setIsCopied] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const [account, setAccount] = useState("");
  const [linkList, setLinkList] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [avatar, setAvatar] = useState(avatarImg);
  const isDark = theme === "dark";

  const onAccountChange = (value) => {
    setAccount(value?.target?.value);
  };

  const onCopyImg = () => {
    navigator.clipboard.writeText(textRef?.current?.value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const onEditLinkList = (index, link) =>
    setLinkList(linkList?.map((item, key) => (key === index ? link : item)));
  const onDeleteLink = (link) =>
    setLinkList(linkList?.filter((item) => item !== link));
  const onAddLink = (event) => setNewLink(event?.target?.value);

  const onBlurLinkInput = () => {
    setIsEditingLinks(false);
    if (!newLink?.length) return;
    setLinkList([...linkList, newLink]);
    setNewLink("");
  };

  const onSetAddLink = () => {
    setIsEditingLinks(!isEditingLinks);
    if (!newLink?.length) return;
    setLinkList([...linkList, newLink]);
    setNewLink("");
  };

  const uploadImage = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event?.target?.files[0]);
    reader.onload = function () {
      setAvatar(reader.result);
    };
  };

  const onClickTreeDots = () => setIsOpenDropdown(!isOpenDropdown);

  const onClickEdit = () => {
    setIsOpenDropdown(false);
    setIsOpenModal(true);
  };

  const onClickReport = () => setIsOpenDropdown(false);

  useOutsideClick(refAddLinkInput, onBlurLinkInput);

  useEffect(() => {
    if (user?._id) {
      setAccount(user?.name || "Account 1");
      setLinkList(user?.links || []);
      setAvatar(user?.avatar?.length ? user?.avatar : avatarImg);
    }
  }, [user]);

  useEffect(() => {
    setUserInfo && setUserInfo({ account, linkList, avatar });
  }, [account, linkList, avatar, setUserInfo]);

  return (
    <div
      className={`account__container ${
        isEditMode && "account__container--editMode"
      }`}
    >
      {!isEditMode && (
        <div className={"navbar__more"} onClick={onClickTreeDots}>
          <img src={moreImg} alt={"more"} />
        </div>
      )}

      {isOpenDropdown && (
        <div className="navbar__banner--editContainer">
          <p className="navbar__banner--edit" onClick={onClickEdit}>
            Edit
          </p>
          <p className="navbar__banner--edit" onClick={onClickReport}>
            Report
          </p>
        </div>
      )}

      <div className={"avatar"}>
        <img src={avatar} alt={"avatar"} className={"avatar__photo"} />
        {isEditMode && (
          <>
            <input
              type={"file"}
              ref={fileRef}
              hidden
              multiple
              onChange={uploadImage}
            />
            <div
              onClick={() => fileRef.current.click()}
              className={"avatar__upload"}
            >
              <img src={uploadImg} alt="upload new" />
            </div>
          </>
        )}
      </div>

      <div className="account__info">
        <div className={"account__name"}>
          {isEditingAccount && (
            <input
              type={"text"}
              value={account}
              autoFocus
              onChange={onAccountChange}
              onBlur={() => setIsEditingAccount(false)}
            />
          )}
          {!isEditingAccount && <p>{account}</p>}
          {isEditMode && !isEditingAccount && (
            <img
              src={isDark ? editImgLight : editImg}
              alt={"edit"}
              onClick={() => setIsEditingAccount(true)}
            />
          )}
        </div>
        <div className={"navbar__account"}>
          <p className={"account__address"}>
            {user?.wallet_id?.slice(0, 9) + "..." + user?.wallet_id?.slice(-9)}
          </p>
          <input
            value={user?.wallet_id}
            ref={textRef}
            hidden
            onChange={() => {}}
          />
          {!isEditMode && !isCopied && (
            <img
              src={isDark ? copyImgLight : copyImg}
              alt={"copy"}
              onClick={onCopyImg}
            />
          )}
          {isCopied && (
            <img
              src={isDark ? checkMarkLight : checkMark}
              width={15}
              height={15}
              alt={"copied"}
            />
          )}
        </div>

        <div className={"account__socials"}>
          {linkList?.map((item, key) => (
            <SocialLinkComponent
              key={key}
              isEditMode={isEditMode}
              link={item}
              index={key}
              onEditLinkList={onEditLinkList}
              onDeleteLink={onDeleteLink}
            />
          ))}
          {isEditMode && (
            <div
              ref={refAddLinkInput}
              className={`account__plus ${
                isEditingLinks ? "account__plus--active" : ""
              }`}
              onClick={onSetAddLink}
            >
              <img src={isDark ? plusIconLight : plusIcon} alt={"add"} />
              {isEditingLinks && (
                <input
                  type={"text"}
                  autoFocus
                  value={newLink}
                  onChange={onAddLink}
                />
              )}
              <p className={"account__tooltip"}>Type or paste URL</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AccountComponent;
