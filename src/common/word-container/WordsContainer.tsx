import { Card } from "antd";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CellMeasurerCache } from "react-virtualized";
import { debounce } from "lodash-es";

import type {
  WordApi,
  WordForm,
} from "@models/Library.models";

import { CompactWordsList } from "./partials/compact-words-list";
import { WordsList } from "./partials/words-list";

import styles from './WordContainer.module.scss'

interface WordsContainerProps {
  amountOfWords: number;
  words: WordApi[];
  letter: string;
  color?: string;
  onClickPin: (word: string, isPined: boolean) => void;
  onSubmitUpdate: (
    word: WordForm,
    wordID?: number
  ) => Promise<WordApi[] | null>;
  onClickDelete: (word: string) => Promise<WordApi[] | null>;
}
const WordsContainer = ({
  amountOfWords,
  words = [],
  letter,
  // color = "bg-sky-700",
  onClickPin,
  onSubmitUpdate,
  onClickDelete,
}: WordsContainerProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 24,
      fixedWidth: true,
    })
  );

  const [width, setWidth] = useState(0);

  const handleResizeList = debounce(() => {
    setWidth(wrapRef.current?.clientWidth || 0);

    if (wrapRef.current === null) {
      return;
    }

    if (wrapRef.current?.clientWidth === 0) {
      return;
    }

    setWidth(wrapRef.current.clientWidth);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResizeList);
  }, []);

  useEffect(() => {
    if (!wrapRef.current?.className) {
      return;
    }

    setWidth(wrapRef.current.clientWidth);
  }, [wrapRef.current?.className]);

  if (!words.length) {
    return null;
  }

  const isCompactContainer = useMemo(() => {
    return words.length < 13
  }, [words])

  return (
    <Card
      ref={wrapRef}
      className={styles.layout}
      hoverable
      title={(
        <span>{letter.toUpperCase()}({amountOfWords})</span>
      )}
    >
      {width > 100 && words.length > 13 && (
        <WordsList
          cache={cache}
          words={words}
          onPin={onClickPin}
          onDelete={onClickDelete}
          onSubmitUpdate={onSubmitUpdate}
        />
      )}
      {isCompactContainer && (
        <CompactWordsList
          words={words}
          onDelete={onClickDelete}
          onPin={onClickPin}
          onSubmitUpdate={onSubmitUpdate}
        />
      )}
    </Card>
  );
};

export default WordsContainer;

// <div className={`text-lg px-5 py-1 ${color} rounded-t-md`}>
//   <div className="flex gap-1 justify-center color text-white">
//     <div>{letter.toUpperCase()}</div>
//     <div>({amountOfWords})</div>
//   </div>
// </div>
