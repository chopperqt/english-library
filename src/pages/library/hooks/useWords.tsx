import { useMemo } from "react";

import { normalizeWords } from "@helpers/normalizeWords";
// import { ParamsController } from "@helpers/paramsController";
import { useMessage } from "@helpers/useMessage";

import type { WordApi, WordForm } from "@models/Library.models";

interface UseWordsProps {
  words: WordApi[];
}

export const useWords = ({ words = [] }: UseWordsProps) => {
  // const { getParam } = ParamsController();

  // const page = getParam("page");

  const { messageApi, contextHolder, handleShowSuccess } = useMessage();

  // const isDisabledPin = useMemo(() => {
  //   return pinedWords.length >= 15;
  // }, [pinedWords]);
  //
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
        // const response = await updatePin(userID, !isPined, word);

        // if (response === null) {
        //   return;
        // }

        handleShowSuccess(successText);

        // getLibraryPinWords(userID);
        // getWords({
        //   userID,
        //   page: currentPage,
        // });
      });
  };

  const handleSubmitUpdate = async (
    word: WordForm,
    wordID?: number
  ): Promise<WordApi[] | null> => {
    if (!wordID) {
      return null;
    }

    // const normalizedWord = getNormalizeWord(word);

    // const response = await updateLibraryWord({
    //   ...normalizedWord,
    //   wordID,
    //   userID,
    // });

    // if (response === null) {
    //   return null;
    // }

    // getLibraryPinWords(userID);
    // getWords({
    //   userID,
    // });

    handleShowSuccess(
      <span>
        <b>{word.word}</b> updated.
      </span>
    );

    return [];
  };

  const handleClickDelete = async (word: string): Promise<WordApi[] | null> => {
    // const response = await deleteLibraryWords(userID, word);

    // if (!response) {
    //   return null;
    // }

    // getWords({
    //   userID,
    //   page: currentPage,
    // });
    // getLibraryPinWords(userID);

    handleShowSuccess(
      <span>
        <b>{word}</b> deleted.
      </span>
    );

    return []
  };

  return {
    normalizedWords,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
    contextHolder,
  };
};
