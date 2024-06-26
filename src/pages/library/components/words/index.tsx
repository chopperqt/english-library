import { Typography } from "antd";

import WordsContainer from "@common/word-container/WordsContainer";
import { useWords } from "@pages/library/hooks/useWords";

import type { WordApi } from "@models/Library.models";

import styles from './Words.module.scss'

const { Title } = Typography;

interface Props {
  words: WordApi[]
  amountOfWords: number,
  layoutWidth: number
}

const Words = ({
  layoutWidth,
  amountOfWords,
  words = [],
}: Props) => {

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

  const title = `Library(${words.length}/${amountOfWords})`;

  const amountOfColumns = Math.floor(layoutWidth / 375)

  return (
    <div className="p-[15px] rounded-lg bg-slate-100">
      {contextHolder}
      <Title level={3} className="mb-0">
        {title}
      </Title>
      <div
        className={styles.layout}
        style={{
          columnCount: amountOfColumns,
        }}
      >
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
      </div>
    </div>
  );
};

export default Words;
