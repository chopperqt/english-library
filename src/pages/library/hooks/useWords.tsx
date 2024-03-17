import { useSelector } from "react-redux";
import { useMemo } from "react";

import { normalizeWords } from "@helpers/normalizeWords";
import {
  deleteLibraryWords,
  getLibraryPinWords,
  getWords,
  updateLibraryWord,
  updatePin,
} from "@api/library.api";
import { getUserID } from "@services/user/User.store";
import { getNormalizeWord } from "@common/word-modal/helpers/getNormalizeWord";
import { getLoading } from "@services/loading/Loading.store";
import { getPinWords } from "@services/library/Library.store";
import { ParamsController } from "@helpers/paramsController";
import { useMessage } from "@helpers/useMessage";

import type { WordApi, WordForm } from "@models/Library.models";

interface UseWordsProps {
  words: WordApi[];
}

export const useWords = ({ words = [] }: UseWordsProps) => {
  const { getParam } = ParamsController();

  const page = getParam("page");
  const currentPage = page ? +page : 1;

  const userID = useSelector(getUserID);
  const isLoadingUpdate = useSelector(getLoading).updateLibraryWord?.isLoading;
  const isLoadingDelete = useSelector(getLoading).deleteLibraryWords?.isLoading;
  const pinedWords = useSelector(getPinWords);

  const { messageApi, contextHolder, handleShowSuccess } = useMessage();

  const isDisabledPin = useMemo(() => {
    return pinedWords.length >= 15;
  }, [pinedWords]);

  const normalizedWords = useMemo(() => {
    let formattedWords = words;

    return Object.entries(normalizeWords(formattedWords));
  }, [words]);

  const handleClickPin = async (word: string, isPined: boolean) => {
    let successText = (
      <span>
        <b>{word}</b> pined.
      </span>
    );
    let content = `Pinning...`;

    if (isPined) {
      successText = (
        <span>
          <b>{word}</b> unpined.
        </span>
      );
      content = `Unpinning...`;
    }

    messageApi
      .open({
        type: "loading",
        content,
      })
      .then(async () => {
        const response = await updatePin(userID, !isPined, word);

        if (response === null) {
          return;
        }

        handleShowSuccess(successText);

        getLibraryPinWords(userID);
        getWords({
          userID,
          page: currentPage,
        });
      });
  };

  const handleSubmitUpdate = async (
    word: WordForm,
    wordID?: number
  ): Promise<WordApi[] | null> => {
    if (!wordID) {
      return null;
    }

    const normalizedWord = getNormalizeWord(word);

    const response = await updateLibraryWord({
      ...normalizedWord,
      wordID,
      userID,
    });

    if (response === null) {
      return null;
    }

    getLibraryPinWords(userID);
    getWords({
      userID,
    });

    handleShowSuccess(
      <span>
        <b>{word.word}</b> updated.
      </span>
    );

    return response;
  };

  const handleClickDelete = async (word: string): Promise<WordApi[] | null> => {
    const response = await deleteLibraryWords(userID, word);

    if (!response) {
      return null;
    }

    getWords({
      userID,
      page: currentPage,
    });
    getLibraryPinWords(userID);

    handleShowSuccess(
      <span>
        <b>{word}</b> deleted.
      </span>
    );

    return response as WordApi[];
  };

  return {
    normalizedWords,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
    isLoadingUpdate,
    isLoadingDelete,
    isDisabledPin,
    userID,
    contextHolder,
  };
};
