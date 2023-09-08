import React, { useRef, useState, useEffect } from "react";
import "./style.scss";
import { customStyles } from "./styles";
import uploadImg from "../../assets/images/marketplace/upload.svg";
import AccountComponent from "../AccountComponent";
import defaultBanner from "../../assets/images/marketplace/navbar_banner.jpg";
import useHandleCustomer from "../../hooks/customer/useHandleCustomer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import ACTIONS from "redux/action";
import Modal from "storybook/atom/Modal/modal";
// import Modal from "react-modal";

const NavBarEditMode = ({ isOpen, onClose }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [banner, setBanner] = useState();
  const handleCustomer = useHandleCustomer();
  const [userInfo, setUserInfo] = useState({});

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
    <>
      <Modal
        isModalOpen={isOpen}
        handleClose={onClose}
        className={`customNavbarEditModal`}
        bgImg={banner}
      >
        <div className={"editModal"}>
          <AccountComponent isEditMode={true} setUserInfo={setUserInfo} />

          <div
            className={"uploadImg"}
            onClick={() => fileRef?.current?.click()}
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
      {/* {isOpen && (
        <div className={"editModal__buttons"}>
          <div className={"account__save account__cancel"} onClick={onCancel}>
            Cancel
          </div>
          <div className={"account__save"} onClick={onSave}>
            Save
          </div>
        </div>
      )} */}
    </>
  );
};

export default NavBarEditMode;
