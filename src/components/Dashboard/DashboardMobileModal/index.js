import React from "react";
import DashboardGameTab from "../DashboardGameTab";
import Modal from "storybook/atom/Modal/modal";

const DashboardMobileModal = (props) => {
  return (
    <Modal
      custom
      withoutBlur
      isModalOpen={props?.isOpen}
      handleClose={props?.onClose}
      className="customModalStyle"
    >
      <DashboardGameTab {...props} />
    </Modal>
  );
};

export default DashboardMobileModal;
