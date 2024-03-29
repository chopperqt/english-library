import { Typography } from "antd";

import WordsContainer from "@common/word-container/WordsContainer";
import { useWords } from "@pages/library/hooks/useWords";
import { WordsLayout } from "@pages/library/partials/WordsLayout";

import type { WordApi } from "@models/Library.models";

const { Title } = Typography;

interface Props {
  words: WordApi[]
}

const Words = ({ words = [] }: Props) => {
  const amountOfWords = words.length;

  const {
    normalizedWords,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
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
                words={words}
              />
            );
          }
        )}
      </WordsLayout>
    </div>
  );
};

export default Words;
