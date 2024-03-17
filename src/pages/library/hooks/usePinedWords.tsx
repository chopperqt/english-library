import { useState } from "react";
import { MessageInstance } from "antd/es/message/interface";
import { message } from "antd";

import { getLibraryPinWords, getWords, updatePin } from "@api/library.api";
import { WordApi } from "@models/Library.models";
import { ParamsController } from "@helpers/paramsController";

interface UsePinedWords {
  words: WordApi[];
  userId: string;
  messageApi: MessageInstance;
}

export const usePinedWords = ({
  words = [],
  userId,
  messageApi,
}: UsePinedWords) => {
  const { getParam } = ParamsController();

  const [isLoading, setLoading] = useState(false);

  const pageParam = getParam("page");
  const currentPage = pageParam ? +pageParam : 1;

  const handleUnpendWords = async () => {
    const unpintedWords = words.map(({ word }) => {
      return updatePin(userId, false, word);
    });

    setLoading(true);

    messageApi
      .open({
        type: "loading",
        content: "Unpinning ...",
      })
      .then(async () => {
        try {
          await Promise.all(unpintedWords);
        } catch (e) {
          setLoading(false);
        }

        await getLibraryPinWords(userId);
        await getWords({
          userID: userId,
          page: currentPage,
          shouldControlPending: false,
        });
      })
      .then(() => {
        message.success("All words were unpin.");

        setLoading(false);
      });
  };

  return {
    handleUnpendWords,
    isLoading,
  };
};
