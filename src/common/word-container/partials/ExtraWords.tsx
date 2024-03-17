import { Button } from "antd";
import { useState } from "react";

import ExtraWordsModal from "@components/extra-words-modal/ExtraWordsModal";

interface ExtraWordsProps {
  words: string[];
}
const ExtraWords = ({ words = [] }: ExtraWordsProps) => {
  const [isOpened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="ml-1 underline text-sky-700 hover:text-sky-500"
        type="link"
        size="small"
      >
        &nbsp;+{words.length - 1}
      </Button>
      <ExtraWordsModal
        words={words}
        isOpened={isOpened}
        onClose={handleClose}
      />
    </>
  );
};

export default ExtraWords;
