import { useMemo } from "react";
import { message } from "antd";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  createLibraryWord,
  getLibraryPinWords,
  getWords,
} from "@api/library.api";
import { getNormalizeWord } from "@common/word-modal/helpers/getNormalizeWord";
import { getLoading } from "@services/loading/Loading.store";
import { getOnlyWords, getPinWords } from "@services/library/Library.store";

import type { WordApi, WordForm } from "@models/Library.models";

const useCreateWord = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const currentPage = searchParams.get("page");

  const userID = window.localStorage.getItem('userId') || ''
  const isLoading = useSelector(getLoading).createLibraryWord?.isLoading;
  const words = useSelector(getOnlyWords);
  const pinedWords = useSelector(getPinWords);

  const page = currentPage ? +currentPage : 1;

  const [messageApi, contextHolder] = message.useMessage();

  const isDisabledPin = useMemo(() => {
    if (pinedWords.length >= 15) {
      return true;
    }

    return false;
  }, [pinedWords]);

  const handleErrorMessage = () => {
    messageApi.error({
      type: "error",
      content: "Something wend wrong!",
    });
  };

  const handleSuccessMessage = (word: string) => {
    messageApi.success({
      type: "success",
      content: (
        <span>
          <b>${word}</b>, created.
        </span>
      ),
    });
  };

  const onSubmit = async (data: WordForm): Promise<WordApi[] | null> => {
    if (!userID) {
      return null;
    }

    const normalizedWord = getNormalizeWord(data);

    const response = await createLibraryWord({
      ...normalizedWord,
      userID,
    });

    if (response === null) {
      handleErrorMessage();

      return null;
    }

    getLibraryPinWords(userID);
    getWords({
      userID,
      page,
      shouldControlPending: false,
    });

    handleSuccessMessage(normalizedWord.word);

    return response;
  };

  return {
    contextHolder,
    onSubmit,
    words,
    isLoading,
    userID,
    isDisabledPin,
  };
};

export default useCreateWord;
