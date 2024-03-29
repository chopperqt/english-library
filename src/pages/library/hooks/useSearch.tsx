import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteLibraryWords,
  getLibraryPinWords,
  getWords,
  searchWord,
  updateLibraryWord,
  updatePin,
} from "@api/library.api";
// import { getUserID } from "@services/user/User.store";
import { getLoading } from "@services/loading/Loading.store";
import { clearSearch } from "@services/search/Search.store";
import { getNormalizeWord } from "@common/word-modal/helpers/getNormalizeWord";
import { getPage } from "@services/pagination/Pagination.store";

import type { WordApi, WordForm } from "@models/Library.models";

interface UseSearch {
  searchWords: WordApi[];
}

export const useSearch = ({ searchWords }: UseSearch) => {
  const dispatch = useDispatch();

  const userID = window.localStorage.getItem('userId') || ''
  const isLoading = useSelector(getLoading).searchWord?.isLoading;
  const isLoadingUpdate = useSelector(getLoading).updateLibraryWord?.isLoading;
  const isLoadingDelete = useSelector(getLoading).deleteLibraryWords?.isLoading;
  const page = useSelector(getPage);

  const [value, setValue] = useState("");

  const handleChangeValue = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    dispatch(clearSearch());

    if (value.length < 3) {
      return;
    }

    searchWord(userID, value);
  }, [value]);

  const isShowSearchedWord = useMemo(() => {
    if (value.length !== 0 && searchWords.length) {
      return true;
    }

    return false;
  }, [searchWords, value]);

  const handleClickPin = (word: string, isPined: boolean) => {
    const response = updatePin(userID, !isPined, word);

    if (response === null) {
      return;
    }

    getLibraryPinWords(userID);
    getWords({ userID });
    setValue("");
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
    getWords({ userID });
    setValue("");

    return response;
  };

  const handleClickDelete = async (word: string): Promise<WordApi[] | null> => {
    const response = await deleteLibraryWords(userID, word);

    if (!response || response === null) {
      return null;
    }

    getLibraryPinWords(userID);
    getWords({
      userID,
      page,
    });
    setValue("");

    return response as WordApi[];
  };

  return {
    searchWords,
    value,
    handleChangeValue,
    isLoading,
    isShowSearchedWord,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
    isLoadingDelete,
    isLoadingUpdate,
  };
};
