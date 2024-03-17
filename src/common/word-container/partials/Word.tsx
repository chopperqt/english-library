import Edit from "../components/editWord/EditWord";
import Pined from "./Pined";
import Delete from "./Delete";
import ExtraWords from "./ExtraWords";

import type { WordApi, WordForm, WordID } from "@models/Library.models";

interface WordProps {
  onClickPined: () => void;
  wordID: WordID;
  isPined?: boolean;
  isDisabledPin?: boolean;
  word: string;
  translate: string[];
  isLoading?: boolean;
  onSubmit: (word: WordForm, wordID?: number) => Promise<WordApi[]>;
  onClickDelete: () => Promise<WordApi[] | null>;
  isLoadingDelete?: boolean;
}

export const Word = ({
  onClickPined,
  isPined = false,
  isDisabledPin = false,
  isLoading = false,
  isLoadingDelete = false,
  word,
  wordID,
  translate,
  onSubmit,
  onClickDelete,
}: WordProps) => {
  return (
    <div className="flex items-center">
      <Pined
        onClick={onClickPined}
        isPined={isPined}
        isDisabled={isDisabledPin}
      />
      <Edit
        onSubmit={onSubmit}
        pined={isPined}
        wordID={wordID}
        word={word}
        isLoading={isLoading}
        translate={translate}
      />
      <Delete onClick={onClickDelete} isLoading={isLoadingDelete} />
      <div>{word}</div>
      <div>&nbsp;—&nbsp;</div>
      <div className="flex">
        {!!translate?.[0] && translate[0]}
        {translate?.length > 1 && <ExtraWords words={translate} />}
      </div>
    </div>
  );
};
