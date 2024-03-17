import { useMemo } from "react";

import { WordForm } from "@common/word-form";
import ModalContainer from "@components/ModalContainer";

import type { WordForm as IWordForm } from "@models/Library.models";

const ADD_TEXT = "Add";
const UPDATE_TEXT = "Update";

interface WordModalProps {
  isOpened: boolean;
  isDisabledPin?: boolean;
  onClose: () => void;
  onSubmit: (data: IWordForm) => void;
  translate?: string[];
  pined?: boolean;
  isCheckUniqueWord?: boolean;
  isLoading?: boolean;
  words?: string[];
  isUpdate?: boolean;
  word?: string;
}

export const WordModal = ({
  onClose,
  onSubmit,
  isOpened,
  pined = false,
  isLoading = false,
  isUpdate = false,
  translate = [],
  word,
  isDisabledPin = false,
}: WordModalProps) => {
  let text = isUpdate ? UPDATE_TEXT : ADD_TEXT;

  const initialValues = useMemo(() => {
    return {
      pined,
      translate,
      word,
    }
  }, [translate, word, pined])

  return (
    <ModalContainer isOpened={isOpened} onClose={onClose}>
      <WordForm
        buttonText={text}
        onSubmit={onSubmit}
        isLoading={isLoading}
        initialValues={initialValues}
        isDisabledPin={isDisabledPin}
      />
    </ModalContainer>
  );
};
