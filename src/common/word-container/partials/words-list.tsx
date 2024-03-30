import { List } from "react-virtualized";

import { WordApi } from "@models/Library.models";

import { WordsListRow } from "./words-list-row";

interface Props {
  words: WordApi[]
  onPin: (wordName: string, pined: boolean) => void
  onDelete: (wordName: string) => Promise<WordApi[] | null>
  onSubmitUpdate: any
  cache: any
}

export const WordsList = ({
  words,
  cache,
  onPin,
  onDelete,
  onSubmitUpdate,
}: Props) => (
  <List
    height={300}
    rowCount={words.length}
    rowHeight={24}
    width={375}
    className="px-5 py-1"
    rowRenderer={({ key, index, style, parent }) => {
      const {
        word: wordName,
        translate,
        id,
        pined,
      } = words[index];

      return (
        <WordsListRow
          cache={cache}
          key={key}
          index={index}
          style={style}
          parent={parent}
          wordName={wordName}
          translate={translate}
          id={id}
          pined={pined}
          onSubmitUpdate={onSubmitUpdate}
          onPin={onPin}
          onDelete={onDelete}
        />
      );
    }}
  />
)
