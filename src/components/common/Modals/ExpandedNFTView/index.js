import React from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { NFKEY_COLLECTION_ADDRESS } from "../../../../constant/blockchain";
import Modal from "storybook/atom/Modal/modal";

const ExpandedNFTView = ({ isOpen, onClose, currentToken, isGame }) => {
  const params = useParams();
  const isNFKeyCollection =
    params?.contractAddress === NFKEY_COLLECTION_ADDRESS;

  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onClose}
      withCrossIcon
      isFullModalBg
      className="max-w-[750px] max-h-fit h-fit px-[0px] py-[0px] rounded-none border-0"
    >
      <div className="expandedNFTView">
        {isNFKeyCollection || isGame ? (
          <video
            src={currentToken?.spaceFile}
            preload="metadata"
            autoPlay
            loop
          />
        ) : (
          <img src={currentToken?.fileLinkCDN} alt={""} />
        )}
      </div>
    </Modal>
  );
};

export default ExpandedNFTView;
