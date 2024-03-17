import { useSelector } from "react-redux";
import { Typography } from "antd";

import WordsContainer from "@common/word-container/WordsContainer";
import { useWords } from "@pages/library/hooks/useWords";
import { WordsLayout } from "@pages/library/partials/WordsLayout";
import { getAmountOfWords, getWords } from "@services/library/Library.store";

import type { WordApi } from "@models/Library.models";

const { Title } = Typography;

const Words = () => {
  const words = useSelector(getWords);
  const amountOfWords = useSelector(getAmountOfWords);

  const {
    normalizedWords,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
    isLoadingUpdate,
    isLoadingDelete,
    isDisabledPin,
    contextHolder,
  } = useWords({ words });

  if (!normalizedWords.length) {
    return null;
  }

  const title = `Library(${words.length - 1}/${amountOfWords})`;

  return (
    <div className="p-[15px] rounded-lg bg-slate-100">
      {contextHolder}
      <Title level={3} className="mb-0">
        {title}
      </Title>
      <WordsLayout>
        {normalizedWords.map(
          ([key, words]: [key: string, words: WordApi[]]) => {
            const amountOfWords = words.length;

            if (!amountOfWords) {
              return null;
            }

            return (
              <WordsContainer
                onSubmitUpdate={handleSubmitUpdate}
                onClickDelete={handleClickDelete}
                onClickPin={handleClickPin}
                key={key}
                amountOfWords={amountOfWords}
                letter={key}
                isLoadingUpdate={!!isLoadingUpdate}
                words={words}
                isDisabledPin={isDisabledPin}
                isLoadingDelete={!!isLoadingDelete}
              />
            );
          }
        )}
      </WordsLayout>
    </div>
  );
};

export default Words;
