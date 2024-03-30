import { Typography } from "antd";

import { WordApi } from "@models/Library.models";

import Pined from "./Pined";
import Edit from "../components/editWord/EditWord";
import Delete from "./Delete";
import ExtraWords from "./ExtraWords";

const { Text } = Typography

interface Props {
  words: WordApi[]
  onPin: (wordName: string, pined: boolean) => void
  onDelete: (wordName: string) => Promise<WordApi[] | null>
  onSubmitUpdate: any
}

export const CompactWordsList = ({
  words,
  onPin,
  onDelete,
  onSubmitUpdate,
}: Props) => (
  <div className="overflow-hidden relative">
    <div className="px-5 py-1 overflow-x-auto">
      {words.map(({ word: wordName, translate, id, pined }) => (
        <div key={id} className="flex items-center">
          <div className="flex">
            <Pined
              onClick={() => onPin(wordName, pined)}
              isPined={pined}
            />
            <Edit
              onSubmit={onSubmitUpdate}
              wordID={id}
              word={wordName}
              translate={translate}
              pined={pined}
            />
            <Delete
              onClick={() => onDelete(wordName)}
            />
          </div>
          <Text className="flex">
            {wordName}&nbsp;—&nbsp;
            {!!translate?.[0] && translate[0]}
            {translate?.length > 1 && <ExtraWords words={translate} />}
          </Text>
        </div>
      ))}
    </div>
  </div>
)
