import Modal from "storybook/atom/Modal/modal";

export default function AlertModal({
  onClose,
  onSuccess,
  isOpen = false,
  isCenter = false,
  isDisabled = false,
  title = "",
  image = "",
  description = "",
  titleButton = "",
  titleCloseButton = "",
  maxHeight,
}) {
  const onAction = () => {
    onClose();
    onSuccess();
  };

  return (
    <Modal
      handleClose={onClose}
      withCrossIcon
      isModalOpen={isOpen}
      className={`px-[20px] py-[40px] ${`max-h-[${maxHeight}]`} max-w-[438px]`}
    >
      <div className={`openChestModal modal ${isCenter ? "center" : ""}`}>
        {!!title && (
          <h2
            className="modal__title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {!!image && <img src={image} alt="" />}
        {!!description && (
          <p
            className="modal__text modal__description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {!!titleButton && (
          <button className="button" onClick={onAction} disabled={isDisabled}>
            {titleButton}
          </button>
        )}
        {!!titleCloseButton && (
          <button className="button light" onClick={onClose}>
            {titleCloseButton}
          </button>
        )}
      </div>
    </Modal>
  );
}
