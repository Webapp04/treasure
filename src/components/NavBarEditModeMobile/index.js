import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import AccountComponent from "../AccountComponent";
import uploadImg from "../../assets/images/marketplace/upload.svg";
import defaultBanner from "../../assets/images/marketplace/navbar_banner.jpg";
import { customStylesMobile } from "./stylesMobile";
import useHandleCustomer from "../../hooks/customer/useHandleCustomer";
import { customStylesTablet } from "./stylesTablet";
import useWindowDimensions from "../../hooks/useWidowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";

const NavBarEditModeMobile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const fileRef = useRef();
  const [banner, setBanner] = useState();
  const handleCustomer = useHandleCustomer();
  const [userInfo, setUserInfo] = useState({});
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 450;
  const isDark = theme === "dark";

  useEffect(() => {
    setBanner(user?.banner?.length ? user?.banner : defaultBanner);
  }, [user]);

  const uploadImage = (event) => {
    let reader = new FileReader();
    reader.readAsDataURL(event?.target?.files[0]);
    reader.onload = function () {
      setBanner(reader.result);
      ACTIONS.SET_ACCOUNT_BANNER_IMAGE(dispatch, reader.result);
    };
  };

  const onSave = () => {
    const { account, linkList, avatar } = userInfo;
    handleCustomer.updateInfo({
      name: account,
      links: linkList,
      avatar: avatar,
      banner: banner,
    });
    onClose();
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onClose}
      custom
      className="max-h-[586px]"
    >
      <div className={"editModal"}>
        <AccountComponent isEditMode={true} setUserInfo={setUserInfo} />

        <div
          className={"uploadImg"}
          onClick={() => fileRef?.current?.click()}
          style={{ backgroundImage: `url(${banner})` }}
        >
          <img src={uploadImg} alt={""} />
          <p>Upload baner image</p>
          <input
            type={"file"}
            ref={fileRef}
            hidden
            multiple
            onChange={uploadImage}
          />
        </div>
      </div>

      <div className={"editModal__buttons"}>
        <div className={"account__save account__cancel"} onClick={onCancel}>
          Cancel
        </div>
        <div className={"account__save"} onClick={onSave}>
          Save
        </div>
      </div>
    </Modal>
  );
};

export default NavBarEditModeMobile;
