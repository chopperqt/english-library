import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { ConfirmationModal } from "@common/confirmation-modal";
import { useModal } from "@helpers/useModal";

import type { WordApi } from "@models/Library.models";

const CONFIRMATION_TEXT = "Are you sure?";
const ACCEPT_TEXT = "Delete";
const CANCEL_TEXT = "Cancel";

interface DeleteProps {
  isLoading?: boolean;
  onClick: () => Promise<WordApi[] | null>;
}
const Delete = ({ isLoading = false, onClick }: DeleteProps) => {
  const { handleClose, handleOpen, isOpened } = useModal();

  const handleDelete = async () => {
    const response = await onClick();

    if (response === null) {
      return;
    }

    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex justify-center items-center"
        type="text"
        size="small"
        shape="circle"
        icon={<DeleteOutlined />}
      />
      <ConfirmationModal
        isLoading={isLoading}
        isOpened={isOpened}
        onClose={handleClose}
        onClick={handleDelete}
        text={CONFIRMATION_TEXT}
        textAccept={ACCEPT_TEXT}
        textCancel={CANCEL_TEXT}
      />
    </>
  );
};

export default Delete;
