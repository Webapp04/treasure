import React from "react";
import approveLoadingImg from "../../../../assets/images/singleNFTPage/approveLoading.svg";
import approvedImg from "../../../../assets/images/singleNFTPage/approved.svg";
import "./style.scss";
import modalBg from "../../../../assets/images/singleNFTPage/modal_bg.svg";
import Modal from "storybook/atom/Modal/modal";

const ApproveAuctionLoadingModal = ({ isOpen, onClose, isApproved }) => {
  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onClose}
      className="approveAuctionLoadingModal"
      bgImg={modalBg}
    >
      <div className={"approveModal__background"}>
        <div className={"approveModal__image"}>
          <img
            src={isApproved ? approvedImg : approveLoadingImg}
            alt={"waiting for approve"}
          />
        </div>

        <div className={"approveModal__container"}>
          <div className={"approveModal__info"}>
            <p className={"modal__text"}>Approve</p>
            <p className={"modal__text modal__text--small"}>
              This transaction is conducted only once per collection
            </p>
          </div>

          <div className={"approveModal__info"}>
            <p className={"modal__text"}>Start auction</p>
            <p className={"modal__text modal__text--small"}>
              Sign message to set fixed price
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveAuctionLoadingModal;
