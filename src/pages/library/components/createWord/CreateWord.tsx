import React from "react";
import { Button } from "antd";

import WordModal, { useModalWord } from "@common/word-modal";
import useCreateWord from "@pages/library/hooks/useCreateWord";
import { PlusOutlined } from "@ant-design/icons";

const ADD_TEXT = "Add";

const CreateWord = () => {
  const { onSubmit, isLoading, userID, words, isDisabledPin, contextHolder } =
    useCreateWord();

  const { handleClose, handleOpen, isOpened, handleSubmit } = useModalWord({
    shouldCloseAfterSubmit: true,
    userID,
    onSubmit,
  });

  return (
    <React.Fragment>
      {contextHolder}
      <Button
        size="large"
        type="primary"
        className="whitespace-nowrap items-center flex"
        onClick={handleOpen}
        icon={<PlusOutlined />}
      >
        {ADD_TEXT}
      </Button>
      <WordModal
        onSubmit={handleSubmit}
        isOpened={isOpened}
        onClose={handleClose}
        isLoading={isLoading}
        words={words}
        isDisabledPin={isDisabledPin}
      />
    </React.Fragment>
  );
};

export default CreateWord;
